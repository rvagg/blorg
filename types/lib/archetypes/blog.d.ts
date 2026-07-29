/**
 * @typedef {Object} BlogDataConfig
 * @property {string} id
 * @property {string} type
 * @property {string} [postRoot]
 * @property {string} [path]
 * @property {string} [blogData]
 * @property {string} [file]
 */
export type BlogDataConfig = {
    id: string;
    type: string;
    postRoot?: string;
    path?: string;
    blogData?: string;
    file?: string;
};
export type BlogOutputConfig = {
    id: string;
    type: string;
    output?: string;
    template?: string;
    data?: string[];
    postsPerPage?: number;
    indexFile?: string;
    archiveFile?: string;
};
export type BlogConfig = {
    templateRoot: string;
    outputRoot?: string;
    data: BlogDataConfig[];
    output: BlogOutputConfig[];
};
export type BlogOptions = {
    outputRoot: string;
    templateEngine?: string;
    templateRoot?: string;
    postRoot?: string;
    postPath?: string;
    feedOutput?: string;
    archiveOutput?: string;
    indexOutput?: string;
    templates?: Record<string, string>;
};
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
//# sourceMappingURL=blog.d.ts.map