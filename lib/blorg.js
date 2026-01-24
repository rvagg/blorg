import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * @typedef {Object} PluginConfig
 * @property {string} type
 * @property {string} id
 * @property {string[]} [data] - Data keys to load (for output plugins)
 */

/**
 * @typedef {Object} BlorgConfig
 * @property {string} [templateRoot]
 * @property {string} [outputRoot]
 * @property {PluginConfig[]} data - Data source plugins
 * @property {PluginConfig[]} output - Output processor plugins
 */

export default class Blorg {
  /**
   * @param {string} root
   * @param {BlorgConfig} config
   */
  constructor (root, config) {
    this.root = root
    this.config = config
    /** @type {Record<string, any>} */
    this.data = { date: new Date() }
    /** @type {Record<string, string>} */
    this.resolvedDirectories = {}
    /** @type {Record<string, string>} */
    this.resolvedFiles = {}
  }

  /**
   * Run the blog generator
   */
  async run () {
    await this.loadData()
    await this.processOutput()
  }

  async processOutput () {
    if (!Array.isArray(this.config.output)) {
      throw new Error('You must supply a list of "output" processors in your config')
    }

    await Promise.all(this.config.output.map(async (output) => {
      /** @type {Record<string, any>} */
      const data = {}
      for (const key of (output.data || [])) {
        data[key] = this.data[key]
        if (!data[key]) {
          throw new Error(`Output "${output.id}" requires unknown data "${key}"`)
        }
      }
      const pluginConfig = /** @type {any} */ ({ ...this.config, ...output, data })
      await this.loadPlugin(pluginConfig, false)
    }))
  }

  async loadData () {
    if (!Array.isArray(this.config.data)) {
      throw new Error('You must supply a list of "data" sources in your config')
    }

    // Load data sources sequentially (order may matter)
    for (const dataConfig of this.config.data) {
      const pluginConfig = /** @type {any} */ ({ ...this.config, ...dataConfig })
      await this.loadPlugin(pluginConfig, true)
    }
  }

  /**
   * Resolve and validate a directory path
   * @param {string} value
   * @returns {Promise<string>}
   */
  async toDirectory (value) {
    return this._toPath(value, 'dir')
  }

  /**
   * Resolve and validate a file path
   * @param {string} value
   * @returns {Promise<string>}
   */
  async toFile (value) {
    return this._toPath(value, 'file')
  }

  /**
   * @param {string} value
   * @param {'dir'|'file'} type
   * @returns {Promise<string>}
   */
  async _toPath (value, type) {
    const uri = resolve(this.root, value)
    const cache = type === 'dir' ? this.resolvedDirectories : this.resolvedFiles

    if (cache[value]) {
      return cache[value]
    }

    const fileStat = await stat(uri)
    if (type === 'dir' && !fileStat.isDirectory()) {
      throw new Error(`Config property "${value}" is not a directory: ${uri}`)
    } else if (type === 'file' && !fileStat.isFile()) {
      throw new Error(`Config property "${value}" is not a file: ${uri}`)
    }

    cache[value] = uri
    return uri
  }

  /**
   * @param {string} id
   * @returns {any}
   */
  getData (id) {
    return this.data[id]
  }

  /**
   * @param {PluginConfig & BlorgConfig} pluginConfig
   * @param {boolean} saveOutput
   */
  async loadPlugin (pluginConfig, saveOutput) {
    if (typeof pluginConfig.type !== 'string') {
      throw new Error('Plugin must have a "type" string')
    }
    if (typeof pluginConfig.id !== 'string') {
      throw new Error('Plugin must have an "id" string')
    }

    let plugin

    // Try external plugin first
    try {
      plugin = await import('blorg-' + pluginConfig.type)
      plugin = plugin.default || plugin
    } catch {}

    // Fall back to built-in plugin
    if (!plugin) {
      try {
        plugin = await import('./plugins/' + pluginConfig.type + '.js')
        plugin = plugin.default || plugin
      } catch {}
    }

    if (!plugin) {
      throw new Error(`Could not load plugin type "${pluginConfig.type}"`)
    }

    const result = await plugin(this, pluginConfig)

    if (saveOutput) {
      this.data[pluginConfig.id] = result
    }
  }
}

// Re-export archetypes
import blogArchetype from './archetypes/blog.js'
import presentationArchetype from './archetypes/presentation.js'

export { blogArchetype, presentationArchetype }

// Convenience object matching old API pattern
export const archetypes = {
  blog: blogArchetype,
  presentation: presentationArchetype
}
