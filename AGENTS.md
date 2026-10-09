<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

# Accessibility is a standing requirement (ADA / WCAG 2.1 AA)

Kneaders has asked for confirmation that the site is ADA compliant. **Every new section and component must be built to WCAG 2.1 Level AA from the start** — it is part of "done", not a follow-up. This applies to humans and agents alike.

## Rules

- **Interactive elements use React Aria** (`react-aria-components` in `apps/web`): buttons, links, menus/nav toggles, dialogs/modals, tabs, accordions/disclosures, comboboxes/selects, form fields. Do not hand-roll `div`/`span` click targets or custom keyboard handling. `Button` and `SmartLink` in `src/components/ui/` already wrap React Aria; use them. Client-side navigation is wired through `Providers` (`RouterProvider`).
- React Aria is unstyled: carry the existing Tailwind classes over to the primitive. Never change the look of a component just to make it accessible; if a fix would force a visual change (e.g. a contrast failure), flag it in the PR description with the element and a suggested fix.
- **Landmarks and headings:** `header`, `nav` (labelled when there is more than one), `main`, `footer`. One `h1` per page; headings follow a logical order with no skipped levels (style with classes, not heading level).
- **Keyboard:** everything works with the keyboard alone, with a visible focus indicator (the global `:focus-visible` ring; never `outline-none` without a replacement). Keep the "Skip to main content" link (`SiteShell`) working.
- **Images:** meaningful `alt` text; decorative images, and images whose text is already adjacent, use `alt=""`. Decorative glyphs/icons get `aria-hidden`.
- **Color contrast:** at least 4.5:1 for normal text, 3:1 for large text (≥24px, or ≥18.66px bold) and for UI component boundaries and focus indicators. Check text on every brand-color background, including `opacity-*` text and placeholders.
- **Forms:** every field has a programmatic label (React Aria `TextField` + `Label`); required fields use `isRequired`; errors are rendered with `FieldError` so they are announced and linked via `aria-describedby`; status messages use a `role="status"` live region that is always mounted.
- **Dialogs, popovers, menus:** trap and restore focus, close with Escape (React Aria does this).
- **Motion:** respect `prefers-reduced-motion`. `motion` animations are covered by `MotionConfig reducedMotion="user"` in `Providers`; CSS animations need an `@media (prefers-reduced-motion: reduce)` override. Anything that moves automatically for more than 5 seconds must pause on hover and focus (ideally with a visible control).
- **Pages:** `<html lang>` is set; each page has a unique, descriptive `<title>` (via Next `metadata`).

## Checks

- `pnpm lint` runs `eslint-plugin-jsx-a11y` (config in `apps/web/eslint.config.mjs`). It must pass.
- Before opening a PR, tab through your change by keyboard and check it with a screen reader or the axe browser extension. Automated tools catch only part of WCAG.
