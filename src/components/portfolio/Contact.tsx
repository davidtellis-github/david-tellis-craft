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

          {/* Start Project Button */}
          <div className="pt-8 border-t border-border">
            <h3 className="text-lg font-medium mb-4">Start a Project</h3>
            <Button 
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=david@tellis.design&su=New%20Project%20Inquiry', '_blank')}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Start Project
            </Button>
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