import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AmbientSpotlight from "@/components/portfolio/AmbientSpotlight"


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <AmbientSpotlight/>
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-6xl font-medium mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
          <a href="/" className="underline underline-offset-4 hover:text-primary transition-colors">Return to Home</a>
        </div>
      </main>
    </>
  );
};

export default NotFound;
