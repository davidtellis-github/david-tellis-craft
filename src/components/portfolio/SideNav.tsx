import React from "react";

const sections = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "values", label: "Values" },
  { id: "background", label: "Background" },
  { id: "references", label: "References" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const SideNav: React.FC = () => {
  return (
    <nav className="hidden lg:block sticky top-0 h-screen px-20 relative" aria-label="Section navigation">
      <a href="#intro" className="absolute top-6 left-20 text-sm font-semibold text-foreground">David Tellis</a>
      <ul className="h-full flex flex-col justify-center space-y-3 text-muted-foreground">
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="hover:text-foreground transition-colors">{s.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
