import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { serverClient } from "@/sanity/lib/client";
import {
  ALL_NEWSLETTER_ISSUES_QUERY,
  NEWSLETTER_TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Sign up for the Diary of a Breastie newsletter — wellness wisdom, survivor stories, and gut health tips delivered to your inbox.",
};

const benefits = [
  "Exclusive survivor stories & interviews",
  "Gut health tips you can use today",
  "Early access to new podcast episodes",
  "Community events & program updates",
];

interface NewsletterIssue {
  _id: string;
  title: string;
  date: string;
  preview?: string;
  link?: string;
}

interface Testimonial {
  _id: string;
  quote: string;
  name: string;
}

export const revalidate = 60;

export default async function NewsletterPage() {
  const [issues, testimonials]: [NewsletterIssue[], Testimonial[]] =
    await Promise.all([
      serverClient.fetch(ALL_NEWSLETTER_ISSUES_QUERY),
      serverClient.fetch(NEWSLETTER_TESTIMONIALS_QUERY),
    ]);

  return (
    <>
      <Navbar />
      <main>
        {/* -- Hero Split -- */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <p className={styles.eyebrow}>THE NEWSLETTER</p>
            <h1 className={styles.heroTitle}>
              Wellness wisdom in your{" "}
              <span className={styles.heroTitleItalic}>inbox.</span>
            </h1>
            <p className={styles.heroSubtext}>
              Honest conversations about survivorship, gut health, and faith —
              delivered every other week to a growing community of Breasties.
            </p>
            <p className={styles.listHeading}>What you&apos;ll get</p>
            <ul className={styles.benefitList}>
              {benefits.map((b) => (
                <li key={b} className={styles.benefitItem}>
                  <span className={styles.dot} />
                  {b}
                </li>
              ))}
            </ul>
            <p className={styles.frequencyNote}>
              Delivered every other Tuesday — no spam, ever.
            </p>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.signupCard}>
              <h2 className={styles.cardHeading}>
                Join the Breastie community
              </h2>
              <p className={styles.cardSubtext}>
                Get wellness wisdom, survivor stories, and gut health tips
                straight to your inbox.
              </p>
              <form action="#" method="post">
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="firstName">
                    First name
                  </label>
                  <input
                    id="firstName"
                    className={styles.input}
                    type="text"
                    placeholder="Your first name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    className={styles.input}
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <button type="submit" className={styles.subscribeBtn}>
                  Subscribe
                </button>
              </form>
              <p className={styles.privacyNote}>
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* -- Past Issues -- */}
        <section className={styles.pastIssues}>
          <h2 className={styles.sectionTitle}>Past issues</h2>
          <p className={styles.sectionSubtext}>
            Catch up on what you&apos;ve missed — or revisit your favorites.
          </p>
          <div className={styles.issuesGrid}>
            {issues && issues.length > 0
              ? issues.map((issue) => (
                  <article key={issue._id} className={styles.issueCard}>
                    <div className={styles.issueHeader}>
                      <p className={styles.issueDate}>{issue.date}</p>
                      <h3 className={styles.issueTitle}>{issue.title}</h3>
                    </div>
                    <div className={styles.issueDivider} />
                    <div className={styles.issueBody}>
                      <p className={styles.issuePreview}>{issue.preview}</p>
                      <a
                        href={issue.link || "#"}
                        className={styles.readLink}
                        target={issue.link ? "_blank" : undefined}
                        rel={issue.link ? "noopener noreferrer" : undefined}
                      >
                        Read this issue &rarr;
                      </a>
                    </div>
                  </article>
                ))
              : (
                <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                  No issues yet. Add newsletter issues in the Sanity Studio.
                </div>
              )}
          </div>
        </section>

        {/* -- Testimonials -- */}
        <section className={styles.testimonials}>
          <h2 className={styles.sectionTitle}>What subscribers are saying</h2>
          <div className={styles.testimonialsGrid}>
            {testimonials && testimonials.length > 0
              ? testimonials.map((t) => (
                  <div key={t._id} className={styles.testimonialCard}>
                    <div className={styles.stars}>★★★★★</div>
                    <p className={styles.testimonialText}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className={styles.testimonialAuthor}>{t.name}</p>
                  </div>
                ))
              : (
                <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                  No testimonials yet.
                </div>
              )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
