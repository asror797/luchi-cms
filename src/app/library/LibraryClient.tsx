"use client";

import { useState, useCallback } from "react";
import styles from "./page.module.css";

const FILTERS = [
  "All",
  "Articles",
  "Free downloads",
  "Gut health",
  "Survivorship",
  "Mental wellness",
  "Nutrition",
  "Movement",
  "Faith & purpose",
] as const;

const CATEGORY_MAP: Record<string, string> = {
  "Gut health": "gut",
  Survivorship: "survival",
  "Mental wellness": "mental",
  Nutrition: "nutrition",
  Movement: "movement",
  "Faith & purpose": "faith",
};

const TAG_LABELS: Record<string, string> = {
  gut: "Gut Health",
  mental: "Mental Wellness",
  survival: "Survivorship",
  faith: "Faith & Purpose",
  movement: "Movement",
  nutrition: "Nutrition",
};

const TAG_CLASS_MAP: Record<string, string> = {
  gut: styles.tagGut,
  mental: styles.tagMental,
  survival: styles.tagSurvivorship,
  faith: styles.tagFaith,
  movement: styles.tagMovement,
  nutrition: styles.tagNutrition,
};

/* -- File Icon SVG -- */
function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
    </svg>
  );
}

interface LibraryArticle {
  _id: string;
  title: string;
  description?: string;
  category: string;
  externalLink?: string;
}

interface Download {
  _id: string;
  title: string;
  description?: string;
}

interface LibraryClientProps {
  articles: LibraryArticle[];
  downloads: Download[];
  substackUrl?: string;
}

export default function LibraryClient({
  articles,
  downloads,
  substackUrl,
}: LibraryClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalResource, setModalResource] = useState<string | null>(null);

  const filterArticles = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const openModal = useCallback((resourceName: string) => {
    setModalResource(resourceName);
  }, []);

  const closeModal = useCallback(() => {
    setModalResource(null);
  }, []);

  /* Derive visibility */
  const showArticles = activeFilter !== "Free downloads";
  const showDownloads =
    activeFilter === "All" || activeFilter === "Free downloads";

  const visibleArticles = articles.filter((a) => {
    if (activeFilter === "All" || activeFilter === "Articles") return true;
    return a.category === CATEGORY_MAP[activeFilter];
  });

  return (
    <>
      {/* -- Hero -- */}
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>BREASTIE LIBRARY</p>
          <h1 className={styles.heroTitle}>
            Your resource{" "}
            <span className={styles.heroTitleAccent}>hub.</span>
          </h1>
          <p className={styles.heroSub}>
            Articles, free downloads, and wellness guides — everything you need
            to support your survivorship journey, all in one place.
          </p>
          <span className={styles.substackNote}>
            <span className={styles.substackDot} />
            New articles published on{" "}
            <a
              href={substackUrl || "https://substack.com"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.substackLink}
            >
              Substack
            </a>
          </span>
        </div>

        <div className={styles.comingSoonCard}>
          <p className={styles.comingSoonLabel}>COMING SOON</p>
          <h2 className={styles.comingSoonTitle}>Breastie Marketplace</h2>
          <p className={styles.comingSoonDesc}>
            A curated shop for wellness essentials, survivor-approved products,
            and exclusive Breastie merch.
          </p>
        </div>
      </section>

      {/* -- Filter Bar -- */}
      <div className={styles.filterBar}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.filterPill} ${
              activeFilter === f ? styles.filterPillActive : ""
            }`}
            onClick={() => filterArticles(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* -- Articles Section -- */}
      {showArticles && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>ARTICLES</span>
            <a
              href={substackUrl || "https://substack.com"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewAllLink}
            >
              View all on Substack &rarr;
            </a>
          </div>

          <div className={styles.articlesGrid}>
            {visibleArticles.length > 0
              ? visibleArticles.map((article) => (
                  <div
                    key={article._id}
                    className={styles.articleCard}
                    data-category={article.category}
                  >
                    <span
                      className={`${styles.articleTag} ${
                        TAG_CLASS_MAP[article.category] || ""
                      }`}
                    >
                      {TAG_LABELS[article.category] || article.category}
                    </span>
                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <p className={styles.articleDesc}>{article.description}</p>
                    <div className={styles.articleFooter}>
                      <span className={styles.articleSource}>
                        <span className={styles.orangeDot} />
                        Substack
                      </span>
                      <a
                        href={article.externalLink || "#"}
                        className={styles.readLink}
                        target={article.externalLink ? "_blank" : undefined}
                        rel={
                          article.externalLink
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        Read &rarr;
                      </a>
                    </div>
                  </div>
                ))
              : (
                <div style={{ textAlign: "center", padding: "2rem", color: "#666", gridColumn: "1 / -1" }}>
                  No articles match this filter.
                </div>
              )}
          </div>
        </section>
      )}

      {/* -- Downloads Section -- */}
      {showDownloads && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>FREE DOWNLOADS</span>
          </div>

          <div className={styles.downloadsGrid}>
            {downloads.length > 0
              ? downloads.map((dl) => (
                  <div key={dl._id} className={styles.downloadCard}>
                    <div className={styles.iconWrap}>
                      <FileIcon />
                    </div>
                    <h3 className={styles.downloadTitle}>{dl.title}</h3>
                    <p className={styles.downloadDesc}>{dl.description}</p>
                    <button
                      className={styles.downloadBtn}
                      onClick={() => openModal(dl.title)}
                    >
                      Download
                    </button>
                  </div>
                ))
              : (
                <div style={{ textAlign: "center", padding: "2rem", color: "#666", gridColumn: "1 / -1" }}>
                  No downloads available yet.
                </div>
              )}
          </div>
        </section>
      )}

      {/* -- Email Modal -- */}
      {modalResource && (
        <div className={styles.overlay} onClick={closeModal}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={closeModal}>
              &times;
            </button>
            <h2 className={styles.modalHeading}>Get your free download</h2>
            <p className={styles.modalSub}>
              Enter your details below and we&apos;ll send the resource straight
              to your inbox.
            </p>
            <div className={styles.modalResource}>{modalResource}</div>
            <input
              type="text"
              placeholder="First name"
              className={styles.modalInput}
            />
            <input
              type="email"
              placeholder="Email address"
              className={styles.modalInput}
            />
            <button className={styles.modalSubmit}>Send me the download</button>
          </div>
        </div>
      )}
    </>
  );
}
