/**
 * @typedef {Object} PostSpec
 * @property {string} title
 * @property {Date} date
 * @property {string} path
 */
/**
 * Extract just the spec (metadata) from blog posts
 * @param {import('../blorg.js').default} blorg
 * @param {Object} config
 * @param {string} config.blogData
 * @returns {Promise<PostSpec[]>}
 */
export default function postSpecs(blorg: import("../blorg.js").default, config: {
    blogData: string;
}): Promise<PostSpec[]>;
export type PostSpec = {
    title: string;
    date: Date;
    path: string;
};
//# sourceMappingURL=post-specs.d.ts.map