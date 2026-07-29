export type BlogPost = {
    spec: Object;
    page: string;
};
export type IndexFilesConfig = {
    outputRoot: string;
    template: string;
    indexFile: string;
    archiveFile: string;
    postsPerPage?: number;
    data: {
        blogPosts: BlogPost[];
    };
};
/**
 * Render index and archive pages
 * @param {import('../blorg.js').default} blorg
 * @param {IndexFilesConfig} config
 */
export default function indexFiles(blorg: import('../blorg.js').default, config: IndexFilesConfig): Promise<void>;
//# sourceMappingURL=index-files.d.ts.map