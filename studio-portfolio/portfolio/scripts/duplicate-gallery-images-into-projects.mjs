import process from 'node:process'
import {getCliClient} from 'sanity/cli'

const getArg = (name) => {
  const idx = process.argv.indexOf(`--${name}`)
  if (idx === -1) return null
  const val = process.argv[idx + 1]
  if (!val || val.startsWith('--')) return ''
  return val
}

const hasFlag = (name) => process.argv.includes(`--${name}`)

const fnv1a32 = (str) => {
  let hash = 0x811c9dc5
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

const unique = (arr) => Array.from(new Set(arr.filter(Boolean)))

const titleCaseFromSlug = (slug) =>
  String(slug)
    .split('-')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')

const PROJECT_PREFIX_ALIASES = {
  // Project slug -> filename prefix aliases (lowercased match)
  'health-project': ['medpass', 'medpass-healthcare', 'healthcare'],
  turbocloud: ['turbocloud', 'tubocloud'],
  'wedding-verse': ['wedding-verse', 'weddingverse', 'weddingv', 'wedding'],
}

const main = async () => {
  const sectionName = getArg('sectionName') || 'Archived'
  const dryRun = hasFlag('dry-run')
  const createMissing = hasFlag('create-missing')

  const client = getCliClient({apiVersion: '2023-10-01'})

  // Fetch all gallery images once, then match in JS
  const gallery = await client.fetch(
    `*[_type == "galleryImage" && defined(image.asset)]{
      _id,
      title,
      "originalFilename": image.asset->originalFilename,
      "assetId": image.asset->_id
    }`
  )

  if (!gallery.length) {
    console.log('No galleryImage documents found.')
    return
  }

  const projects = await client.fetch(`*[_type == "project"]{_id, title, sections, thumbnail}`)

  // Optionally ensure project docs exist for your known portfolio slugs
  if (createMissing) {
    const desiredProjectIds = [
      'wedding-verse',
      'ideabaaz',
      'futurcraft-ai',
      'turbocloud',
      'health-project',
      'boston-financial',
      'fitness-app',
      'verasap',
    ]

    const existingIds = new Set(projects.map((p) => p._id))
    const toCreate = desiredProjectIds.filter((id) => !existingIds.has(id))

    for (const id of toCreate) {
      if (dryRun) {
        console.log(`- would create project doc: ${id}`)
        continue
      }
      await client.createIfNotExists({
        _id: id,
        _type: 'project',
        title: titleCaseFromSlug(id),
        sections: [],
      })
      console.log(`- created project doc: ${id}`)
    }
  }

  const refreshedProjects = await client.fetch(`*[_type == "project"]{_id, title, sections, thumbnail}`)

  console.log(`Found ${refreshedProjects.length} project(s) and ${gallery.length} galleryImage doc(s).`)
  console.log(dryRun ? 'Running in DRY RUN mode (no writes).' : 'Writing changes to Sanity…')

  let touched = 0

  for (const project of refreshedProjects) {
    const projectId = project._id

    const idSegments = projectId.split('-').filter(Boolean)
    const firstSegment = idSegments[0]
    const idMinusAi = projectId.endsWith('-ai') ? projectId.slice(0, -3) : null

    // Build prefix candidates used by local filenames (eg: wedding-verse-..., futurcraft-..., turbocloud-...)
    const prefixCandidates = unique([
      ...(PROJECT_PREFIX_ALIASES[projectId] || []),
      projectId,
      idMinusAi,
      firstSegment,
      (project?.title || '').toLowerCase().split(/\s+/)[0],
    ])

    const matches = gallery
      .filter((g) => {
        const filename = (g.originalFilename || '').toLowerCase()
        return prefixCandidates.some((p) => p && filename.startsWith(String(p).toLowerCase()))
      })
      .sort((a, b) => String(a.originalFilename).localeCompare(String(b.originalFilename)))

    if (!matches.length) continue

    const nextImages = matches.map((m) => ({
      _key: `img-${fnv1a32(`${sectionName}:${projectId}:${m.assetId}`)}`,
      _type: 'image',
      asset: {_type: 'reference', _ref: m.assetId},
    }))

    const currentSections = Array.isArray(project.sections) ? project.sections : []
    const sectionIdx = currentSections.findIndex((s) => s?.categoryName === sectionName)
    const mergedSections = [...currentSections]

    if (sectionIdx === -1) {
      mergedSections.push({
        _key: `sec-${fnv1a32(`${projectId}:${sectionName}`)}`,
        _type: 'section',
        categoryName: sectionName,
        projectImages: nextImages,
      })
    } else {
      const current = mergedSections[sectionIdx]
      const currentImages = Array.isArray(current?.projectImages) ? current.projectImages : []
      const existingRefs = new Set(currentImages.map((img) => img?.asset?._ref).filter(Boolean))
      const dedupedNew = nextImages.filter((img) => !existingRefs.has(img.asset._ref))
      mergedSections[sectionIdx] = {...current, projectImages: [...currentImages, ...dedupedNew]}
    }

    if (dryRun) {
      console.log(`- ${projectId}: would link ${matches.length} gallery image(s) into section "${sectionName}"`)
      continue
    }

    let patch = client.patch(projectId).set({sections: mergedSections})
    if (!project.thumbnail && matches[0]?.assetId) {
      patch = patch.set({
        thumbnail: {
          _type: 'image',
          asset: {_type: 'reference', _ref: matches[0].assetId},
        },
      })
    }

    await patch.commit({autoGenerateArrayKeys: true})
    touched += 1
    console.log(`- ${projectId}: linked ${matches.length} image(s)`)
  }

  if (!dryRun) console.log(`Done. updatedProjects=${touched}`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
