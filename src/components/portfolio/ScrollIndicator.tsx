import React from 'react';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2 animate-bounce">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">
        Scroll to Explore
      </span>
      <ChevronDown className="w-5 h-5 text-muted-foreground" />
    </div>
  );
};
