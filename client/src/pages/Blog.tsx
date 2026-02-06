import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Calendar, User, Tag } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch all blog posts
  const { data: allPosts, isLoading: postsLoading } = trpc.blog.list.useQuery();

  // Fetch all available tags
  const { data: tags, isLoading: tagsLoading } = trpc.blog.getTags.useQuery();

  // Fetch search results if query exists
  const { data: searchResults } = trpc.blog.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 0 }
  );

  // Fetch posts by tag if tag is selected
  const { data: taggedPosts } = trpc.blog.getByTag.useQuery(
    { tag: selectedTag || "" },
    { enabled: selectedTag !== null }
  );

  // Determine which posts to display
  const displayPosts = searchQuery
    ? searchResults
    : selectedTag
      ? taggedPosts
      : allPosts;

  const isLoading = postsLoading || tagsLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">FrontDesk Blog</h1>
          <p className="text-lg opacity-90">
            Insights on AI receptionists, automation, and business efficiency
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedTag(null);
              }}
              className="pl-10 py-6 text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {/* Tags Filter */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-bold mb-4 text-foreground">Filter by Tag</h3>

                {tagsLoading ? (
                  <div className="flex justify-center">
                    <Loader2 className="animate-spin text-muted-foreground" size={20} />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant={selectedTag === null ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedTag(null);
                        setSearchQuery("");
                      }}
                    >
                      All Posts
                    </Button>
                    {tags?.map((tag) => (
                      <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => {
                          setSelectedTag(tag);
                          setSearchQuery("");
                        }}
                      >
                        <Tag size={16} className="mr-2" />
                        {tag}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : displayPosts && displayPosts.length > 0 ? (
              <div className="space-y-6">
                {displayPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <a className="block">
                      <article className="bg-card rounded-lg border border-border p-6 hover:border-primary transition-colors cursor-pointer">
                        {/* Post Header */}
                        <div className="mb-4">
                          <h2 className="text-2xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                            {post.frontmatter.title}
                          </h2>
                          <p className="text-muted-foreground">{post.frontmatter.description}</p>
                        </div>

                        {/* Post Meta */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={16} />
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
                                className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </article>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchQuery
                    ? "No posts found matching your search."
                    : "No blog posts available yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
