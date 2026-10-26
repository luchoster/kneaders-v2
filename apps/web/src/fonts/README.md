# Brand fonts

The `.otf` / `.ttf` files are the licensed originals (kdrs Simple Style Guide). The site serves the
`.woff2` files next to them, generated with [fontTools](https://github.com/fonttools/fonttools)
(`pip install fonttools brotli`):

```sh
pyftsubset <Original>.otf --output-file=<Original>.woff2 --flavor=woff2 \
  --unicodes='*' --name-IDs='*' --notdef-outline --recommended-glyphs --glyph-names
```

`--unicodes='*'` keeps every character the original covers; only OpenType alternates the site never
requests (small caps, stylistic sets, old-style figures, …) are dropped, which is most of the size
savings for Archer Pro. Kerning and ligatures are kept. Only the weights `fonts.ts` declares are
converted — every declared file is preloaded on every page, so add weights deliberately.
