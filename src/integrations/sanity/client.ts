import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = import.meta.env.VITE_SANITY_DATASET as string | undefined;
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ?? "2023-10-01";

export const sanity = createClient({
  projectId: projectId ?? "9pmyeljr",
  dataset: dataset ?? "image_gal_proj",
  apiVersion,
  useCdn: true,
});

