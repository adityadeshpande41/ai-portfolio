import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { motion } from "framer-motion";
import { Send, Sparkles, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; source: string }[];
  resumeUrl?: string;
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Aditya's AI assistant. I can answer questions about my work experience, technical skills, projects, and achievements. What would you like to know?" }
  ]);
  const [waitingForRole, setWaitingForRole] = useState(false);
  const [waitingForContact, setWaitingForContact] = useState<'email' | 'subject' | 'message' | null>(null);
  const [contactData, setContactData] = useState<{ email?: string; subject?: string; message?: string }>({});
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChat();

  const quickActions = [
    { label: "📄 View Resume", action: "resume" },
    { label: "📧 Contact Me", action: "contact" },
    { label: "📅 Schedule Meeting", url: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3u25G9QKmz_OjzUxgXOaSFbilRs8UDxATLo4LanMh0RNdS3J2LMiKA39f4fjIp_UxKQnri9PRt" }
  ];

  const DEFAULT_RESUME = "https://drive.google.com/file/d/1aOZ9P_2TFIRQjoU4ZjB2kes0P6y4A5y6/view?usp=sharing";
  
  const resumeMap: { [key: string]: string } = {
    "ai engineer": "https://drive.google.com/file/d/1iFcssC-MhYAMA5NsgRSYI2SPgNTmy3oY/view?usp=sharing",
    "ai deployment": "https://drive.google.com/file/d/1TZviSPXfQ-xtFj8G-rk27bDnY-BI4WqR/view?usp=sharing",
    "analytics engineer": "https://drive.google.com/file/d/1OduwO0cbSCw9q8GoxQNEqz_3wJq9VZ-M/view?usp=sharing",
    "business analyst": "https://drive.google.com/file/d/1L-fhWloTnOhGlYg5wBLRy9rjAczXGYW8/view?usp=sharing",
    "business intelligence engineer": "https://drive.google.com/file/d/1ryzRsJXu44Hghvkgvea8iqhkzX7d86zh/view?usp=sharing",
    "data analyst": "https://drive.google.com/file/d/1_k0QeBnzJlpYF6tqjhRmpLlLlioTXuVS/view?usp=sharing",
    "data engineer": "https://drive.google.com/file/d/1FC42KmaoDRTA7dWp9w5xQRbzU9_ZkcUA/view?usp=sharing",
    "data scientist": "https://drive.google.com/file/d/1DrzbTmkwmbBtNQ_11fFAwU9vghbt8C10/view?usp=sharing",
    "machine learning engineer": "https://drive.google.com/file/d/1aN7gcqNU745jN3tfQNffksIbIxpMoU6-/view?usp=sharing",
    "product manager": "https://drive.google.com/file/d/1p3MOQHxaGDSXQztj4_MnvjV-2oSZh7Ot/view?usp=sharing",
    "software engineer": "https://drive.google.com/file/d/1nVogSUKiy-gvnrg34YzRiYRvm9UTJeRm/view?usp=sharing"
  };

  const findResumeUrl = (roleText: string): string | null => {
    const normalized = roleText.toLowerCase().trim();
    
    // Direct match
    if (resumeMap[normalized]) {
      return resumeMap[normalized];
    }
    
    // Partial match
    for (const [role, url] of Object.entries(resumeMap)) {
      if (normalized.includes(role) || role.includes(normalized)) {
        return url;
      }
    }
    
    return null;
  };

  const handleQuickAction = (action: string, url?: string) => {
    if (action === "resume") {
      setWaitingForRole(true);
      setMessages(prev => [...prev, 
        { role: 'assistant', content: "What role are you hiring for? (e.g., AI Engineer, Data Scientist, Product Manager, Software Engineer)" }
      ]);
    } else if (action === "contact") {
      setWaitingForContact('email');
      setContactData({});
      setMessages(prev => [...prev, 
        { role: 'assistant', content: "I'd be happy to help you get in touch! What's your email address?" }
      ]);
    } else if (url) {
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatMutation.isPending) return;

    // Frontend validation
    if (input.length > 1000) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Your message is too long. Please keep it under 1000 characters." 
      }]);
      return;
    }

    const userMsg = input;
    setInput("");
    
    // Check if waiting for role input
    if (waitingForRole) {
      setWaitingForRole(false);
      setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
      
      const resumeUrl = findResumeUrl(userMsg) || DEFAULT_RESUME;
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Great! Here's the resume${findResumeUrl(userMsg) ? ' tailored for that role' : ''}:`,
        resumeUrl: resumeUrl
      }]);
      return;
    }

    // Check if waiting for contact email
    if (waitingForContact === 'email') {
      setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userMsg)) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "That doesn't look like a valid email address. Please provide a valid email (e.g., name@example.com):" 
        }]);
        return;
      }
      
      setContactData({ email: userMsg });
      setWaitingForContact('subject');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Great! What's the subject of your message?" 
      }]);
      return;
    }

    // Check if waiting for contact subject
    if (waitingForContact === 'subject') {
      setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
      
      if (userMsg.trim().length < 3) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Please provide a more descriptive subject:" 
        }]);
        return;
      }
      
      setContactData(prev => ({ ...prev, subject: userMsg }));
      setWaitingForContact('message');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Great! Now, what's your message?" 
      }]);
      return;
    }

    // Check if waiting for contact message
    if (waitingForContact === 'message') {
      setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
      
      if (userMsg.trim().length < 10) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Please provide a more detailed message (at least 10 characters):" 
        }]);
        return;
      }
      
      setContactData(prev => ({ ...prev, message: userMsg }));
      setWaitingForContact(null);
      
      // Send email
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Chat User',
            email: contactData.email,
            subject: contactData.subject,
            message: userMsg
          })
        });

        if (response.ok) {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "Perfect! I've sent your message to Aditya. He'll get back to you at " + contactData.email + " soon!" 
          }]);
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Sorry, there was an issue sending your message. Please try emailing directly at amdnyu@gmail.com" 
        }]);
      }
      
      setContactData({});
      return;
    }

    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

    chatMutation.mutate(
      { 
        message: userMsg,
        history: messages.map(m => ({ role: m.role, content: m.content })).slice(-5)
      }, 
      {
        onSuccess: (data) => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: data.answer,
            sources: data.sources
          }]);
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || "I'm having trouble connecting right now. Please try again later.";
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: errorMessage
          }]);
        }
      }
    );
  };

  return (
    <div className="pt-24 pb-12 min-h-screen container mx-auto px-4 max-w-4xl flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[80vh]"
      >
        {/* Header */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <div>
              <h1 className="font-semibold text-white">AI Assistant</h1>
              <p className="text-xs text-zinc-400">Ask me anything about Aditya</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef as any}>
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div className={cn("flex gap-4", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  {msg.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                      <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-6 py-4 text-base",
                    msg.role === 'user' 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700"
                  )}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    {msg.resumeUrl && (
                      <a
                        href={msg.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-medium transition-colors"
                      >
                        📄 Click here to view resume
                      </a>
                    )}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">Sources</p>
                        <div className="flex flex-wrap gap-2">
                          {msg.sources.map((s, i) => (
                            <span key={i} className="text-xs bg-zinc-900 px-2 py-1.5 rounded-md text-zinc-400 border border-zinc-800 flex items-center gap-1">
                              {s.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 shrink-0">
                      <User className="w-5 h-5 text-zinc-400" />
                    </div>
                  )}
                </div>
                
                {/* Quick Actions after first assistant message */}
                {idx === 0 && msg.role === 'assistant' && (
                  <div className="ml-14 mt-4 flex flex-col gap-2">
                    <p className="text-xs text-zinc-500 mb-1 font-medium uppercase tracking-wider">Quick Actions</p>
                    {quickActions.map((action, i) => (
                      action.url ? (
                        <a
                          key={i}
                          href={action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-4 py-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all text-left"
                        >
                          {action.label}
                        </a>
                      ) : (
                        <button
                          key={i}
                          onClick={() => handleQuickAction(action.action || '', action.url)}
                          className="text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-4 py-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all text-left"
                        >
                          {action.label}
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
                <div className="bg-zinc-800 rounded-2xl rounded-bl-none border border-zinc-700 px-6 py-4">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            {/* Invisible div to scroll to */}
            <div ref={scrollRef} /> 
          </div>
        </ScrollArea>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my projects, experience, or skills..."
            maxLength={1000}
            className="bg-zinc-950 border-zinc-700 focus:ring-blue-500/20 h-12 text-base"
          />
          <Button type="submit" disabled={chatMutation.isPending || !input.trim()} size="icon" className="h-12 w-12 bg-blue-600 hover:bg-blue-700 shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
