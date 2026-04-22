import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanity } from "./client";

const builder = imageUrlBuilder(sanity);

export const urlFor = (source: SanityImageSource) => builder.image(source);

