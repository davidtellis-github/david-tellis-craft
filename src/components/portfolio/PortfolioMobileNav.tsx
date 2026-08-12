import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mobile counterpart to TimelineNav: TimelineNav is `hidden lg:block`, so
// below that breakpoint the portfolio page had no way to jump between
// sections. This mirrors the same section list, opened from a corner
// trigger so it doesn't collide with the fixed "back home" button.
const sections = [
  { id: "projects", label: "Projects" },
  { id: "3d-gallery", label: "3D Gallery" },
  { id: "ui-designs-gallery", label: "UI Designs" },
];

const PortfolioMobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("projects");

  useEffect(() => {
    const handleScroll = () => {
      let current = "projects";
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

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            aria-label="Toggle navigation"
            className="fixed top-6 left-6 z-50 inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors interactive"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </SheetTrigger>

        <SheetContent side="top" className="w-full h-full bg-black border-none flex flex-col">
          <SheetHeader className="sr-only">
            <SheetTitle>Portfolio navigation</SheetTitle>
          </SheetHeader>

          <Link
            to="/"
            aria-label="Home"
            onClick={() => setIsOpen(false)}
            className="pt-4 leading-none select-none text-white text-[clamp(24px,5vmin,36px)] font-normal"
          >
            David Tellis
          </Link>

          <nav className="flex flex-col gap-6 pt-16">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className={`text-left text-4xl font-normal transition-colors duration-200 ${
                  activeSection === section.id ? "text-white" : "text-gray-500 hover:text-gray-400"
                }`}
                aria-current={activeSection === section.id ? "page" : undefined}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PortfolioMobileNav;
