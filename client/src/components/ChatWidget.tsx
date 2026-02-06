import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, User, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; source: string }[];
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Aditya's AI assistant. Ask me anything about his work, skills, or experience." }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatMutation.isPending) return;

    const userMsg = input;
    setInput("");
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
        onError: () => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "I'm having trouble connecting right now. Please try again later." 
          }]);
        }
      }
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-[90vw] md:w-[400px] h-[500px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white">AI Assistant</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef as any}>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                        <Bot className="w-4 h-4 text-blue-400" />
                      </div>
                    )}
                    
                    <div className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      msg.role === 'user' 
                        ? "bg-blue-600 text-white rounded-br-none" 
                        : "bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700"
                    )}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-zinc-700/50">
                          <p className="text-xs text-zinc-500 mb-1 font-medium">Sources:</p>
                          <div className="flex flex-wrap gap-2">
                            {msg.sources.map((s, i) => (
                              <span key={i} className="text-[10px] bg-zinc-900 px-2 py-1 rounded-md text-zinc-400 border border-zinc-800">
                                {s.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 shrink-0">
                        <User className="w-4 h-4 text-zinc-400" />
                      </div>
                    )}
                  </div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                      <Bot className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="bg-zinc-800 rounded-2xl rounded-bl-none border border-zinc-700 px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Invisible div to scroll to */}
                <div ref={scrollRef} /> 
              </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects..."
                className="bg-zinc-950 border-zinc-700 focus:ring-blue-500/20"
              />
              <Button type="submit" disabled={chatMutation.isPending || !input.trim()} size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-white text-black shadow-lg shadow-white/10 flex items-center justify-center hover:bg-zinc-200 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
