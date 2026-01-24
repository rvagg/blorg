/**
 * @typedef {Object} PresentationDataConfig
 * @property {string} id
 * @property {string} type
 * @property {Record<string, string>} [files]
 * @property {string} [file]
 * @property {string} [splitter]
 */

/**
 * @typedef {Object} PresentationOutputConfig
 * @property {string} id
 * @property {string} type
 * @property {string} [output]
 * @property {string} [template]
 * @property {string[]} [data]
 */

/**
 * @typedef {Object} PresentationConfig
 * @property {string} templateRoot
 * @property {string} outputRoot
 * @property {PresentationDataConfig[]} data
 * @property {PresentationOutputConfig[]} output
 */

/** @type {PresentationConfig} */
const baseConfig = {
  templateRoot: './',
  outputRoot: './',

  data: [
    {
      // This plugin loads and provides all markdown files in a directory by using the 'ssbl' package
      id: 'slides',
      type: 'multi-page-markdown'
    }
  ],

  output: [
    {
      // This output plugin takes a template, a bunch of data and merges to a single file
      id: 'presentation',
      type: 'single-file',
      output: 'index.html',
      template: 'presentationTemplate',
      data: ['slides']
    }
  ]
}

/**
 * @typedef {Object} PresentationOptions
 * @property {Record<string, string>} files - Mapping of keys to markdown files
 * @property {string} [templateEngine]
 * @property {string} [template]
 * @property {string} [output]
 * @property {string} [splitter]
 * @property {string} [outputRoot]
 */

/**
 * Create a presentation configuration
 * @param {PresentationOptions} options
 * @returns {PresentationConfig}
 */
export default function config (options) {
  /** @type {PresentationConfig} */
  const conf = { ...baseConfig, data: [...baseConfig.data], output: [...baseConfig.output] }
  const templateEngine = typeof options.templateEngine === 'string'
    ? options.templateEngine
    : 'nunjucks'

  if (typeof options.files !== 'object') {
    throw new Error('Must provide a "files" parameter mapping keys to markdown files')
  }

  conf.data[0].files = options.files
  conf.data.push({
    id: 'presentationTemplate',
    type: templateEngine + '-template',
    file: typeof options.template === 'string'
      ? options.template
      : 'template.html'
  })

  if (typeof options.output === 'string') {
    conf.output[0].output = options.output
  }
  if (typeof options.splitter === 'string') {
    conf.data[0].splitter = options.splitter
  }
  if (typeof options.outputRoot === 'string') {
    conf.outputRoot = options.outputRoot
  }

  return conf
}
