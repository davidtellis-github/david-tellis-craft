import { useEffect, useMemo, useState } from "react";
import { sanity } from "@/integrations/sanity/client";

type SanityProjectDoc = {
  _id: string;
  heroVideo?: { url?: string };
};

// Mirrors useSanityProjectFeaturedImages, but for the `heroVideo` file field
// (uploaded via studio-portfolio/portfolio/scripts/upload-project-media.mjs)
// — used to swap a project's grid-card preview for its actual prototype
// video instead of a static screenshot, where one exists.
export const useSanityProjectHeroVideos = (projectIds: string[]) => {
  const [byId, setById] = useState<Record<string, string>>({});

  const idsKey = useMemo(() => {
    const ids = Array.from(new Set(projectIds.filter(Boolean))).sort((a, b) => a.localeCompare(b));
    return ids.join("|");
  }, [projectIds]);

  const ids = useMemo(() => (idsKey ? idsKey.split("|") : []), [idsKey]);

  useEffect(() => {
    let cancelled = false;
    if (ids.length === 0) return;

    sanity
      .fetch<SanityProjectDoc[]>(
        `*[_type == "project" && _id in $ids]{ _id, heroVideo{"url": asset->url} }`,
        { ids }
      )
      .then((docs) => {
        if (cancelled) return;
        const next: Record<string, string> = {};
        for (const d of docs) {
          if (d.heroVideo?.url) next[d._id] = d.heroVideo.url;
        }
        setById(next);
      })
      .catch(() => {
        if (!cancelled) setById({});
      });

    return () => {
      cancelled = true;
    };
  }, [idsKey, ids]);

  return { byId };
};
