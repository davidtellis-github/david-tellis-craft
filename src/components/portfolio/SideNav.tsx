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
      className="hidden lg:block sticky top-0 h-svh w-[min(18rem,24vw)]"
    >
      <div className="relative h-full flex flex-col gap-[14vh]">
        {/* Navigation Menu - Logo removed, now handled by Header component */}
        <div className="pt-20">
          <ul
            className="
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
      </div>
    </nav>
  );
};

export default SideNav;
