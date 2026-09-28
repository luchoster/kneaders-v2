/**
 * Kneaders brand palette — kdrs Simple Style Guide.
 * Single source of truth for the web app (Tailwind theme mirrors these hexes)
 * and for the Studio's "tone" pickers. Change a hex here → update globals.css @theme.
 */
export const palette = {
  black: "#231F20", // PMS Black C — primary
  tan: "#EFE1C5", // PMS 7501C 50% — primary
  tanDeep: "#D9C79E", // PMS 7501C
  cream: "#FDFBF7", // page ground ("on light/white")
  gold: "#C7812A", // PMS 138C
  goldDeep: "#AB6D26", // PMS 139C
  rust: "#A4541C", // PMS 160C
  brown: "#803B24", // PMS 1685C
  red: "#801B21", // PMS 491C
  maroon: "#56252A", // PMS 490C
  sage: "#74813B", // PMS 7496C
  sageLight: "#AFBD90", // PMS 7493C
  blue: "#4B8496", // PMS 7459C
  blueLight: "#B7CBDA", // PMS 643C
  gray: "#B8BBBD", // PMS Cool Gray 4
} as const;

export type Tone = keyof typeof palette;

export const toneOptions: { title: string; value: Tone }[] = [
  { title: "Black (Black C)", value: "black" },
  { title: "Tan (7501C 50%)", value: "tan" },
  { title: "Deep tan (7501C)", value: "tanDeep" },
  { title: "Cream (page ground)", value: "cream" },
  { title: "Harvest gold (138C)", value: "gold" },
  { title: "Deep gold (139C)", value: "goldDeep" },
  { title: "Rust (160C)", value: "rust" },
  { title: "Brown (1685C)", value: "brown" },
  { title: "Brick red (491C)", value: "red" },
  { title: "Maroon (490C)", value: "maroon" },
  { title: "Sage (7496C)", value: "sage" },
  { title: "Light sage (7493C)", value: "sageLight" },
  { title: "Lake blue (7459C)", value: "blue" },
  { title: "Light blue (643C)", value: "blueLight" },
  { title: "Cool gray (CG4)", value: "gray" },
];

/** Product color-coding per the style guide (font-treatment page). Values are palette keys. */
export const categoryTones: Record<string, Tone> = {
  sandwiches: "gold",
  breakfast: "gold", // sandwiches + breakfast = 138C
  salads: "sage",
  soups: "sage", // salads + soups & sides = 7496C
  breads: "red",
  pastries: "red", // breads & pastries = 491C
  beverages: "blue",
  smoothies: "blue",
  coffee: "blue", // beverages & smoothies = 7459C
  kids: "rust", // combos & kids = 160C
  catering: "brown",
};

/** Journal tag color-coding. */
export const journalTagTones: Record<string, Tone> = {
  Story: "gold",
  Recipe: "sage",
  Field: "blue",
  "How-to": "rust",
};

export const journalTags = Object.keys(journalTagTones);

export const toneHex = (tone: Tone | undefined, fallback: Tone = "brown") =>
  palette[tone ?? fallback] ?? palette[fallback];

export const categoryTone = (slug: string | undefined): Tone =>
  (slug && categoryTones[slug]) || "brown";

export const journalTagTone = (tag: string | undefined): Tone =>
  (tag && journalTagTones[tag]) || "brown";
