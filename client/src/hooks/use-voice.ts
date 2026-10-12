import { useState, useEffect, useRef, useCallback } from "react";
import { useChat } from "./use-chat";

// Define SpeechRecognition types since they aren't in standard lib.dom.d.ts
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: { new (): SpeechRecognition };
    webkitSpeechRecognition: { new (): SpeechRecognition };
  }
}

export function useVoiceAgent() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm Aditya's AI assistant. Ask me anything about my work, skills, or projects!" }
  ]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  
  const recognition = useRef<SpeechRecognition | null>(null);
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  const chatMutation = useChat();

  // Refs mirror the latest state so the single submit path (invoked from the
  // speech-recognition onend handler, which is bound once on mount) always
  // reads current values without going stale.
  const transcriptRef = useRef("");
  const messagesRef = useRef(messages);
  const isSubmittingRef = useRef(false);

  useEffect(() => { transcriptRef.current = transcript; }, [transcript]);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const speak = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true);
      
      // Stop any currently playing audio
      if (currentAudio.current) {
        currentAudio.current.pause();
        currentAudio.current = null;
      }
      
      // Call backend TTS endpoint
      const response = await fetch("/api/voice/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("TTS request failed");
      }

      // Get audio blob and play it
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudio.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        currentAudio.current = null;
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        currentAudio.current = null;
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error("Speech synthesis error:", error);
      setIsSpeaking(false);
      currentAudio.current = null;
      // Re-throw so callers (e.g. the auto-greet) can detect a blocked
      // autoplay and retry after the user interacts with the page.
      throw error;
    }
  }, []);

  // Auto-greet when the user visits the page.
  // Browsers block audio autoplay until the user has interacted with the page,
  // so we try immediately and, if that's blocked, retry on the first interaction.
  useEffect(() => {
    if (hasGreeted) return;

    const GREETING = "Hi! I'm Aditya's AI assistant. Ask me anything about my work, skills, or projects!";
    let fired = false;

    const fireGreeting = () => {
      if (fired) return;
      fired = true;
      setHasGreeted(true);
      removeInteractionListeners();
      void speak(GREETING).catch(() => {});
    };

    const interactionEvents: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchstart"];
    const onInteraction = () => fireGreeting();

    function removeInteractionListeners() {
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, onInteraction)
      );
    }

    // Attempt to greet right away (works if the browser allows autoplay,
    // e.g. the user already interacted before navigating here).
    (async () => {
      try {
        await speak(GREETING);
        fired = true;
        setHasGreeted(true);
      } catch {
        // Autoplay was blocked; wait for the first user interaction instead.
        interactionEvents.forEach((evt) =>
          window.addEventListener(evt, onInteraction, { once: true })
        );
      }
    })();

    return removeInteractionListeners;
  }, [hasGreeted, speak]);
  
  // Single source of truth for sending a finished transcript to the chat API.
  // Guarded by isSubmittingRef so it can never fire twice for the same utterance.
  const submitTranscript = useCallback(() => {
    const userMsg = transcriptRef.current.trim();
    if (!userMsg || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setTranscript("");

    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

    chatMutation.mutate(
      {
        message: userMsg,
        history: messagesRef.current.slice(-5), // last 5 messages as context
      },
      {
        onSuccess: (data) => {
          setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
          void speak(data.answer).catch(() => {});
        },
        onSettled: () => {
          isSubmittingRef.current = false;
        },
      }
    );
  }, [chatMutation, speak]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';
      
      recognition.current.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
      };

      recognition.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      // Recognition ends either because the user stopped it or speech paused.
      // This is the single place we trigger submission.
      recognition.current.onend = () => {
        setIsListening(false);
        submitTranscript();
      };
    }
  }, [submitTranscript]);

  const stopSpeaking = useCallback(() => {
    // Stop OpenAI audio
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    
    // Stop browser TTS as fallback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    setIsSpeaking(false);
  }, []);

  const startListening = useCallback(() => {
    if (recognition.current) {
      setTranscript("");
      setIsListening(true);
      recognition.current.start();
    }
  }, []);

  // Just stop recognition. The onend handler is the single place that submits
  // the transcript, so stopping here can never cause a duplicate request.
  const stopListening = useCallback(() => {
    recognition.current?.stop();
  }, []);

  return {
    isListening,
    transcript,
    messages,
    isSpeaking,
    startListening,
    stopListening,
    stopSpeaking,
    isPending: chatMutation.isPending
  };
}
