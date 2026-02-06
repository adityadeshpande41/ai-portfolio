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
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const recognition = useRef<SpeechRecognition | null>(null);
  const chatMutation = useChat();
  
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

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel existing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition.current) {
      setTranscript("");
      setIsListening(true);
      recognition.current.start();
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
      
      // If we have a transcript, send it to chat
      if (transcript.trim()) {
        const userMsg = transcript;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        
        // Send to API
        chatMutation.mutate(
          { 
            message: userMsg, 
            history: messages.slice(-5) // Send last 5 messages as context
          },
          {
            onSuccess: (data) => {
              setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
              speak(data.answer);
            }
          }
        );
      }
    }
  }, [transcript, messages, chatMutation, speak]);

  // Handle "Enter" logic essentially - when user stops speaking for a bit, maybe auto-submit?
  // For now, we'll rely on the manual stop or the recognition.onend event to trigger submission logic
  // But standard behavior for non-continuous is it ends automatically.
  useEffect(() => {
    if (!isListening && transcript) {
       // This effect triggers when listening stops and we have text. 
       // We can auto-submit here.
       const userMsg = transcript;
       // Clear transcript immediately so we don't re-submit
       setTranscript(""); 
       
       setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        
       chatMutation.mutate(
          { 
            message: userMsg, 
            history: messages.slice(-5) 
          },
          {
            onSuccess: (data) => {
              setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
              speak(data.answer);
            }
          }
        );
    }
  }, [isListening, transcript, messages, chatMutation, speak]);

  return {
    isListening,
    transcript,
    messages,
    isSpeaking,
    startListening,
    stopListening: () => recognition.current?.stop(),
    isPending: chatMutation.isPending
  };
}
