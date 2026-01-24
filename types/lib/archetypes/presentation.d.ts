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
export type PresentationOptions = {
    /**
     * - Mapping of keys to markdown files
     */
    files: Record<string, string>;
    templateEngine?: string | undefined;
    template?: string | undefined;
    output?: string | undefined;
    splitter?: string | undefined;
    outputRoot?: string | undefined;
};
export type PresentationDataConfig = {
    id: string;
    type: string;
    files?: Record<string, string> | undefined;
    file?: string | undefined;
    splitter?: string | undefined;
};
export type PresentationOutputConfig = {
    id: string;
    type: string;
    output?: string | undefined;
    template?: string | undefined;
    data?: string[] | undefined;
};
export type PresentationConfig = {
    templateRoot: string;
    outputRoot: string;
    data: PresentationDataConfig[];
    output: PresentationOutputConfig[];
};
//# sourceMappingURL=presentation.d.ts.map