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
}

export default function Chat() {
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
              <div key={idx} className={cn("flex gap-4", msg.role === 'user' ? "justify-end" : "justify-start")}>
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
