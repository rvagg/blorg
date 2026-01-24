/**
 * @typedef {Object} PostSpec
 * @property {string} title
 * @property {Date} date
 * @property {string} path
 */

/**
 * Extract just the spec (metadata) from blog posts
 * @param {import('../blorg.js').default} blorg
 * @param {Object} config
 * @param {string} config.blogData
 * @returns {Promise<PostSpec[]>}
 */
export default async function postSpecs (blorg, config) {
  if (typeof config.blogData !== 'string') {
    throw new Error('Must supply a "blogData" value for post-specs')
  }

  const blogData = blorg.getData(config.blogData)

  if (!Array.isArray(blogData)) {
    throw new Error('"blogData" setting for post-specs doesn\'t seem to point to a blog data plugin id')
  }

  return blogData.map((post) => post.spec)
}
