import React, { useEffect, useState } from "react";

const sections = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
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
          // Adjust threshold: smaller value = section activates earlier
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0) {
            current = s.id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HANDLE MENU CLICK ---
  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Smooth + fast scroll
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id); // set active immediately
    }
    // Updates the URL hash
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:block sticky top-0 h-svh w-[min(18rem,24vw)] px-0"
    >
      <div className="relative h-full">
        <ul
          className="
            absolute left-0 top-[22vh] lg:pt-[20vh] -translate-y-1/2
            /* ↓ Adjust spacing between menu items here ↓ */
            space-y-1 
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
                  transition-colors 
                  /* ↓ Hover state color ↓ */
                  hover:text-foreground 
                  ${
                    activeSection === s.id
                      ? "text-foreground font-normal" // Active style
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
    </nav>
  );
};

export default SideNav;




        {/* Big logo */}
        {/* <a
          href="#intro"
          aria-label="Home"
          className="
                leading-none select-none text-foreground pt-10
            text-[clamp(28px,4vmin,48px)]
          "
        >
          D
        </a> */}

        {/* Vertically centered menu */}