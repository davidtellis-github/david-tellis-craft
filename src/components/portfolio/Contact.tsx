import React from "react";
import profile from "/src/assets/portrait.jpg";
import ResumeModal from "./ResumeModal";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-start py-[20vh] lg:bg-background"
    >
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        
        {/* Left column - Text content */}
        <div className="flex flex-col gap-6">
          {/* Main intro line */}
          <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed">
            I'm{" "}
            <span className="text-foreground font-medium">David Tellis</span>
            <br /> Let's build something great.
          </p>

          {/* Short note */}
          <p className="text-sm sm:text-base text-muted-foreground">
            Interested in product design roles with real user impact.
          </p>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row sm:gap-8 gap-4 text-sm sm:text-base lg:text-lg pt-2 flex-wrap">
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

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <ResumeModal>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                View Resume
              </Button>
            </ResumeModal>
            
            <Button 
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=davidtellis12@gmail.com&su=New%20Project%20Inquiry', '_blank')}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Start Project
            </Button>
          </div>
        </div>

        {/* Right column - Portrait */}
        <aside className="order-first lg:order-last w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto lg:mx-0 aspect-square overflow-hidden">
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