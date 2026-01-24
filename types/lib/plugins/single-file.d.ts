/**
 * Render a single output file from a template
 * @param {import('../blorg.js').default} blorg
 * @param {Object} config
 * @param {string} config.outputRoot
 * @param {string} config.template
 * @param {string} config.output
 * @param {Object} config.data
 */
export default function singleFile(blorg: import("../blorg.js").default, config: {
    outputRoot: string;
    template: string;
    output: string;
    data: Object;
}): Promise<void>;
//# sourceMappingURL=single-file.d.ts.map