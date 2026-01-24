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
    constructor(root: string, config: BlorgConfig);
    root: string;
    config: BlorgConfig;
    /** @type {Record<string, any>} */
    data: Record<string, any>;
    /** @type {Record<string, string>} */
    resolvedDirectories: Record<string, string>;
    /** @type {Record<string, string>} */
    resolvedFiles: Record<string, string>;
    /**
     * Run the blog generator
     */
    run(): Promise<void>;
    processOutput(): Promise<void>;
    loadData(): Promise<void>;
    /**
     * Resolve and validate a directory path
     * @param {string} value
     * @returns {Promise<string>}
     */
    toDirectory(value: string): Promise<string>;
    /**
     * Resolve and validate a file path
     * @param {string} value
     * @returns {Promise<string>}
     */
    toFile(value: string): Promise<string>;
    /**
     * @param {string} value
     * @param {'dir'|'file'} type
     * @returns {Promise<string>}
     */
    _toPath(value: string, type: "dir" | "file"): Promise<string>;
    /**
     * @param {string} id
     * @returns {any}
     */
    getData(id: string): any;
    /**
     * @param {PluginConfig & BlorgConfig} pluginConfig
     * @param {boolean} saveOutput
     */
    loadPlugin(pluginConfig: PluginConfig & BlorgConfig, saveOutput: boolean): Promise<void>;
}
export namespace archetypes {
    export { blogArchetype as blog };
    export { presentationArchetype as presentation };
}
export type PluginConfig = {
    type: string;
    id: string;
    /**
     * - Data keys to load (for output plugins)
     */
    data?: string[] | undefined;
};
export type BlorgConfig = {
    templateRoot?: string | undefined;
    outputRoot?: string | undefined;
    /**
     * - Data source plugins
     */
    data: PluginConfig[];
    /**
     * - Output processor plugins
     */
    output: PluginConfig[];
};
import blogArchetype from './archetypes/blog.js';
import presentationArchetype from './archetypes/presentation.js';
export { blogArchetype, presentationArchetype };
//# sourceMappingURL=blorg.d.ts.map