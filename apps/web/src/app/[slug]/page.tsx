import { pageMetadata, renderPage } from "@/lib/page";
import { getPageSlugs } from "@/lib/sanity/fetch";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPageSlugs()).filter((slug) => slug !== "journal").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  return pageMetadata((await params).slug);
}

export default async function Page({ params }: Props) {
  return renderPage((await params).slug);
}
