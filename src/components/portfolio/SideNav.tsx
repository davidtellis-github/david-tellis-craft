import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const sections = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "gallery", label: "Gallery" },
  { id: "values", label: "Values" },
  { id: "background", label: "Background" },
  { id: "references", label: "References" },
  { id: "contact", label: "Contact" },
];

const SideNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("intro");

  // --- SCROLL SPY LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      let current = "intro";

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0) {
            current = s.id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HANDLE MENU CLICK ---
  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Section navigation"
      className="flex flex-col hidden lg:block sticky top-0 h-svh w-[min(18rem,24vw)]"
    >
      <div className="relative h-full flex flex-col justify-between pb-10">
        <div className="flex flex-col gap-[14vh]">
          {/* --- Animated Logo --- */}
          <Link
            to="/"
            aria-label="Home"
            className="pt-10 leading-none select-none text-foreground 
                       text-[clamp(20px,4vmin,32px)] font-normal flex group relative"
          >
            {/* Always-visible "D" */}
            <span className="inline-block">D</span>
            <span
              className="
                inline-block opacity-0
                group-hover:animate-spreadOut
                group-hover:opacity-100
              "
            >
              avid Tellis
            </span>
          </Link>

          {/* --- Nav Menu --- */}
          <ul
            className="
              space-y-0 
              text-muted-foreground
              text-[clamp(12px,1.6vmin,16px)]
            "
          >
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={handleClick(s.id)}
                  className={`
                    transition-colors interactive
                    hover:text-foreground 
                    ${
                      activeSection === s.id
                        ? "text-foreground font-normal"
                        : ""
                    }
                  `}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Resume & All Work CTAs --- */}
        <div className="flex flex-col gap-2">
          <ResumeModal>
            <button
              className="text-muted-foreground text-[clamp(12px,1.6vmin,16px)] interactive
                         hover:text-foreground transition-colors duration-300 text-left"
            >
              Resume
            </button>
          </ResumeModal>
          <Link
            to="/portfolio"
            className="text-muted-foreground text-[clamp(12px,1.6vmin,16px)] interactive
                       hover:text-foreground transition-colors duration-300"
          >
            All work
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
