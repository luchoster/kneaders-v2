import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="bg-k-cream py-24">
        <Container className="flex flex-col items-start gap-6">
          <span className="font-condensed text-sm font-semibold italic uppercase tracking-[0.2em] text-k-rust">404</span>
          <h1 className="font-headline text-[clamp(48px,6.6vw,108px)] uppercase leading-[0.92] tracking-[0.01em]">
            <span className="text-k-red">Out of the oven</span> <span className="text-k-black">already.</span>
          </h1>
          <p className="max-w-[520px] font-body text-lg text-k-maroon">That page sold out. Try the menu instead.</p>
          <Button href="/menu" tone="black" ink="tan" arrow>
            See the menu
          </Button>
        </Container>
      </section>
    </SiteShell>
  );
}
