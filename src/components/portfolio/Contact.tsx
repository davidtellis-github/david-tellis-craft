import React from "react";
import profile from "/src/assets/portrait.jpg";
import ResumeModal from "./ResumeModal";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-start pt-[20vh] gap-auto lg:bg-background"
    >
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        
        {/* Left column - Text content */}
        <div className="flex flex-col gap-0">
          {/* Main intro line */}
          <p className="text-xl sm:text-md  lg:text-lg text-muted-foreground leading-relaxed">
           {" "}
             Exploring new opportunities.
          </p>

          {/* Short note */}
          <p className="text-xl sm:text-2xl  lg:text-2xl sm:text-left ">
            Currently working with startups
          </p>

          {/* Contact links */}
          
          {/* Resume CTA */}
          {/* Resume + Start Project CTAs */}
<div className="pt-4 grid grid-cols-2 gap-4">
  <ResumeModal>
    <Button variant="outline" className="flex items-center gap-2 w-full">
      <FileText className="w-4 h-4" />
      View Resume
    </Button>
  </ResumeModal>

  <Button 
    onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=davidtellis12@gmail.com&su=New%20Project%20Inquiry', '_blank')}
    className="flex items-center gap-2 w-full"
  >
    <Send className="w-4 h-4" />
    Start Project
  </Button>
</div>

          {/* Start Project Button */}
          <div className="pt-8 ">
            
            
          </div>
        </div>

        {/* Right column - Portrait */}
        <aside className="aspect-square overflow-hidden max-w-lg lg:max-w-screen h-full justify-self-center">
          <img
            src={profile}
            alt="Portrait of David Tellis"
            className="w-full h-full object-cover"
          />
        </aside>
      </div><div className="flex flex-col sm:flex-row sm:gap-8 gap-8 text-sm sm:text-sm lg:text-md pt-2">
            <a
              href="mailto:davidtellis12@gmail.com"
              className="underline underline-offset-4 hover:text-primary transition-colors break-all sm:break-normal"
            >
              davidtellis12@gmail.com
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

    </section>
  );
};

export default Contact;