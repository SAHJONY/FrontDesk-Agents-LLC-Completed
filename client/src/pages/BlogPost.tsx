import { trpc } from "@/lib/trpc";
import { useRoute, Link } from "wouter";
import { Loader2, Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDXContent } from "@/components/MDXContent";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug as string;

  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [mdxLoading, setMdxLoading] = useState(true);

  // Fetch blog post
  const { data: post, isLoading: postLoading } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Serialize MDX content
  useEffect(() => {
    if (post?.content) {
      serialize(post.content).then((source) => {
        setMdxSource(source);
        setMdxLoading(false);
      });
    }
  }, [post?.content]);

  if (postLoading || mdxLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
              <ArrowLeft size={20} />
              Back to Blog
            </a>
          </Link>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>Return to Blog</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="bg-muted/50 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft size={20} />
              Back to Blog
            </a>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {post.frontmatter.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {post.frontmatter.description}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              {post.frontmatter.author}
            </div>
            {post.frontmatter.readingTime && (
              <div>{post.frontmatter.readingTime} min read</div>
            )}
          </div>

          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                >
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {post.frontmatter.image && (
          <img
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            className="w-full h-auto rounded-lg shadow-lg mb-12"
          />
        )}

        {mdxSource && <MDXContent source={mdxSource} />}
      </div>

      {/* Related Posts Section */}
      <div className="bg-muted/30 border-t border-border py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for related posts - can be enhanced with actual related posts */}
            <Link href="/blog">
              <a className="block p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                <h3 className="font-bold text-foreground mb-2">More Blog Posts</h3>
                <p className="text-muted-foreground text-sm">
                  Explore more articles on AI receptionists and automation.
                </p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
