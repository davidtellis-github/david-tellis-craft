import process from 'node:process'
import {getCliClient} from 'sanity/cli'

const getArg = (name) => {
  const idx = process.argv.indexOf(`--${name}`)
  if (idx === -1) return null
  const val = process.argv[idx + 1]
  if (!val || val.startsWith('--')) return ''
  return val
}

const main = async () => {
  const client = getCliClient({apiVersion: '2023-10-01'})
  const sectionName = getArg('sectionName') || 'Archived'

  const projects = await client.fetch(
    `*[_type == "project"]|order(_id asc){
      _id,
      title,
      thumbnail{
        asset->{
          _id,
          originalFilename
        }
      },
      sections[]{
        categoryName,
        projectImages[]{
          asset->{
            _id,
            originalFilename
          }
        }
      }
    }`
  )

  if (!projects.length) {
    console.log('No project documents found.')
    return
  }

  const problems = []

  for (const p of projects) {
    const sections = Array.isArray(p.sections) ? p.sections : []
    const allImages = sections.flatMap((s) => (Array.isArray(s?.projectImages) ? s.projectImages : []))
    const missingAssets = allImages.filter((img) => !img?.asset?._id)

    const targetSection = sections.find((s) => s?.categoryName === sectionName)
    const sectionCount = targetSection?.projectImages?.length ?? 0

    const sample = allImages
      .map((img) => img?.asset?.originalFilename)
      .filter(Boolean)
      .slice(0, 6)

    const thumbFile = p.thumbnail?.asset?.originalFilename ?? null

    console.log(
      [
        `- ${p._id}`,
        `  title: ${p.title ?? '(no title)'}`,
        `  thumbnail: ${thumbFile ?? '(missing)'}`,
        `  sections: ${sections.length}`,
        `  images(total): ${allImages.length}`,
        `  images("${sectionName}"): ${sectionCount}`,
        `  sample: ${sample.length ? sample.join(', ') : '(none)'}`,
      ].join('\n')
    )

    if (!p.thumbnail?.asset?._id) problems.push(`${p._id}: missing thumbnail asset ref`)
    if (allImages.length === 0) problems.push(`${p._id}: no projectImages`)
    if (missingAssets.length > 0) problems.push(`${p._id}: ${missingAssets.length} image(s) missing asset ref`)
  }

  if (problems.length) {
    console.log('\nProblems:')
    for (const msg of problems) console.log(`- ${msg}`)
    process.exitCode = 1
  } else {
    console.log('\nAll projects have Sanity asset-backed images.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

