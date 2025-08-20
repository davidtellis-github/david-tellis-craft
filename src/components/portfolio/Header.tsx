import React from "react";

const Header: React.FC = () => {
  return (
    <header
      className="
        w-full flex items-center justify-between 
        py-6 px-4 h-[20vh] md:px-8 lg:px-12 
    top-0 z-50
        bg-[url('src/assets/baground.svg')] bg-no-repeat bg-center bg-cover 
        bg-background/90 
      "
    >
      {/* Left: Logo / Name */}
      {/* <a
        href="#intro"
        className="text-xl md:text-2xl font-semibold tracking-tight text-foreground"
      >
        D<span className="font-light">avid Tellis</span>
      </a> */}

      {/* Right: Quick Nav (for mobile / top)
      <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
        <a href="#work" className="hover:text-foreground transition-colors">
          Work
        </a>
        <a href="#values" className="hover:text-foreground transition-colors">
          Values
        </a>
        <a href="#background" className="hover:text-foreground transition-colors">
          Background
        </a>
        <a href="#contact" className="hover:text-foreground transition-colors">
          Contact
        </a>
      </nav> */}
    </header>
  );
};

export default Header;
