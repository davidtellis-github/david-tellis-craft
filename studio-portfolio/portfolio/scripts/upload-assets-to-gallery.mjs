import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {getCliClient} from 'sanity/cli'

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tif', '.tiff', '.avif', '.heic'])

const getArg = (name) => {
  const idx = process.argv.indexOf(`--${name}`)
  if (idx === -1) return null
  const val = process.argv[idx + 1]
  if (!val || val.startsWith('--')) return ''
  return val
}

const hasFlag = (name) => process.argv.includes(`--${name}`)

const usage = () => {
  console.log(
    [
      'Usage:',
      '  npx sanity exec scripts/upload-assets-to-gallery.mjs --with-user-token -- --assetsDir ../../src/assets',
      '',
      'Options:',
      '  --assetsDir <dir>         Local folder of images (default: ../../src/assets)',
      '  --category <string>       Category to set (default: Archived)',
      '  --skip-existing           Skip galleryImage docs that already exist (default)',
      '  --no-skip-existing        Recreate/replace galleryImage docs',
      '',
      'Notes:',
      '  - Reuses existing image assets by matching originalFilename.',
      '  - Creates deterministic galleryImage document IDs to avoid duplicates.',
    ].join('\n')
  )
}

const titleFromFilename = (filename) =>
  filename
    .replace(path.extname(filename), '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// Simple stable hash (FNV-1a 32-bit) for deterministic document IDs
const fnv1a32 = (str) => {
  let hash = 0x811c9dc5
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

const main = async () => {
  const assetsDir = getArg('assetsDir') || '../../src/assets'
  const category = getArg('category') || 'Archived'
  const skipExisting = hasFlag('no-skip-existing') ? false : true

  const absAssetsDir = path.resolve(process.cwd(), assetsDir)
  const stat = await fs.promises.stat(absAssetsDir).catch(() => null)
  if (!stat?.isDirectory()) {
    console.error(`Not a directory: ${absAssetsDir}`)
    usage()
    process.exitCode = 1
    return
  }

  const client = getCliClient({apiVersion: '2023-10-01'})

  const entries = await fs.promises.readdir(absAssetsDir, {withFileTypes: true})
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => IMAGE_EXTS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))

  if (files.length === 0) {
    console.log(`No images found in ${absAssetsDir}`)
    return
  }

  console.log(`Uploading ${files.length} image(s) as galleryImage (category="${category}")…`)

  let created = 0
  let skipped = 0
  let failed = 0

  for (const filename of files) {
    const filePath = path.join(absAssetsDir, filename)
    const docId = `galleryImage-${fnv1a32(`${category}:${filename}`)}`

    try {
      if (skipExisting) {
        const existingDoc = await client.getDocument(docId)
        if (existingDoc) {
          skipped += 1
          process.stdout.write(`- skip ${filename}\n`)
          continue
        }
      }

      // Reuse asset if an asset with the same originalFilename already exists
      const existingAsset = await client.fetch(
        '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}',
        {filename}
      )

      let assetId = existingAsset?._id
      if (!assetId) {
        const uploaded = await client.assets.upload('image', fs.createReadStream(filePath), {filename})
        assetId = uploaded._id
      }

      const doc = {
        _id: docId,
        _type: 'galleryImage',
        title: titleFromFilename(filename),
        category,
        image: {
          _type: 'image',
          asset: {_type: 'reference', _ref: assetId},
        },
      }

      await client.createOrReplace(doc)
      created += 1
      process.stdout.write(`- ok   ${filename}\n`)
    } catch (err) {
      failed += 1
      process.stdout.write(`- fail ${filename}\n`)
      console.error(err)
    }
  }

  console.log(`Done. created=${created} skipped=${skipped} failed=${failed}`)
  if (failed > 0) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

