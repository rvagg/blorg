/**
 * @typedef {Object} BlogPost
 * @property {Object} spec
 * @property {string} spec.path
 * @property {string} page
 */
/**
 * @typedef {Object} PostFilesData
 * @property {BlogPost[]} blogPosts
 */
/**
 * Render individual post files
 * @param {import('../blorg.js').default} blorg
 * @param {Object} config
 * @param {string} config.outputRoot
 * @param {string} config.template
 * @param {PostFilesData} config.data
 */
export default function postFiles(blorg: import("../blorg.js").default, config: {
    outputRoot: string;
    template: string;
    data: PostFilesData;
}): Promise<void>;
export type BlogPost = {
    spec: {
        path: string;
    };
    page: string;
};
export type PostFilesData = {
    blogPosts: BlogPost[];
};
//# sourceMappingURL=post-files.d.ts.map