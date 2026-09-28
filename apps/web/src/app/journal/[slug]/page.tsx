import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/article/article";
import { SiteShell } from "@/components/layout/site-shell";
import { getPost, getPostSlugs } from "@/lib/sanity/fetch";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return (
    <SiteShell active="journal">
      <Article post={post} />
    </SiteShell>
  );
}
