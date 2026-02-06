import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Projects from "@/pages/Projects";
import Writing from "@/pages/Writing";
import Contact from "@/pages/Contact";
import Chat from "@/pages/Chat";
import VoiceAgent from "@/pages/VoiceAgent";

import { Navigation } from "@/components/Navigation";
import { Cursor } from "@/components/Cursor";
import { ChatWidget } from "@/components/ChatWidget";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/experience" component={Experience} />
        <Route path="/projects" component={Projects} />
        <Route path="/writing" component={Writing} />
        <Route path="/contact" component={Contact} />
        <Route path="/chat" component={Chat} />
        <Route path="/voice" component={VoiceAgent} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
          <Cursor />
          <Navigation />
          <Router />
          <ChatWidget />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
