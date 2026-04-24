import { useEffect, useMemo, useState } from "react";
import { sanity } from "@/integrations/sanity/client";
import { urlFor } from "@/integrations/sanity/image";

type SanityImage = {
  originalFilename?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

type SanityProjectDoc = {
  _id: string;
  thumbnail?: SanityImage;
  sections?: Array<{
    projectImages?: SanityImage[];
  }>;
};

const filenameLooksFeatured = (filename?: string | null) =>
  typeof filename === "string" && filename.toLowerCase().includes("featured");

export const useSanityProjectFeaturedImages = (projectIds: string[]) => {
  const [byId, setById] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const idsKey = useMemo(() => {
    const ids = Array.from(new Set(projectIds.filter(Boolean))).sort((a, b) => a.localeCompare(b));
    return ids.join("|");
  }, [projectIds]);

  const ids = useMemo(() => (idsKey ? idsKey.split("|") : []), [idsKey]);

  useEffect(() => {
    let cancelled = false;
    if (ids.length === 0) return;

    const load = async () => {
      try {
        setLoading(true);

        const docs = await sanity.fetch<SanityProjectDoc[]>(
          `*[_type == "project" && _id in $ids]{
            _id,
            thumbnail{
              ...,
              "originalFilename": asset->originalFilename
            },
            sections[]{
              projectImages[]{
                ...,
                "originalFilename": asset->originalFilename
              }
            }
          }`,
          { ids }
        );

        const next: Record<string, string> = {};

        for (const d of docs) {
          const images =
            d.sections?.flatMap((s) => (Array.isArray(s?.projectImages) ? s.projectImages : [])) ?? [];

          const featured = images.find((img) => filenameLooksFeatured(img.originalFilename)) ?? null;
          const candidate = featured ?? d.thumbnail ?? images[0] ?? null;

          if (candidate) {
            next[d._id] = urlFor(candidate as never).width(1800).quality(80).auto("format").url();
          }
        }

        if (!cancelled) setById(next);
      } catch {
        if (!cancelled) setById({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [idsKey, ids]);

  return { byId, loading };
};
