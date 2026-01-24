import renderTemplate from '../render-template.js'

/**
 * @typedef {Object} BlogPost
 * @property {Object} spec
 * @property {string} page
 */

/**
 * @typedef {Object} IndexFilesConfig
 * @property {string} outputRoot
 * @property {string} template
 * @property {string} indexFile
 * @property {string} archiveFile
 * @property {number} [postsPerPage]
 * @property {{ blogPosts: BlogPost[] }} data
 */

/**
 * @param {import('../blorg.js').default} blorg
 * @param {IndexFilesConfig} config
 * @param {number} page
 * @param {number|null} nextPage
 * @param {number|null} prevPage
 * @param {BlogPost[]} posts
 */
async function processIndex (blorg, config, page, nextPage, prevPage, posts) {
  const path = page === 0
    ? config.indexFile
    : config.archiveFile.replace(/\{number\}/g, String(page))

  await renderTemplate(
    blorg,
    config.template,
    {
      ...config.data,
      posts,
      nextPage,
      prevPage
    },
    config.outputRoot,
    path
  )
}

/**
 * Render index and archive pages
 * @param {import('../blorg.js').default} blorg
 * @param {IndexFilesConfig} config
 */
export default async function indexFiles (blorg, config) {
  if (typeof config.outputRoot !== 'string') {
    throw new Error('Must supply an "outputRoot" value for index-files')
  }
  if (typeof config.template !== 'string') {
    throw new Error('Must supply a "template" value for index-files')
  }
  if (typeof config.indexFile !== 'string') {
    throw new Error('Must supply an "indexFile" value for index-files')
  }
  if (typeof config.archiveFile !== 'string') {
    throw new Error('Must supply an "archiveFile" value for index-files')
  }

  const postsPerPage = typeof config.postsPerPage === 'number'
    ? config.postsPerPage
    : 5
  const posts = config.data.blogPosts

  const pages = []
  for (let i = 0, page = 0; i < posts.length; i += postsPerPage, page++) {
    const nextPage = i + postsPerPage >= posts.length ? null : page + 1
    const prevPage = i === 0 ? null : page - 1
    pages.push(processIndex(
      blorg,
      config,
      page,
      nextPage,
      prevPage,
      posts.slice(i, i + postsPerPage)
    ))
  }

  await Promise.all(pages)
}
