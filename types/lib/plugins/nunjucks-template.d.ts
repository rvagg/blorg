/**
 * Load and compile a Nunjucks template
 * @param {import('../blorg.js').default} blorg
 * @param {Object} config
 * @param {string} config.templateRoot
 * @param {string} config.file
 * @returns {Promise<Function>}
 */
export default function nunjucksTemplate(blorg: import("../blorg.js").default, config: {
    templateRoot: string;
    file: string;
}): Promise<Function>;
//# sourceMappingURL=nunjucks-template.d.ts.map