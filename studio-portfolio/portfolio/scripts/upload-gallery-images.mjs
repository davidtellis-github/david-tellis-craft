import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {createClient} from '@sanity/client'

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
      '  SANITY_AUTH_TOKEN=... node ./scripts/upload-gallery-images.mjs --dir <folder>',
      '',
      'Options:',
      '  --dir <folder>         Local folder of images (required)',
      '  --category <string>    Category to set (default: Archived)',
      '  --projectId <id>       Override projectId (default: from SANITY_PROJECT_ID or sanity.config.ts)',
      '  --dataset <name>       Override dataset (default: from SANITY_DATASET or sanity.config.ts)',
      '  --skip-existing        Skip docs that already exist (default)',
      '  --no-skip-existing     Re-upload and replace docs',
      '',
      'Env:',
      '  SANITY_AUTH_TOKEN / SANITY_API_TOKEN / SANITY_TOKEN (required, must have write access)',
      '  SANITY_PROJECT_ID (optional)',
      '  SANITY_DATASET (optional)',
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
  const dir = getArg('dir')
  if (!dir) {
    usage()
    process.exitCode = 1
    return
  }

  const category = getArg('category') || 'Archived'
  const projectId = getArg('projectId') || process.env.SANITY_PROJECT_ID || '9pmyeljr'
  const dataset = getArg('dataset') || process.env.SANITY_DATASET || 'image_gal_proj'
  const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN
  const skipExisting = hasFlag('no-skip-existing') ? false : true

  if (!token) {
    console.error('Missing SANITY_AUTH_TOKEN (or SANITY_API_TOKEN / SANITY_TOKEN).')
    process.exitCode = 1
    return
  }

  const absDir = path.resolve(process.cwd(), dir)
  const stat = await fs.promises.stat(absDir).catch(() => null)
  if (!stat?.isDirectory()) {
    console.error(`Not a directory: ${absDir}`)
    process.exitCode = 1
    return
  }

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2023-10-01',
    useCdn: false,
  })

  const entries = await fs.promises.readdir(absDir, {withFileTypes: true})
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => IMAGE_EXTS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))

  if (files.length === 0) {
    console.log(`No images found in ${absDir}`)
    return
  }

  console.log(`Uploading ${files.length} image(s) to ${projectId}/${dataset} with category "${category}"…`)

  let created = 0
  let skipped = 0
  let failed = 0

  for (const filename of files) {
    const filePath = path.join(absDir, filename)
    const docId = `galleryImage-${fnv1a32(`${category}:${filename}`)}`

    try {
      if (skipExisting) {
        const existing = await client.getDocument(docId)
        if (existing) {
          skipped += 1
          process.stdout.write(`- skip ${filename}\n`)
          continue
        }
      }

      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename,
      })

      const doc = {
        _id: docId,
        _type: 'galleryImage',
        title: titleFromFilename(filename),
        category,
        image: {
          _type: 'image',
          asset: {_type: 'reference', _ref: asset._id},
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

