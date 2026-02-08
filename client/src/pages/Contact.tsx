import { PageTransition } from "@/components/PageTransition";
import { useForm } from "react-hook-form";
import { useContact } from "@/hooks/use-chat";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Loader2 } from "lucide-react";

type ContactForm = z.infer<typeof insertContactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const mutation = useContact();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(insertContactSchema)
  });

  const onSubmit = (data: ContactForm) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <PageTransition>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">Let's Talk</h1>
          <p className="text-xl text-zinc-400 mb-8">
            Interested in working together or just want to say hi? Drop me a line.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-zinc-300">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <a href="mailto:amdnyu@gmail.com" className="hover:text-white transition-colors">
                amdnyu@gmail.com
              </a>
            </div>
            
            <div className="flex items-center gap-3 text-zinc-300">
              <svg className="w-5 h-5 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <a 
                href="https://linkedin.com/in/aditya-m-deshpande/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                linkedin.com/in/aditya-m-deshpande
              </a>
            </div>
            
            <div className="flex items-center gap-3 text-zinc-300">
              <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+15512612249" className="hover:text-white transition-colors">
                +1 (551) 261-2249
              </a>
            </div>
            
            <div className="flex items-center gap-3 text-zinc-300">
              <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <a 
                href="https://calendar.app.google/NVtBiFQTa4SbHgHS6" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Schedule a meeting
              </a>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Name</label>
              <Input 
                {...register("name")} 
                className="bg-zinc-950 border-zinc-800 focus:border-blue-500/50" 
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Email</label>
              <Input 
                {...register("email")} 
                type="email"
                className="bg-zinc-950 border-zinc-800 focus:border-blue-500/50" 
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Subject</label>
              <Input 
                {...register("subject")} 
                className="bg-zinc-950 border-zinc-800 focus:border-blue-500/50" 
                placeholder="Job Opportunity / Collaboration / Question"
              />
              {errors.subject && <p className="text-red-400 text-sm">{errors.subject.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Message</label>
              <Textarea 
                {...register("message")} 
                className="bg-zinc-950 border-zinc-800 focus:border-blue-500/50 min-h-[150px]" 
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="text-red-400 text-sm">{errors.message.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-white text-black hover:bg-zinc-200 h-12 text-lg font-medium rounded-xl"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
