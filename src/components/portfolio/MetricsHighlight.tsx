import React from 'react';
import { TrendingUp } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change?: string;
}

interface MetricsHighlightProps {
  metrics: Metric[];
  className?: string;
}

export const MetricsHighlight: React.FC<MetricsHighlightProps> = ({ metrics, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="relative group"
        >
          <div className="bg-muted/20 backdrop-blur-sm rounded-2xl p-6 border border-border/20 hover:border-border/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {metric.label}
              </p>
              {metric.change && (
                <p className="text-xs text-primary/80 font-medium">
                  {metric.change}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
