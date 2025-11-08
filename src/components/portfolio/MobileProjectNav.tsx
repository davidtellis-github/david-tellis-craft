import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const sections = [
  { id: 'overview', label: 'Overview', icon: '📋' },
  { id: 'context', label: 'Context', icon: '🎯' },
  { id: 'role', label: 'Role', icon: '👤' },
  { id: 'features', label: 'Features', icon: '⚡' },
  { id: 'process', label: 'Process', icon: '🔄' },
  { id: 'design-system', label: 'Design', icon: '🎨' },
  { id: 'iterations', label: 'Iterations', icon: '🔁' },
  { id: 'walkthrough', label: 'Demo', icon: '🎬' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
];

export const MobileProjectNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let current = 'overview';

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0) {
            current = s.id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around px-4 py-3">
          {sections.slice(0, 4).map((section) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'text-foreground bg-muted'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="text-xs">{section.label}</span>
            </button>
          ))}
          
          {/* More Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                <Menu className="w-5 h-5" />
                <span className="text-xs">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh]">
              <div className="py-6">
                <h3 className="text-lg font-medium mb-6">Navigate to Section</h3>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleClick(section.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <span className="text-2xl">{section.icon}</span>
                      <span>{section.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};
