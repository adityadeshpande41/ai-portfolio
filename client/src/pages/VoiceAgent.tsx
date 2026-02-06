import { PageTransition } from "@/components/PageTransition";
import { useVoiceAgent } from "@/hooks/use-voice";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VoiceAgent() {
  const { isListening, transcript, messages, isSpeaking, startListening, stopListening, isPending } = useVoiceAgent();

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Talk to Aditya</h1>
        <p className="text-zinc-400 mb-12">
          Have a voice conversation with my AI twin. Ask about my background, projects, or philosophy.
        </p>

        {/* Microphone Button */}
        <div className="relative mb-12 gooey-filter">
          {/* Ripple Effect */}
          {isListening && (
             <motion.div
               initial={{ opacity: 0.5, scale: 1 }}
               animate={{ opacity: 0, scale: 2.5 }}
               transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
               className="absolute inset-0 bg-blue-500/20 rounded-full"
             />
          )}
          
          <button
            onClick={isListening ? stopListening : startListening}
            className={cn(
              "relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95",
              isListening ? "bg-red-500 shadow-red-500/40" : "bg-blue-600 shadow-blue-500/40"
            )}
          >
            {isListening ? (
              <MicOff className="w-12 h-12 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </button>
        </div>

        {/* Status Indicator */}
        <div className="h-8 mb-8 flex items-center justify-center gap-2">
          {isListening && (
            <span className="flex items-center gap-2 text-red-400 font-medium animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              Listening...
            </span>
          )}
          {isPending && (
            <span className="flex items-center gap-2 text-blue-400 font-medium">
              <LoaderDots />
              RAG Search...
            </span>
          )}
          {isSpeaking && (
            <span className="flex items-center gap-2 text-green-400 font-medium">
              <Volume2 className="w-4 h-4" />
              Explaining...
            </span>
          )}
        </div>

        {/* Live Transcript / Response */}
        <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 min-h-[200px] text-left">
           <AnimatePresence mode="wait">
             {messages.length === 0 && !transcript ? (
               <motion.p 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }}
                 className="text-zinc-600 text-center italic"
               >
                 Tap the mic to start the conversation...
               </motion.p>
             ) : (
               <div className="space-y-4">
                 {/* Show historical messages last 2 */}
                 {messages.slice(-2).map((msg, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={cn(
                       "p-4 rounded-xl",
                       msg.role === 'user' ? "bg-zinc-800/50 ml-12" : "bg-blue-900/10 border border-blue-500/10 mr-12"
                     )}
                   >
                     <p className={cn("text-sm font-bold mb-1", msg.role === 'user' ? "text-zinc-400" : "text-blue-400")}>
                       {msg.role === 'user' ? "You" : "Aditya AI"}
                     </p>
                     <p className="text-zinc-200">{msg.content}</p>
                   </motion.div>
                 ))}
                 
                 {/* Live Transcript */}
                 {transcript && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="p-4 rounded-xl bg-zinc-800/30 ml-12 border border-zinc-700/50 border-dashed"
                   >
                     <p className="text-sm font-bold text-zinc-500 mb-1">You (Live)</p>
                     <p className="text-zinc-300">{transcript}</p>
                   </motion.div>
                 )}
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}

function LoaderDots() {
  return (
    <div className="flex gap-1">
      <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-1 h-1 bg-current rounded-full animate-bounce"></span>
    </div>
  );
}
