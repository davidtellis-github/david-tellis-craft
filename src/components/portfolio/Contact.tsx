import React from "react";
import profile from "/src/assets/portrait.jpg";
import { MailIcon, StarEmphasisIcon, DiscoveryCallIcon } from "./icons/ContactIcons";

const labels = [
  { text: "Casual chat", className: "top-[25%] right-[-4%] sm:right-[-6%]" },
  { text: "Available for freelance", className: "top-[50%] right-[-14%] sm:right-[-18%]" },
  { text: "Discuss your goals", className: "bottom-[8%] right-[-2%] sm:right-[-4%]" },
  { text: "Ideate & Collaborate", className: "bottom-[6%] left-[-4%] sm:left-[-8%]" },
  { text: "Share Insights", className: "top-[40%] left-[-10%] sm:left-[-10%]" },
];

const openMail = (subject: string) =>
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=davidtellis12@gmail.com&su=${encodeURIComponent(subject)}`,
    "_blank"
  );

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center py-[12vh] lg:py-[15vh]"
    >
      <div className="flex flex-col gap-10 lg:gap-14">
        {/* Headline - full width, top */}
        <h1 className="text-[clamp(1.75rem,4vw,3.25rem)]  font-light tracking-tight leading-[1.2] text-foreground max-w-[24ch]">
          All great things start with an{" "}
          <span className=" italic font-medium tracking-tight leading-[1.2]"> idea</span>,{" "}
          <span className="italic font-medium tracking-tight leading-[1.2]">enthusiasm</span>
          <span className="italic font-medium tracking-tight leading-[1.2]"> & conversation</span>
           
        </h1>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Right on desktop, below image on mobile - Copy + CTAs */}
          <div className="order-2 flex flex-col gap-6 text-left">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
              Whether it's a fully-formed brief or just a spark of an idea, I'd love
              to hear about it. Let's talk about what you're building and how I can
              help bring it to life.
            </p>

            <div className="flex flex-col items-start gap-6 pt-2">
              <button
                onClick={() => openMail("Discovery Call Request")}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-3 rounded-full border border-[#212121] bg-black/[0.004] text-white font-figtree font-light text-base leading-[103%] tracking-[-0.02em] interactive"
              >
                <DiscoveryCallIcon className="w-6 h-6" />
                Book a Discovery Call
              </button>

              <button
                onClick={() => openMail("New Project Inquiry")}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-3 rounded-full border border-[#212121] bg-black/[0.004] text-white font-figtree font-light text-base leading-[103%] tracking-[-0.02em] interactive"
              >
                <StarEmphasisIcon className="w-6 h-6" />
                Start a Project
              </button>

              <button
                onClick={() => window.open("mailto:davidtellis12@gmail.com", "_blank")}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-3 rounded-full border border-[#212121] bg-black/[0.004] text-white font-figtree font-light text-base leading-[103%] tracking-[-0.02em] interactive"
              >
                <MailIcon className="w-6 h-6" />
                Send an Email
              </button>
            </div>
          </div>

          {/* Left on desktop, top on mobile - Profile photo with labels */}
          <div className="order-1 flex justify-center px-8 sm:px-12">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-square">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img
                  src={profile}
                  alt="Portrait of David Tellis"
                  className="w-full h-full object-cover"
                />
              </div>

              {labels.map((label) => (
                <span
                  key={label.text}
                  className={`absolute ${label.className} -translate-y-1/2 inline-flex items-center justify-center gap-1.5 h-10 px-3 whitespace-nowrap rounded-[8px] bg-black/[0.4] text-white font-figtree font-light text-sm leading-[103%] tracking-[-0.02em]`}
                >
                  {label.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
