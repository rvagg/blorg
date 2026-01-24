import renderTemplate from '../render-template.js'

/**
 * @typedef {Object} BlogPost
 * @property {Object} spec
 * @property {string} spec.path
 * @property {string} page
 */

/**
 * @typedef {Object} PostFilesData
 * @property {BlogPost[]} blogPosts
 */

/**
 * Render individual post files
 * @param {import('../blorg.js').default} blorg
 * @param {Object} config
 * @param {string} config.outputRoot
 * @param {string} config.template
 * @param {PostFilesData} config.data
 */
export default async function postFiles (blorg, config) {
  if (typeof config.outputRoot !== 'string') {
    throw new Error('Must supply an "outputRoot" value for post-files')
  }
  if (typeof config.template !== 'string') {
    throw new Error('Must supply a "template" value for post-files')
  }

  await Promise.all(config.data.blogPosts.map(async (/** @type {BlogPost} */ post) => {
    await renderTemplate(
      blorg,
      config.template,
      { ...config.data, ...post },
      config.outputRoot,
      post.spec.path
    )
  }))
}
