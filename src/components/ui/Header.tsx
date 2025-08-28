import React from "react";

const Header = () => {
  return (
    <header className="fixed top-6 left-6 z-50">
      <a
        href="/"
        aria-label="Home"
        className="leading-none select-none text-foreground 
                   text-[clamp(20px,4vmin,32px)] font-normal flex group relative"
      >
        <span
          className="
            inline-block opacity-0
            group-hover:animate-spreadOut
            group-hover:opacity-100
          "
        >
          avid Tellis
        </span>
      </a>
    </header>
  );
};

export default Header;