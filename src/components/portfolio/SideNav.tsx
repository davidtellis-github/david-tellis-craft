
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
      className="
        hidden lg:block sticky top-0 h-svh w-[min(18rem,24vw)] px-0
      "
    >
      <div className="relative h-full">
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
        <ul
          className="
            absolute left-0 top-[22vh] lg:pt-[20vh] -translate-y-1/2
            space-y-2 text-muted-foreground pt-24 lg:pt-[20vh]
            text-[clamp(14px,1.6vmin,18px)]
          "
        >
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
      </div>
    </nav>
  );
};

export default SideNav;
