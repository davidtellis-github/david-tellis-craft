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

const usage = () => {
  console.log(
    [
      'Usage:',
      '  npx sanity exec scripts/upload-assets-to-project.mjs --with-user-token -- --assetsDir ../../src/assets',
      '',
      'Options:',
      '  --assetsDir <dir>      Local folder of images (default: ../../src/assets)',
      '  --keyword <string>     Keyword to match in filename (default: wedding)',
      '  --docId <string>       Sanity document id for the project (default: wedding-verse)',
      '  --title <string>       Project title if document is created (default: Wedding Verse)',
      '  --sectionName <string> Section categoryName to upsert (default: Archived)',
      '',
      'Notes:',
      '  - Reuses existing image assets by matching originalFilename.',
      '  - Creates the project document if it does not exist.',
    ].join('\n')
  )
}

const fnv1a32 = (str) => {
  let hash = 0x811c9dc5
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

const titleFromFilename = (filename) =>
  filename
    .replace(path.extname(filename), '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const toImageValue = (assetId, keySeed) => ({
  _key: `img-${fnv1a32(keySeed)}`,
  _type: 'image',
  asset: {_type: 'reference', _ref: assetId},
})

const main = async () => {
  const assetsDir = getArg('assetsDir') || '../../src/assets'
  const keyword = (getArg('keyword') || 'wedding').toLowerCase()
  const docId = getArg('docId') || 'wedding-verse'
  const title = getArg('title') || 'Wedding Verse'
  const sectionName = getArg('sectionName') || 'Archived'

  if (!keyword) {
    usage()
    process.exitCode = 1
    return
  }

  const absAssetsDir = path.resolve(process.cwd(), assetsDir)
  const stat = await fs.promises.stat(absAssetsDir).catch(() => null)
  if (!stat?.isDirectory()) {
    console.error(`Not a directory: ${absAssetsDir}`)
    process.exitCode = 1
    return
  }

  const client = getCliClient({apiVersion: '2023-10-01'})

  const entries = await fs.promises.readdir(absAssetsDir, {withFileTypes: true})
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => IMAGE_EXTS.has(path.extname(name).toLowerCase()))
    .filter((name) => name.toLowerCase().includes(keyword))
    .sort((a, b) => a.localeCompare(b))

  if (files.length === 0) {
    console.log(`No images matching "${keyword}" found in ${absAssetsDir}`)
    return
  }

  console.log(`Found ${files.length} file(s) matching "${keyword}". Uploading/reusing assets…`)

  const imageValues = []

  for (const filename of files) {
    const filePath = path.join(absAssetsDir, filename)

    // Reuse asset if an asset with the same originalFilename already exists
    const existing = await client.fetch(
      '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}',
      {filename}
    )

    let assetId = existing?._id
    if (!assetId) {
      const uploaded = await client.assets.upload('image', fs.createReadStream(filePath), {filename})
      assetId = uploaded._id
    }

    imageValues.push(toImageValue(assetId, `${sectionName}:${filename}:${assetId}`))
    process.stdout.write(`- ok ${filename}\n`)
  }

  const existingProject = await client.getDocument(docId)

  const sectionKey = `sec-${fnv1a32(sectionName)}`
  const nextSection = {
    _key: sectionKey,
    _type: 'section',
    categoryName: sectionName,
    projectImages: imageValues,
  }

  // Pick a thumbnail (prefer something with "featured" in the filename, else first)
  const featured = files.find((f) => f.toLowerCase().includes('featured')) || files[0]
  const thumbFilename = featured
  const thumbAsset = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}',
    {filename: thumbFilename}
  )
  const thumbValue = thumbAsset?._id
    ? toImageValue(thumbAsset._id, `thumb:${thumbFilename}:${thumbAsset._id}`)
    : null

  if (!existingProject) {
    console.log(`Creating project document "${docId}"…`)
    await client.create({
      _id: docId,
      _type: 'project',
      title,
      thumbnail: thumbValue || undefined,
      sections: [nextSection],
    })
    console.log('Done.')
    return
  }

  const currentSections = Array.isArray(existingProject.sections) ? existingProject.sections : []
  const sectionIdx = currentSections.findIndex((s) => s?.categoryName === sectionName)
  const mergedSections = [...currentSections]

  if (sectionIdx === -1) {
    mergedSections.push(nextSection)
  } else {
    const current = mergedSections[sectionIdx]
    const currentImages = Array.isArray(current?.projectImages) ? current.projectImages : []
    const existingRefs = new Set(
      currentImages.map((img) => img?.asset?._ref).filter(Boolean)
    )

    const dedupedNew = imageValues.filter((img) => !existingRefs.has(img.asset._ref))
    mergedSections[sectionIdx] = {
      ...current,
      projectImages: [...currentImages, ...dedupedNew],
    }
  }

  const patch = client.patch(docId).set({sections: mergedSections})

  if (!existingProject.thumbnail && thumbValue) {
    patch.set({thumbnail: thumbValue})
  }

  await patch.commit({autoGenerateArrayKeys: true})
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

