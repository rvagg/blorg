export type PostSpec = {
    title: string;
    date: Date;
    base?: string;
    path?: string;
};
export type BlogPost = {
    spec: PostSpec;
    page: string;
};
export type MarkdownPostsConfig = {
    postRoot: string;
    path?: string;
};
/**
 * Load markdown blog posts from a directory
 * @param {import('../blorg.js').default} blorg
 * @param {MarkdownPostsConfig} config
 * @returns {Promise<BlogPost[]>}
 */
export default function markdownPosts(blorg: import('../blorg.js').default, config: MarkdownPostsConfig): Promise<BlogPost[]>;
//# sourceMappingURL=markdown-posts.d.ts.map