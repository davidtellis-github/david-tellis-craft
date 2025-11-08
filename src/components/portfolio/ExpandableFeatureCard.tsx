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
    <div className="group relative border border-border rounded-lg p-6 hover:border-foreground/20 hover:shadow-md transition-all duration-300 bg-card">
      {isComingSoon && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
          Coming Soon
        </span>
      )}
      
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium mb-2 group-hover:text-foreground transition-colors">
            {title}
          </h3>
          
          <p className={`text-muted-foreground leading-relaxed ${
            hasLongDescription && !isExpanded ? 'line-clamp-3' : ''
          }`}>
            {description}
          </p>

          {hasLongDescription && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-sm text-foreground/60 hover:text-foreground flex items-center gap-1 transition-colors"
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
