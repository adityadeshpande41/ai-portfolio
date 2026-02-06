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
          
          <div className="flex items-center gap-3 text-zinc-300 mb-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <a href="mailto:hello@aditya.dev" className="hover:text-white transition-colors">hello@aditya.dev</a>
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
