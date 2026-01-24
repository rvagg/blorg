/**
 * @typedef {Object} BlogDataConfig
 * @property {string} id
 * @property {string} type
 * @property {string} [postRoot]
 * @property {string} [path]
 * @property {string} [blogData]
 * @property {string} [file]
 */

/**
 * @typedef {Object} BlogOutputConfig
 * @property {string} id
 * @property {string} type
 * @property {string} [output]
 * @property {string} [template]
 * @property {string[]} [data]
 * @property {number} [postsPerPage]
 * @property {string} [indexFile]
 * @property {string} [archiveFile]
 */

/**
 * @typedef {Object} BlogConfig
 * @property {string} templateRoot
 * @property {string} [outputRoot]
 * @property {BlogDataConfig[]} data
 * @property {BlogOutputConfig[]} output
 */

/** @type {BlogConfig} */
const baseConfig = {
  templateRoot: './templates/',

  data: [
    {
      // This plugin loads and provides all markdown files in a directory by using the 'ssbl' package
      id: 'blogPosts',
      type: 'markdown-posts',
      postRoot: './posts/',
      path: '/{year}/{month}/{title}.html'
    },
    {
      // This plugin provides just the 'spec' part of every post, for summary purposes
      id: 'postSpecs',
      type: 'post-specs',
      blogData: 'blogPosts'
    }
  ],

  output: [
    {
      // This output plugin takes a template, a bunch of data and merges to a single file
      id: 'feed',
      type: 'single-file',
      output: 'atom.xml',
      template: 'feedTemplate',
      data: ['date', 'blogPosts']
    },
    {
      // This output plugin takes the list of posts and merges with a template for individual files
      id: 'posts',
      type: 'post-files',
      template: 'postTemplate',
      data: ['date', 'blogPosts', 'postSpecs']
    },
    {
      // This output plugin takes the list of posts and merges with an index template to write the index & archive files
      id: 'index',
      type: 'index-files',
      postsPerPage: 5,
      indexFile: 'index.html',
      archiveFile: 'page{number}.html',
      template: 'indexTemplate',
      data: ['date', 'blogPosts', 'postSpecs']
    }
  ]
}

/**
 * @typedef {Object} BlogOptions
 * @property {string} outputRoot
 * @property {string} [templateEngine]
 * @property {string} [templateRoot]
 * @property {string} [postRoot]
 * @property {string} [postPath]
 * @property {string} [feedOutput]
 * @property {string} [archiveOutput]
 * @property {string} [indexOutput]
 * @property {Record<string, string>} [templates]
 */

/**
 * Create a blog configuration
 * @param {BlogOptions} options
 * @returns {BlogConfig}
 */
export default function config (options) {
  /** @type {BlogConfig} */
  const conf = { ...baseConfig, data: [...baseConfig.data], output: [...baseConfig.output] }
  const templateEngine = typeof options.templateEngine === 'string'
    ? options.templateEngine
    : 'nunjucks'
  const templates = options.templates

  for (const file of ['post', 'index', 'feed']) {
    conf.data.push({
      id: file + 'Template',
      type: templateEngine + '-template',
      file: templates && typeof templates[file] === 'string'
        ? templates[file]
        : file + (file === 'feed' ? '.xml' : '.html')
    })
  }

  if (options.templateRoot) {
    conf.templateRoot = options.templateRoot
  }
  if (options.postRoot) {
    conf.data[0].postRoot = options.postRoot
  }
  if (options.postPath) {
    conf.data[0].path = options.postPath
  }
  if (options.feedOutput) {
    conf.output[0].output = options.feedOutput
  }
  if (options.archiveOutput) {
    conf.output[2].archiveFile = options.archiveOutput
  }
  if (options.indexOutput) {
    conf.output[2].indexFile = options.indexOutput
  }

  if (typeof options.outputRoot !== 'string') {
    throw new Error('Must provide an "outputRoot" parameter')
  }
  conf.outputRoot = options.outputRoot

  return conf
}
