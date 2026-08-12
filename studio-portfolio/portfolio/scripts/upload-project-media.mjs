// Token-based upload (bypasses `sanity login` CLI session, which needs an
// interactive browser OAuth callback that doesn't work in every environment).
// Reads SANITY_API_TOKEN from the environment — run with:
//   node --env-file=.env scripts/upload-project-media.mjs --docId bam --title BAM --image <path> --video <path> [--videoField fieldName]
//   node --env-file=.env scripts/upload-project-media.mjs --docId bam --section "Onboarding" --images "path1.jpg,path2.jpg"
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@sanity/client";

const fnv1a32 = (str) => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
};

const getArg = (name) => {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return null;
  const val = process.argv[idx + 1];
  if (!val || val.startsWith("--")) return null;
  return val;
};

const main = async () => {
  const docId = getArg("docId");
  const title = getArg("title") || docId;
  const imagePath = getArg("image");
  const videoPath = getArg("video");
  const videoField = getArg("videoField") || "heroVideo";
  const sectionName = getArg("section");
  const imagesArg = getArg("images");
  const token = process.env.SANITY_API_TOKEN;

  if (!docId) {
    console.error("Missing --docId");
    process.exitCode = 1;
    return;
  }
  if (!token) {
    console.error("Missing SANITY_API_TOKEN env var (run with --env-file=.env)");
    process.exitCode = 1;
    return;
  }
  if (!imagePath && !videoPath && !(sectionName && imagesArg)) {
    console.error("Provide --image, --video, or --section + --images");
    process.exitCode = 1;
    return;
  }

  const client = createClient({
    projectId: "9pmyeljr",
    dataset: "image_gal_proj",
    apiVersion: "2023-10-01",
    token,
    useCdn: false,
  });

  const patch = {};

  if (imagePath) {
    const abs = path.resolve(process.cwd(), imagePath);
    console.log(`Uploading image ${abs}…`);
    const uploaded = await client.assets.upload("image", fs.createReadStream(abs), {
      filename: path.basename(abs),
    });
    patch.thumbnail = { _type: "image", asset: { _type: "reference", _ref: uploaded._id } };
    console.log(`- ok, asset id ${uploaded._id}`);
  }

  if (videoPath) {
    const abs = path.resolve(process.cwd(), videoPath);
    console.log(`Uploading video ${abs}…`);
    const uploaded = await client.assets.upload("file", fs.createReadStream(abs), {
      filename: path.basename(abs),
    });
    patch[videoField] = { _type: "file", asset: { _type: "reference", _ref: uploaded._id } };
    console.log(`- ok, asset id ${uploaded._id}`);
  }

  const existing = await client.getDocument(docId);

  if (sectionName && imagesArg) {
    const imagePaths = imagesArg.split(",").map((p) => p.trim()).filter(Boolean);
    const projectImages = [];
    for (const imgPath of imagePaths) {
      const abs = path.resolve(process.cwd(), imgPath);
      console.log(`Uploading section image ${abs}…`);
      const uploaded = await client.assets.upload("image", fs.createReadStream(abs), {
        filename: path.basename(abs),
      });
      projectImages.push({
        _key: `img-${fnv1a32(uploaded._id)}`,
        _type: "image",
        asset: { _type: "reference", _ref: uploaded._id },
      });
      console.log(`- ok, asset id ${uploaded._id}`);
    }

    const nextSection = {
      _key: `sec-${fnv1a32(sectionName)}`,
      _type: "section",
      categoryName: sectionName,
      projectImages,
    };

    const existingSections = (existing?.sections ?? []).filter((s) => s.categoryName !== sectionName);
    patch.sections = [...existingSections, nextSection];
  }

  if (!existing) {
    console.log(`Creating project document "${docId}"…`);
    await client.create({ _id: docId, _type: "project", title, ...patch });
  } else {
    console.log(`Patching existing project document "${docId}"…`);
    await client.patch(docId).set(patch).commit();
  }

  console.log("Done.");
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
