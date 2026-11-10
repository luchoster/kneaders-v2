import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <SiteShell>
      <Section block="notFound">
        <Container narrow className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>404</Eyebrow>
          <h1 className="type-h1">
            Out of the oven <em>already.</em>
          </h1>
          <p className="type-lede max-w-[520px]">That page sold out. Try the menu instead.</p>
          <Button href="/menu" className="mt-2">
            See the menu
          </Button>
        </Container>
      </Section>
    </SiteShell>
  );
}
