import { serverClient } from "@/sanity/lib/client";
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

export const revalidate = 60;

export default async function LibraryPage() {
  const [articles, downloads, settings] = await Promise.all([
    serverClient.fetch(ALL_LIBRARY_ITEMS_QUERY),
    serverClient.fetch(ALL_DOWNLOADS_QUERY),
    serverClient.fetch(SITE_SETTINGS_QUERY),
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
