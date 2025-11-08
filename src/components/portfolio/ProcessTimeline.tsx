import React from 'react';

interface ProcessStep {
  step: string;
  description: string;
  icon: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
  return (
    <div className="relative">
      {/* Timeline line - hidden on mobile */}
      <div className="hidden md:block absolute left-[52px] top-12 bottom-12 w-px bg-border" />

      <div className="space-y-8 md:space-y-12">
        {steps.map((process, index) => (
          <div
            key={index}
            className="relative flex items-start gap-6 md:gap-8 group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Step Number & Icon */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted flex items-center justify-center border-2 border-border group-hover:border-foreground/20 transition-all duration-300 relative z-10">
                <span className="text-2xl md:text-3xl" aria-hidden="true">
                  {process.icon}
                </span>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 pt-3">
              <h3 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-foreground transition-colors">
                {process.step}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {process.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
