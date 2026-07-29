export type MultiPageConfig = {
    /**
     * - Map of keys to file paths
     */
    files: Record<string, string>;
    splitter?: RegExp;
};
/**
 * Load and convert multiple markdown files, splitting into pages
 * @param {import('../blorg.js').default} blorg
 * @param {MultiPageConfig} config
 * @returns {Promise<Record<string, string[]>>}
 */
export default function multiPageMarkdown(blorg: import('../blorg.js').default, config: MultiPageConfig): Promise<Record<string, string[]>>;
//# sourceMappingURL=multi-page-markdown.d.ts.map