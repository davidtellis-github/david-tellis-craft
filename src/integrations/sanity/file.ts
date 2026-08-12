import { sanity } from "./client";

// Sanity file assets (unlike images) have no URL-builder package — the CDN
// URL is deterministic from the asset ref: `file-<id>-<ext>` ->
// `https://cdn.sanity.io/files/<projectId>/<dataset>/<id>.<ext>`.
export const fileUrlFor = (ref: string): string | null => {
  const match = /^file-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)$/.exec(ref);
  if (!match) return null;
  const [, id, extension] = match;
  const { projectId, dataset } = sanity.config();
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
};
