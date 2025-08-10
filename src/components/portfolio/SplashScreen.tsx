import React from "react";

const SplashScreen: React.FC = () => {
  const [fade, setFade] = React.useState(false);
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), 2000); // show for 2s
    const hideTimer = setTimeout(() => setShow(false), 4000); // allow fade-out to complete
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-50",
        "bg-background text-foreground",
        "transition-opacity duration-700 ease-out",
        fade ? "opacity-0" : "opacity-100",
      ].join(" ")}
      aria-hidden={!show}
    >
      <div className="h-full w-full flex items-center justify-start p-6 md:p-10 text-left">
        <div
          className={[
            "transition-all duration-700 ease-out",
            fade ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          <h1 className="font-semibold tracking-tight leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            David tellis
          </h1>
          <p className="mt-4 font-regular font-medium tracking-tight leading-[1.1] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            ——Digital Product Designer
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
