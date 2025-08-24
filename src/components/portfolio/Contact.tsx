import React from "react";
import profile from "/src/assets/portrait.jpg";

const Contact: React.FC = () => (
  <section
    id="contact"
    className="relative min-h-screen flex flex-col justify-center py-12 sm:py-16 lg:py-20"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
      
      {/* Left column - Text content */}
      <div className="flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">
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
        <div className="flex flex-col sm:flex-row sm:gap-6 lg:gap-8 gap-3 text-base sm:text-lg pt-2">
          <a
            href="mailto:david@tellis.design"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            david@tellis.design
          </a>
          <a
            href="https://linkedin.com/in/davidtellis"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Right column - Portrait */}
      <aside className="aspect-square overflow-hidden max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg justify-self-center order-1 lg:order-2">
        <img
          src={profile}
          alt="Portrait of David Tellis"
          className="w-full h-full object-cover rounded-lg"
        />
      </aside>
    </div>
  </section>
);

export default Contact;