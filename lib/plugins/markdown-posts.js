import ssbl from 'ssbl'

/**
 * @typedef {Object} PostSpec
 * @property {string} title
 * @property {Date} date
 * @property {string} [base]
 * @property {string} [path]
 */

/**
 * @typedef {Object} BlogPost
 * @property {PostSpec} spec
 * @property {string} page
 */

/**
 * @typedef {Object} MarkdownPostsConfig
 * @property {string} postRoot
 * @property {string} [path]
 */

/**
 * @param {string} postPath
 * @param {PostSpec} spec
 * @returns {string}
 */
function specToPath (postPath, spec) {
  return postPath
    .replace(/\{year\}/g, String(spec.date.getFullYear()))
    // padded month
    .replace(/\{month\}/g, (spec.date.getMonth() < 9 ? '0' : '') + (spec.date.getMonth() + 1))
    .replace(/\{title\}/g, spec.base || '')
    .replace(/^\/?/, '/') // always / at the start
}

/**
 * @param {string} title
 * @returns {string}
 */
function titleToBase (title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s.-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * @param {MarkdownPostsConfig} config
 * @param {BlogPost[]} posts
 */
function fixPosts (config, posts) {
  for (const post of posts) {
    if (!post.spec.base) {
      post.spec.base = titleToBase(post.spec.title)
    }
    // Allow post-specific path pattern in metadata, otherwise use config pattern
    const pathPattern = post.spec.path || config.path || '{title}.html'
    post.spec.path = specToPath(pathPattern, post.spec)
  }
}

/**
 * Load markdown blog posts from a directory
 * @param {import('../blorg.js').default} blorg
 * @param {MarkdownPostsConfig} config
 * @returns {Promise<BlogPost[]>}
 */
export default async function markdownPosts (blorg, config) {
  if (typeof config.postRoot !== 'string') {
    throw new Error('Must supply a "postRoot" value for markdown-posts')
  }
  if (typeof config.path !== 'string') {
    config.path = '{title}.html'
  }

  const uri = await blorg.toDirectory(config.postRoot)
  const posts = /** @type {BlogPost[]} */ (await ssbl(uri))

  fixPosts(config, posts)
  return posts
}
