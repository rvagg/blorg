import { mkdir, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'

/**
 * Render a template and write to file
 * @param {import('./blorg.js').default} blorg
 * @param {string} templateId
 * @param {Object} data
 * @param {string} outputRoot
 * @param {string} outputFile
 */
export default async function renderTemplate (blorg, templateId, data, outputRoot, outputFile) {
  const template = blorg.getData(templateId)
  const rendered = template(data)

  const uri = await blorg.toDirectory(outputRoot)
  const out = join(uri, outputFile)

  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, rendered, 'utf8')
}
