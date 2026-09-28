import { pageMetadata, renderPage } from "@/lib/page";

export const generateMetadata = () => pageMetadata("home");

export default function HomePage() {
  return renderPage("home");
}
