/**
 * Blog utilities for MDX content management
 * Handles parsing, caching, and metadata extraction
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogFrontmatter {
  title: string;
  description: string;
  author?: string;
  date: string;
  tags?: string[];
  image?: string;
  slug: string;
  published?: boolean;
  seoKeywords?: string[];
  readingTime?: number;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  excerpt: string;
}

const BLOG_DIR = path.join(process.cwd(), "client/src/content/blog");

/**
 * Get all blog posts with metadata
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "");
    return getBlogPost(slug);
  });

  // Filter out null values and sort by date
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const frontmatter = data as Partial<BlogFrontmatter>;

  // Calculate reading time (roughly 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Extract excerpt (first 160 characters)
  const excerpt = content.substring(0, 160).trim() + "...";

  return {
    slug,
    frontmatter: {
      title: frontmatter.title || "Untitled",
      description: frontmatter.description || excerpt,
      author: frontmatter.author || "FrontDesk AI",
      date: frontmatter.date || new Date().toISOString(),
      tags: frontmatter.tags || [],
      image: frontmatter.image,
      slug,
      published: frontmatter.published !== false,
      seoKeywords: frontmatter.seoKeywords || [],
      readingTime,
    },
    content,
    excerpt,
  };
}

/**
 * Search blog posts by keyword
 */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  const lowerQuery = query.toLowerCase();

  return posts.filter((post) => {
    const searchableText = [
      post.frontmatter.title,
      post.frontmatter.description,
      post.frontmatter.tags?.join(" "),
      post.content,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.frontmatter.tags && post.frontmatter.tags.includes(tag));
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllBlogTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach((tag) => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}

/**
 * Get featured blog posts (marked with featured tag)
 */
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.frontmatter.tags && post.frontmatter.tags.includes("featured")).slice(0, limit);
}

/**
 * Generate SEO metadata for a blog post
 */
export function generateBlogSEOMetadata(post: BlogPost) {
  return {
    title: `${post.frontmatter.title} | FrontDesk Agents`,
    description: post.frontmatter.description,
    keywords: [
      ...(post.frontmatter.seoKeywords || []),
      ...(post.frontmatter.tags || []),
      "AI receptionist",
      "phone agents",
    ].join(", "),
    author: post.frontmatter.author,
    image: post.frontmatter.image,
    url: `/blog/${post.slug}`,
    publishedDate: post.frontmatter.date,
    type: "article",
  };
}
