import renderTemplate from '../render-template.js'

/**
 * Render a single output file from a template
 * @param {import('../blorg.js').default} blorg
 * @param {Object} config
 * @param {string} config.outputRoot
 * @param {string} config.template
 * @param {string} config.output
 * @param {Object} config.data
 */
export default async function singleFile (blorg, config) {
  if (typeof config.outputRoot !== 'string') {
    throw new Error('Must supply an "outputRoot" value for single-file')
  }
  if (typeof config.template !== 'string') {
    throw new Error('Must supply a "template" value for single-file')
  }
  if (typeof config.output !== 'string') {
    throw new Error('Must supply an "output" value for single-file')
  }

  await renderTemplate(blorg, config.template, config.data, config.outputRoot, config.output)
}
