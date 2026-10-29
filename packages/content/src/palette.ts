/**
 * Full kdrs Simple Style Guide palette. Only the menu uses all of it (product
 * color-coding); everything else renders through the four-color `brandPalette`.
 * Change a hex here → update globals.css @theme.
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

/**
 * The site's four colors: black, brown, green, and cream (tan is cream's deeper
 * shade, used for alternating section grounds). Green is a deeper shade of
 * PMS 7496C so normal-size text on it passes WCAG AA (5.7:1 with cream).
 */
export const brandPalette = {
  black: palette.black,
  brown: palette.brown,
  green: "#5E6A2C",
  cream: palette.cream,
  tan: palette.tan,
} as const;

export type BrandTone = keyof typeof brandPalette;

/** Folds any stored style-guide tone into the four-color brand set. */
const BRAND_TONE: Record<Tone, BrandTone> = {
  black: "black",
  maroon: "black",
  brown: "brown",
  red: "brown",
  rust: "brown",
  gold: "brown",
  goldDeep: "brown",
  sage: "green",
  blue: "green",
  cream: "cream",
  tan: "tan",
  tanDeep: "tan",
  sageLight: "tan",
  blueLight: "tan",
  gray: "tan",
};

export const brandTone = (tone: Tone | undefined, fallback: Tone = "brown"): BrandTone =>
  BRAND_TONE[tone ?? fallback] ?? BRAND_TONE[fallback];

export const brandHex = (tone: Tone | undefined, fallback: Tone = "brown") => brandPalette[brandTone(tone, fallback)];

/** Studio picker for everything except menu categories. Stores the style-guide keys. */
export const brandToneOptions: { title: string; value: Tone }[] = [
  { title: "Black", value: "black" },
  { title: "Brown", value: "brown" },
  { title: "Green", value: "sage" },
  { title: "Cream", value: "cream" },
  { title: "Tan (deeper cream)", value: "tan" },
];

/** Full style-guide picker — menu category colors only. */
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

export const categoryTone = (slug: string | undefined): Tone =>
  (slug && categoryTones[slug]) || "brown";

export const journalTagTone = (tag: string | undefined): Tone =>
  (tag && journalTagTones[tag]) || "brown";
