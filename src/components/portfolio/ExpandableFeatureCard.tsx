import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableFeatureCardProps {
  title: string;
  description: string;
  icon: string;
  isComingSoon?: boolean;
}

export const ExpandableFeatureCard: React.FC<ExpandableFeatureCardProps> = ({
  title,
  description,
  icon,
  isComingSoon = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasLongDescription = description.length > 120;

  return (
    <div className="group relative border border-border/30 rounded-xl p-8 hover:border-foreground/40 hover:shadow-lg transition-all duration-500 bg-card/50">
      {isComingSoon && (
        <span className="absolute top-6 right-6 text-xs px-3 py-2 rounded-full bg-muted/50 text-muted-foreground tracking-wider">
          Coming Soon
        </span>
      )}
      
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-light mb-4 group-hover:text-foreground transition-colors">
            {title}
          </h3>
          
          <p className={`text-muted-foreground leading-[2] font-light ${
            hasLongDescription && !isExpanded ? 'line-clamp-3' : ''
          }`}>
            {description}
          </p>

          {hasLongDescription && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-sm text-foreground/60 hover:text-foreground flex items-center gap-2 transition-colors font-light"
            >
              {isExpanded ? 'Show less' : 'Read more'}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
