import type { Keyed, TeamGridSection } from "@kneaders/content";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { Intro } from "../ui/intro";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";

/** "Gary & Colleen Worthington" → "GC". */
const initials = (name: string) =>
  name
    .split(/\s|&/)
    .filter(Boolean)
    .map((w) => w[0])
    .filter((c) => /[A-Z]/.test(c))
    .slice(0, 2)
    .join("");

/** People (leadership, founders) — a 4:5 portrait, or their initials on a tan well when there's no photo. */
export function TeamGrid({ heading, members, surface }: Keyed<TeamGridSection> & { surface?: Surface }) {
  return (
    <Section block="teamGrid" surface={surface}>
      <Container>
        <Reveal className="mb-16">
          <Intro align="center" title={heading} />
        </Reveal>
        <ul className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3">
          {members?.map((m, i) => (
            <Reveal as="li" key={m._key} delay={i * 90} className="flex flex-col gap-4">
              {m.photo ? (
                <Photo media={m.photo} alt={m.photo.alt || m.name} ratio="4/5" />
              ) : (
                <div
                  aria-hidden
                  className="flex aspect-[4/5] items-center justify-center rounded-[4px] bg-linear-160 from-[#f1e8d8] to-[#e6d9c2]"
                >
                  <span className="font-display text-[64px] font-light italic text-[#b09a7e]">{initials(m.name)}</span>
                </div>
              )}
              <div className="mt-1 flex flex-col gap-1">
                <h3 className="type-h3">{m.name}</h3>
                <Eyebrow>{m.role}</Eyebrow>
              </div>
              <p className="type-small">{m.bio}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
