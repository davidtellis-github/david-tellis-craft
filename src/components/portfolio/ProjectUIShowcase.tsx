import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UIGallery } from './UIGallery';
import { ContributionBadge } from './ContributionBadge';
import { useProjectAssets } from '@/hooks/useProjectAssets';
import { Eye, Grid, List } from 'lucide-react';

interface ProjectUIShowcaseProps {
  projectSlug: string;
  projectTitle: string;
  contributionLevel?: string;
  className?: string;
}

export const ProjectUIShowcase: React.FC<ProjectUIShowcaseProps> = ({
  projectSlug,
  projectTitle,
  contributionLevel,
  className = ""
}) => {
  const { assets, explorations, isLoading, error, featuredAssets, galleryAssets } = useProjectAssets(projectSlug);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">Error loading UI assets: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const allUIAssets = [
    ...assets.map(asset => ({
      id: asset.id,
      title: asset.alt_text || `${projectTitle} UI`,
      description: asset.caption,
      image_url: asset.file_path,
      tags: asset.asset_tags,
      contribution_level: contributionLevel || 'Lead Designer',
      is_featured: asset.is_featured
    })),
    ...explorations.map(exploration => ({
      id: exploration.id,
      title: exploration.title,
      description: exploration.description,
      image_url: exploration.image_url,
      tags: exploration.tags,
      contribution_level: exploration.contribution_level,
      is_featured: exploration.is_featured
    }))
  ];

  if (allUIAssets.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl">UI Showcase</CardTitle>
            {contributionLevel && (
              <ContributionBadge level={contributionLevel} />
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All ({allUIAssets.length})
            </TabsTrigger>
            <TabsTrigger value="featured">
              Featured ({allUIAssets.filter(a => a.is_featured).length})
            </TabsTrigger>
            <TabsTrigger value="gallery">
              Gallery ({allUIAssets.filter(a => !a.is_featured).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <UIGallery 
              assets={allUIAssets} 
              projectTitle={projectTitle}
              className={viewMode === 'list' ? 'list-view' : ''}
            />
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            <UIGallery 
              assets={allUIAssets.filter(asset => asset.is_featured)} 
              projectTitle={projectTitle}
              className={viewMode === 'list' ? 'list-view' : ''}
            />
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <UIGallery 
              assets={allUIAssets.filter(asset => !asset.is_featured)} 
              projectTitle={projectTitle}
              className={viewMode === 'list' ? 'list-view' : ''}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};