import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileHeader: React.FC = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: "intro", label: "Intro" },
    { id: "work", label: "Work" },
    { id: "values", label: "Values" },
    { id: "background", label: "Background" },
    { id: "testimonials", label: "References" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
      setIsOpen(false);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 lg:hidden  backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo - Static "D" */}
        <a
          href="#intro"
          onClick={(e) => handleClick(e, "intro")}
          aria-label="Home"
          className="leading-none select-none text-foreground 
                     text-[clamp(24px,5vmin,36px)] font-normal"
        >
          D
        </a>

        {/* Hamburger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Toggle menu"
              className="w-10 h-10 flex items-center justify-center text-foreground hover:text-foreground/80 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </SheetTrigger>
          
          <SheetContent 
            side="top" 
            className="w-full h-full bg-black border-none flex flex-col"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            
            {/* Vertical Navigation */}
            <nav className="flex flex-col gap-6 px-8 pt-20">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleClick(e, section.id)}
                  className={`
                    text-4xl font-normal transition-colors duration-200
                    ${
                      activeSection === section.id
                        ? "text-white"
                        : "text-gray-500 hover:text-gray-400"
                    }
                  `}
                  aria-current={activeSection === section.id ? "page" : undefined}
                >
                  {section.label}
                </a>
              ))}
            </nav>

            {/* Green Badge with Initials */}
           
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MobileHeader;
