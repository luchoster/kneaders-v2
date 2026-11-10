import type { JournalStripSection, Keyed } from "@kneaders/content";
import { Container } from "../ui/container";
import { Headline } from "../ui/headline";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { TextLink } from "../ui/text-link";
import { PostCard } from "./post-grid";

/** Latest journal posts: heading and "all stories" link over three photo cards. */
export function JournalStrip({
  headline,
  cta,
  limit = 3,
  posts = [],
  surface,
}: Keyed<JournalStripSection> & { surface?: Surface }) {
  if (!posts?.length) return null;
  return (
    <Section block="journalStrip" surface={surface}>
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <h2 className="type-h2 max-w-[620px]">
            <Headline headline={headline} />
          </h2>
          {cta && <TextLink href={cta.href}>{cta.label}</TextLink>}
        </div>
        <ul className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3">
          {posts.slice(0, limit).map((p, i) => (
            <Reveal as="li" key={p._id} delay={i * 90}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
