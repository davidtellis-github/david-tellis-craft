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
    <nav
      aria-label="Section navigation"
      className="sticky top-1/2 -translate-y-1/2 mr-8 md:mr-10 lg:mr-12"
    >
      <ul className="space-y-3 text-muted-foreground text-center">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="hover:text-foreground transition-colors"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
