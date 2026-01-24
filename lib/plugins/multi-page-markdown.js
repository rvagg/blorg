import { readFile } from 'node:fs/promises'
import brucedown from 'brucedown'

const defaultSplitter = /^\s*~~~~~~~~*\s*$/mg

/**
 * @typedef {Object} MultiPageConfig
 * @property {Record<string, string>} files - Map of keys to file paths
 * @property {RegExp} [splitter]
 */

/**
 * Convert markdown file to array of HTML pages
 * @param {string} file
 * @param {RegExp} splitter
 * @returns {Promise<string[]>}
 */
async function convert (file, splitter) {
  const data = await readFile(file, 'utf8')
  const contents = data.split(splitter)
  return Promise.all(contents.map((value) => brucedown(value)))
}

/**
 * Load and convert multiple markdown files, splitting into pages
 * @param {import('../blorg.js').default} blorg
 * @param {MultiPageConfig} config
 * @returns {Promise<Record<string, string[]>>}
 */
export default async function multiPageMarkdown (blorg, config) {
  if (typeof config.files !== 'object') {
    throw new Error('Must supply a "files" object map for multi-page-markdown')
  }

  const splitter = config.splitter || defaultSplitter
  const keys = Object.keys(config.files)

  const results = await Promise.all(
    keys.map(async (key) => {
      const uri = await blorg.toFile(config.files[key])
      return convert(uri, splitter)
    })
  )

  /** @type {Record<string, string[]>} */
  const result = {}
  keys.forEach((key, i) => {
    result[key] = results[i]
  })

  return result
}
