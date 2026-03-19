import Link from "next/link";
import styles from "./Footer.module.css";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export default async function Footer() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.footerLogo}>
        Diary of <span>A Breastie</span>
      </Link>
      <div className={styles.footerLinks}>
        <Link href="/listen">Podcast</Link>
        <Link href="/newsletter">Newsletter</Link>
        <a href={settings?.instagramUrl || "#"} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href={settings?.tiktokUrl || "#"} target="_blank" rel="noopener noreferrer">
          TikTok
        </a>
      </div>
      <div>&copy; 2026 Diary of a Breastie</div>
    </footer>
  );
}
