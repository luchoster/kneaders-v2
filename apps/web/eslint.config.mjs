import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

// Accessibility is a standing requirement (WCAG 2.1 AA) — see AGENTS.md.
// The plugin is told about our React Aria wrappers so it lints them like their DOM equivalents.
export default tseslint.config(
  { ignores: [".next/**", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    ...jsxA11y.flatConfigs.recommended,
    settings: {
      "jsx-a11y": {
        components: {
          Button: "button",
          Link: "a",
          SmartLink: "a",
          Input: "input",
          TextArea: "textarea",
          Label: "label",
        },
      },
    },
  },
);
