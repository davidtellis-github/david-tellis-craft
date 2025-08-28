import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="fixed top-6 left-6 z-50">
      <Link
        to="/"
        aria-label="Home"
        className="leading-none select-none text-foreground 
                   text-[clamp(20px,4vmin,32px)] font-normal flex group relative"
      >
        {/* Always-visible "D" */}
        <span className="inline-block">D</span>
        <span
          className="
            inline-block opacity-0
            group-hover:animate-spreadOut
            group-hover:opacity-100
          "
        >
          avid Tellis
        </span>
      </Link>
    </header>
  );
};

export default Header;