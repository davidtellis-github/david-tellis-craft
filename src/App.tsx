import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import WorkCaseStudy from "./pages/WorkCaseStudy";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";
import GalleryPage from "./pages/GalleryPage";
import SplashScreen from "@/components/portfolio/SplashScreen";
import HandGestureManager from "@/components/portfolio/HandGestureManager";

const App = () => (
  <TooltipProvider>
    <SplashScreen />
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <HandGestureManager />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/gallery" element={<GalleryPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="/work/:slug" element={<WorkCaseStudy />} />
        <Route path="/project/:slug" element={<ProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
