import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "role", label: "Role" },
  { id: "features", label: "Features" },
  { id: "process", label: "Process" },
  { id: "walkthrough", label: "Walkthrough" },
  { id: "reflection", label: "Reflection" },
  { id: "links", label: "Links" },
];

const ProjectNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  // --- SCROLL SPY LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      let current = "overview";

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
      aria-label="Project navigation"
      className="hidden lg:block sticky top-0 h-svh w-[min(18rem,24vw)]"
    >
      <div className="relative h-full flex flex-col gap-[14vh]">
        {/* Back to Portfolio */}
        <div className="pt-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[clamp(12px,1.6vmin,16px)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>

        {/* Section Menu */}
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
                  transition-colors 
                  hover:text-foreground 
                  cursor-pointer
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
    </nav>
  );
};

export default ProjectNav;