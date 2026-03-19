import { client } from "@/sanity/lib/client";
import {
  ALL_LIBRARY_ITEMS_QUERY,
  ALL_DOWNLOADS_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LibraryClient from "./LibraryClient";

export const metadata = {
  title: "Breastie Library",
  description:
    "Browse articles, free downloads, and wellness guides from Diary of a Breastie.",
};

export default async function LibraryPage() {
  const [articles, downloads, settings] = await Promise.all([
    client.fetch(ALL_LIBRARY_ITEMS_QUERY),
    client.fetch(ALL_DOWNLOADS_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ]);

  return (
    <>
      <Navbar />
      <LibraryClient
        articles={articles || []}
        downloads={downloads || []}
        substackUrl={settings?.substackUrl}
      />
      <Footer />
    </>
  );
}
