import "server-only";
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

/** Server-only client with write access, used to store form submissions. */
export const writeToken = process.env.SANITY_API_WRITE_TOKEN ?? "";

export const writeClient = createClient({
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken || undefined,
  perspective: "published",
});
