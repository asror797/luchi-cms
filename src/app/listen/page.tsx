import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { serverClient } from "@/sanity/lib/client";
import {
  SITE_SETTINGS_QUERY,
  STARTER_EPISODES_QUERY,
  ALL_EPISODES_QUERY,
} from "@/sanity/lib/queries";

export const metadata = {
  title: "Listen",
  description:
    "Listen to the Diary of a Breastie podcast — real conversations with breast cancer survivors, doctors, and wellness experts. Available on Spotify, YouTube, and Amazon Music.",
};

interface Episode {
  _id: string;
  episodeNumber: number;
  title: string;
  description?: string;
  duration?: string;
  starterTag?: string;
  isStarterEpisode?: boolean;
  spotifyUrl?: string;
  youtubeUrl?: string;
  amazonMusicUrl?: string;
}

interface SiteSettings {
  spotifyUrl?: string;
  youtubeUrl?: string;
  amazonMusicUrl?: string;
}

export const revalidate = 60;

export default async function ListenPage() {
  const [settings, starters, allEpisodes]: [SiteSettings, Episode[], Episode[]] =
    await Promise.all([
      serverClient.fetch(SITE_SETTINGS_QUERY),
      serverClient.fetch(STARTER_EPISODES_QUERY),
      serverClient.fetch(ALL_EPISODES_QUERY),
    ]);

  const recentEpisodes = allEpisodes
    .filter((ep) => !ep.isStarterEpisode)
    .slice(0, 5);

  return (
    <>
      <Navbar />

      {/* ── Page Hero ── */}
      <div className={styles.pageHero}>
        <div className={styles.eyebrow}>The Podcast</div>
        <h1 className={styles.heroTitle}>
          Real stories.<br />
          <span className={styles.heroTitleItalic}>Real strength.</span>
        </h1>
        <p className={styles.heroSubtext}>
          Every episode is a conversation worth having — with survivors, doctors,
          wellness experts, and women who have been through it.
        </p>
        <div className={styles.platformBtns}>
          <a
            href={settings?.spotifyUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.platformBtn} ${styles.btnSpotify}`}
          >
            Spotify
          </a>
          <a
            href={settings?.youtubeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.platformBtn} ${styles.btnYoutube}`}
          >
            YouTube
          </a>
          <a
            href={settings?.amazonMusicUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.platformBtn} ${styles.btnAmazon}`}
          >
            Amazon Music
          </a>
        </div>
      </div>

      {/* ── Start With These Episodes ── */}
      <div className={styles.section}>
        <div className={styles.sectionEyebrow}>New here?</div>
        <div className={styles.sectionTitle}>Start with these episodes</div>
        <div className={styles.sectionSub}>A curated guide for first-time listeners.</div>
        <div className={styles.featuredGrid}>
          {starters && starters.length > 0
            ? starters.map((ep) => (
                <div key={ep._id} className={styles.featuredCard}>
                  <div className={styles.featuredTag}>
                    Ep {String(ep.episodeNumber).padStart(2, "0")}
                    {ep.starterTag ? ` · ${ep.starterTag}` : ""}
                  </div>
                  <div className={styles.featuredTitle}>{ep.title}</div>
                  <div className={styles.featuredDesc}>{ep.description}</div>
                  <Link
                    href={ep.spotifyUrl || "#"}
                    className={styles.featuredLink}
                  >
                    Listen now →
                  </Link>
                </div>
              ))
            : (
              <>
                <div className={styles.featuredCard}>
                  <div className={styles.featuredTag}>Ep 01 · Origin story</div>
                  <div className={styles.featuredTitle}>Why I started Diary of a Breastie</div>
                  <div className={styles.featuredDesc}>The story behind the mic — why this platform exists and who it&apos;s for.</div>
                  <span className={styles.featuredLink}>Listen now →</span>
                </div>
                <div className={styles.featuredCard}>
                  <div className={styles.featuredTag}>Ep 08 · Gut health</div>
                  <div className={styles.featuredTitle}>What chemo does to your gut — and how to heal</div>
                  <div className={styles.featuredDesc}>A deep dive into post-treatment gut health.</div>
                  <span className={styles.featuredLink}>Listen now →</span>
                </div>
                <div className={styles.featuredCard}>
                  <div className={styles.featuredTag}>Ep 14 · Community</div>
                  <div className={styles.featuredTitle}>You are not alone — finding your Breastie tribe</div>
                  <div className={styles.featuredDesc}>On building community after diagnosis.</div>
                  <span className={styles.featuredLink}>Listen now →</span>
                </div>
              </>
            )}
        </div>
      </div>

      {/* ── Recent Episodes ── */}
      <div className={styles.section}>
        <div className={styles.sectionEyebrow}>All episodes</div>
        <div className={styles.sectionTitle}>Recent episodes</div>
        <div className={styles.sectionSub}>New episodes drop weekly. Subscribe so you never miss one.</div>
        <div className={styles.episodeList}>
          {recentEpisodes.length > 0
            ? recentEpisodes.map((ep) => (
                <div key={ep._id} className={styles.episodeRow}>
                  <div className={styles.epNumber}>{ep.episodeNumber}</div>
                  <div className={styles.epInfo}>
                    <div className={styles.epTitle}>{ep.title}</div>
                    <div className={styles.epDesc}>{ep.description}</div>
                  </div>
                  <div className={styles.epMeta}>
                    <span className={styles.epDuration}>
                      {ep.duration || "—"}
                    </span>
                    <a
                      href={ep.spotifyUrl || "#"}
                      className={styles.playBtn}
                      aria-label={`Play episode ${ep.episodeNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="10" height="12" viewBox="0 0 12 14" fill="none">
                        <path d="M1 1l10 6-10 6V1z" fill="white" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            : (
              <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                No episodes yet. Add episodes in the Sanity Studio.
              </div>
            )}
        </div>
      </div>

      <Footer />
    </>
  );
}
