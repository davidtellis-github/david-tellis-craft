import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Users, Palette, Lightbulb } from 'lucide-react';

interface ContributionBadgeProps {
  level: string;
  className?: string;
  showIcon?: boolean;
}

const contributionConfig = {
  'Lead Designer': {
    icon: Crown,
    variant: 'default' as const,
    color: 'bg-primary text-primary-foreground'
  },
  'UI Contributor': {
    icon: Users,
    variant: 'secondary' as const,
    color: 'bg-secondary text-secondary-foreground'
  },
  'UI Exploration': {
    icon: Palette,
    variant: 'outline' as const,
    color: 'bg-accent text-accent-foreground'
  },
  'Concept Design': {
    icon: Lightbulb,
    variant: 'outline' as const,
    color: 'bg-muted text-muted-foreground'
  }
};

export const ContributionBadge: React.FC<ContributionBadgeProps> = ({ 
  level, 
  className = "",
  showIcon = true 
}) => {
  const config = contributionConfig[level as keyof typeof contributionConfig] || contributionConfig['UI Contributor'];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={`inline-flex items-center gap-1 ${className}`}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {level}
    </Badge>
  );
};