import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  typegen: {
    path: "../web/src/**/*.{ts,tsx}",
    generates: "../web/sanity.types.ts",
  },
});
