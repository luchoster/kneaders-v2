import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN || undefined,
  perspective: "published",
});
