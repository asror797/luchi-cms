import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// CDN client for client-side usage
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Server client — no CDN cache, always fresh data
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
