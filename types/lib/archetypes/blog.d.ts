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
export default function config(options: BlogOptions): BlogConfig;
export type BlogOptions = {
    outputRoot: string;
    templateEngine?: string | undefined;
    templateRoot?: string | undefined;
    postRoot?: string | undefined;
    postPath?: string | undefined;
    feedOutput?: string | undefined;
    archiveOutput?: string | undefined;
    indexOutput?: string | undefined;
    templates?: Record<string, string> | undefined;
};
export type BlogDataConfig = {
    id: string;
    type: string;
    postRoot?: string | undefined;
    path?: string | undefined;
    blogData?: string | undefined;
    file?: string | undefined;
};
export type BlogOutputConfig = {
    id: string;
    type: string;
    output?: string | undefined;
    template?: string | undefined;
    data?: string[] | undefined;
    postsPerPage?: number | undefined;
    indexFile?: string | undefined;
    archiveFile?: string | undefined;
};
export type BlogConfig = {
    templateRoot: string;
    outputRoot?: string | undefined;
    data: BlogDataConfig[];
    output: BlogOutputConfig[];
};
//# sourceMappingURL=blog.d.ts.map