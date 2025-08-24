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
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <a
            href="#intro"
            aria-label="Home"
            className="text-xl font-medium text-foreground"
          >
            David Tellis
          </a>
          
          {/* Mobile nav menu */}
          <div className="flex gap-4 text-xs text-muted-foreground">
            {sections.slice(0, 3).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={handleClick(s.id)}
                className={`transition-colors hover:text-foreground ${
                  activeSection === s.id ? "text-foreground" : ""
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav
        aria-label="Section navigation"
        className="hidden lg:block sticky top-0 h-screen w-64 xl:w-72 flex-shrink-0"
      >
        <div className="relative h-full flex flex-col gap-12 xl:gap-16 py-8 xl:py-12">
          {/* --- Animated Logo --- */}
          <a
            href="#intro"
            aria-label="Home"
            className="leading-none select-none text-foreground text-2xl xl:text-3xl font-medium flex group relative"
          >
            {/* Always-visible "D" */}
            <span className="inline-block">D</span>
            <span className="inline-block opacity-0 group-hover:animate-spreadOut group-hover:opacity-100">
              avid Tellis
            </span>
          </a>

          {/* --- Nav Menu --- */}
          <ul className="space-y-2 text-muted-foreground text-sm xl:text-base">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={handleClick(s.id)}
                  className={`transition-colors hover:text-foreground ${
                    activeSection === s.id
                      ? "text-foreground font-medium"
                      : ""
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideNav;
