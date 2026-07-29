/**
 * @typedef {Object} PresentationDataConfig
 * @property {string} id
 * @property {string} type
 * @property {Record<string, string>} [files]
 * @property {string} [file]
 * @property {string} [splitter]
 */
export type PresentationDataConfig = {
    id: string;
    type: string;
    files?: Record<string, string>;
    file?: string;
    splitter?: string;
};
export type PresentationOutputConfig = {
    id: string;
    type: string;
    output?: string;
    template?: string;
    data?: string[];
};
export type PresentationConfig = {
    templateRoot: string;
    outputRoot: string;
    data: PresentationDataConfig[];
    output: PresentationOutputConfig[];
};
export type PresentationOptions = {
    /**
     * - Mapping of keys to markdown files
     */
    files: Record<string, string>;
    templateEngine?: string;
    template?: string;
    output?: string;
    splitter?: string;
    outputRoot?: string;
};
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
export default function config(options: PresentationOptions): PresentationConfig;
//# sourceMappingURL=presentation.d.ts.map