import React from 'react';
import { Users, Calendar, Layers, Wrench } from 'lucide-react';

interface QuickStatsBarProps {
  team: string;
  duration: string;
  services: string;
  tools: string[];
}

export const QuickStatsBar: React.FC<QuickStatsBarProps> = ({
  team,
  duration,
  services,
  tools
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-4 min-w-max py-6">
        {/* Team */}
        <div className="flex items-center gap-3 px-6 py-4 rounded-lg bg-muted/30 border border-border hover:border-foreground/20 transition-all duration-300">
          <Users className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <div>
            <div className="text-xs text-muted-foreground mb-1">Team</div>
            <div className="text-sm font-medium">{team}</div>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-3 px-6 py-4 rounded-lg bg-muted/30 border border-border hover:border-foreground/20 transition-all duration-300">
          <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <div>
            <div className="text-xs text-muted-foreground mb-1">Duration</div>
            <div className="text-sm font-medium">{duration}</div>
          </div>
        </div>

        {/* Services */}
        <div className="flex items-center gap-3 px-6 py-4 rounded-lg bg-muted/30 border border-border hover:border-foreground/20 transition-all duration-300">
          <Layers className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <div>
            <div className="text-xs text-muted-foreground mb-1">Services</div>
            <div className="text-sm font-medium">{services}</div>
          </div>
        </div>

        {/* Tools */}
        <div className="flex items-center gap-3 px-6 py-4 rounded-lg bg-muted/30 border border-border hover:border-foreground/20 transition-all duration-300">
          <Wrench className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <div>
            <div className="text-xs text-muted-foreground mb-1">Tools</div>
            <div className="text-sm font-medium">{tools.slice(0, 2).join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
