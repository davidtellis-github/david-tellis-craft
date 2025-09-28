import React from "react";
import profile from "/src/assets/portrait.jpg";
import ResumeModal from "./ResumeModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileText, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const projectFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    const subject = encodeURIComponent("New Project Inquiry");
    const body = encodeURIComponent(`Hi David,

I'm interested in starting a new project with you.

Contact me at: ${data.email}

Best regards`);
    
    window.open(`mailto:david@tellis.design?subject=${subject}&body=${body}`, '_self');
    
    toast({
      title: "Email client opened",
      description: "Please send the email from your email client to get in touch.",
    });
    
    form.reset();
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-start py-[20vh] lg:bg-background"
    >
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        
        {/* Left column - Text content */}
        <div className="flex flex-col gap-6">
          {/* Main intro line */}
          <p className="text-2xl leading-relaxed">
            I'm{" "}
            <span className="text-foreground font-medium">David Tellis</span>
            <br /> Let's build something great.
          </p>

          {/* Short note */}
          <p className="text-muted-foreground">
            Interested in product design roles with real user impact.
          </p>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row sm:gap-8 gap-4 text-lg pt-2">
            <a
              href="mailto:david@tellis.design"
              className="underline underline-offset-4 hover:text-primary transition-colors"
            >
              david@tellis.design
            </a>
            <a
              href="https://www.linkedin.com/in/david-tellis-121576262/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          </div>

          {/* Resume CTA */}
          <div className="pt-4">
            <ResumeModal>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                View Resume
              </Button>
            </ResumeModal>
          </div>

          {/* Start Project Form */}
          <div className="pt-8 border-t border-border">
            <h3 className="text-lg font-medium mb-4">Start a Project</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email address" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Start Project
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Right column - Portrait */}
        <aside className="aspect-square overflow-hidden max-w-lg lg:max-w-xl justify-self-center">
          <img
            src={profile}
            alt="Portrait of David Tellis"
            className="w-full h-full object-cover rounded-lg"
          />
        </aside>
      </div>
    </section>
  );
};

export default Contact;