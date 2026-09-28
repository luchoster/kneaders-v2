import type { Keyed, Media, PortableTextBlock, Ticket, TicketStep } from "../types";

/** Attach stable `_key`s (Sanity array-item keys) derived from a prefix + index. */
export function keyed<T extends object>(prefix: string, items: T[]): Keyed<T>[] {
  return items.map((item, i) => ({ _key: `${prefix}-${i}`, ...item }));
}

const UNSPLASH = "https://images.unsplash.com/";

/** External (Unsplash) image — swap for an uploaded asset in the Studio. */
export function unsplash(id: string, width: number, alt = ""): Media {
  return {
    _type: "media",
    externalUrl: `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=80`,
    alt,
  };
}

export function ticket(
  prefix: string,
  t: Omit<Ticket, "steps" | "_type"> & { steps: [string, string, string?][] },
): Ticket {
  return {
    _type: "ticket",
    ...t,
    steps: keyed<TicketStep>(
      `${prefix}-step`,
      t.steps.map(([marker, title, body]) => ({ marker, title, body })),
    ),
  };
}

type Style = PortableTextBlock["style"];

/** Tiny Portable Text builder: [style, text] tuples → blocks. */
export function portableText(prefix: string, rows: [Style, string][]): PortableTextBlock[] {
  return rows.map(([style, text], i) => ({
    _type: "block",
    _key: `${prefix}-${i}`,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${prefix}-${i}-s`, text, marks: [] }],
  }));
}
