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
    <nav className="hidden lg:block sticky flex jusitfy-center items-center h-[80vh] pt-6" aria-label="Section navigation">
      <ul className="space-y-1 text-muted-foreground">
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
