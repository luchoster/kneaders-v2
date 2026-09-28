import { pageMetadata, renderPage } from "@/lib/page";

export const generateMetadata = () => pageMetadata("journal");

export default function JournalPage() {
  return renderPage("journal");
}
