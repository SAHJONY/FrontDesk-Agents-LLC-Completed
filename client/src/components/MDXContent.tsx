import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

// Define custom MDX components for interactive elements
const mdxComponents = {
  // Heading components with proper styling
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mt-6 mb-3 text-foreground">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold mt-5 mb-2 text-foreground">{children}</h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-xl font-bold mt-4 mb-2 text-foreground">{children}</h4>
  ),

  // Paragraph with proper spacing
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-base leading-relaxed mb-4 text-foreground">{children}</p>
  ),

  // List components
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="ml-4">{children}</li>
  ),

  // Code blocks
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">
          {children}
        </code>
      );
    }
    return (
      <code className={className || "bg-muted p-4 rounded block overflow-x-auto text-sm"}>
        {children}
      </code>
    );
  },

  // Block quote
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground bg-muted/30 rounded">
      {children}
    </blockquote>
  ),

  // Links
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-primary hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),

  // Images
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img
      src={src}
      alt={alt}
      className="max-w-full h-auto rounded-lg my-6 shadow-md"
    />
  ),

  // Table
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border">{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-border bg-muted px-4 py-2 text-left font-bold">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-border px-4 py-2">{children}</td>
  ),

  // Horizontal rule
  hr: () => <hr className="my-8 border-border" />,

  // Strong and emphasis
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
};

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

/**
 * MDX Content Renderer
 * Supports interactive React components embedded in MDX files
 */
export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-sm sm:prose-base max-w-none">
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}

export default MDXContent;
