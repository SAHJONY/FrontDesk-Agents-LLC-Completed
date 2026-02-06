import { publicProcedure, router } from "../_core/trpc";
import {
  getAllBlogPosts,
  getBlogPost,
  searchBlogPosts,
  getBlogPostsByTag,
  getAllBlogTags,
  getFeaturedBlogPosts,
  generateBlogSEOMetadata,
} from "../blog";
import { z } from "zod";

export const blogRouter = router({
  /**
   * Get all published blog posts
   */
  list: publicProcedure.query(async () => {
    const posts = await getAllBlogPosts();
    return posts.filter((post) => post.frontmatter.published !== false);
  }),

  /**
   * Get a single blog post by slug
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => {
      const post = getBlogPost(input.slug);
      if (!post) {
        throw new Error(`Blog post not found: ${input.slug}`);
      }
      return post;
    }),

  /**
   * Get SEO metadata for a blog post
   */
  getSEO: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => {
      const post = getBlogPost(input.slug);
      if (!post) {
        throw new Error(`Blog post not found: ${input.slug}`);
      }
      return generateBlogSEOMetadata(post);
    }),

  /**
   * Search blog posts by keyword
   */
  search: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input }) => {
      const results = await searchBlogPosts(input.query);
      return results.filter((post) => post.frontmatter.published !== false);
    }),

  /**
   * Get blog posts by tag
   */
  getByTag: publicProcedure
    .input(z.object({ tag: z.string() }))
    .query(async ({ input }) => {
      const posts = await getBlogPostsByTag(input.tag);
      return posts.filter((post) => post.frontmatter.published !== false);
    }),

  /**
   * Get all available tags
   */
  getTags: publicProcedure.query(async () => {
    return getAllBlogTags();
  }),

  /**
   * Get featured blog posts
   */
  getFeatured: publicProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ input }) => {
      return getFeaturedBlogPosts(input.limit);
    }),
});
