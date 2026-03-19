import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Work with Diary of a Breastie — gut health coaching, speaking engagements, brand partnerships, and organizational wellness programs.",
};

interface SiteSettings {
  calendlyUrl?: string;
  contactEmail?: string;
}

export default async function WorkWithMePage() {
  const settings: SiteSettings = await client.fetch(SITE_SETTINGS_QUERY);

  const calendlyUrl = settings?.calendlyUrl || "#booking";

  return (
    <>
      <Navbar />

      {/* ── 1. Hero ── */}
      <div className={styles.hero}>
        <div className={styles.eyebrow}>Work With Me</div>
        <h1 className={styles.heroH1}>
          Let&apos;s do something <em>meaningful.</em>
        </h1>
        <p className={styles.heroSub}>
          Whether you&apos;re a survivor looking for gut health coaching, a brand that
          shares our mission, or an organization ready to bring wellness to your
          community — there&apos;s a way to work together.
        </p>
        <div className={styles.heroBtns}>
          <a
            href={calendlyUrl}
            className={`${styles.heroBtn} ${styles.btnPink}`}
            target={settings?.calendlyUrl ? "_blank" : undefined}
            rel={settings?.calendlyUrl ? "noopener noreferrer" : undefined}
          >
            Book a discovery call
          </a>
          <a href="#form" className={`${styles.heroBtn} ${styles.btnOutline}`}>
            Send an inquiry
          </a>
        </div>
      </div>

      {/* ── 2. Ways to Work ── */}
      <div className={styles.waysWrap}>
        <div className={styles.waysGrid}>
          <div className={`${styles.wayCard} ${styles.wayCardFeatured}`}>
            <div className={styles.wayIcon}>🌿</div>
            <span className={`${styles.wayTag} ${styles.tagPink}`}>Most popular</span>
            <div className={styles.wayH}>Gut Health Coaching</div>
            <div className={styles.wayDesc}>
              1:1 coaching for breast cancer survivors and women ready to heal their gut,
              restore energy, and feel at home in their bodies again. Personalized protocols
              for where you are in your journey.
            </div>
            <a href="#form" className={styles.wayCta}>Learn more &amp; apply →</a>
          </div>
          <div className={styles.wayCard}>
            <div className={styles.wayIcon}>🎤</div>
            <span className={`${styles.wayTag} ${styles.tagPurple}`}>Engagements</span>
            <div className={styles.wayH}>Speaking &amp; Events</div>
            <div className={styles.wayDesc}>
              Available for conferences, summits, health events, church groups, and community
              programs focused on survivorship, wellness, gut health, and faith-grounded healing.
            </div>
            <a href="#form" className={styles.wayCta}>Inquire about speaking →</a>
          </div>
          <div className={styles.wayCard}>
            <div className={styles.wayIcon}>🤝</div>
            <span className={`${styles.wayTag} ${styles.tagTeal}`}>Partnerships</span>
            <div className={styles.wayH}>Brand &amp; Org Partnerships</div>
            <div className={styles.wayDesc}>
              Partnering with aligned wellness brands, nonprofits, and organizations to bring
              valuable resources to the Breastie community authentically and meaningfully.
            </div>
            <a href="#form" className={styles.wayCta}>Explore partnerships →</a>
          </div>
        </div>
      </div>

      {/* ── 3. Booking Section ── */}
      <div className={styles.bookingWrap}>
        <div className={styles.bookingGrid}>
          <div className={styles.bookingLeft}>
            <div className={styles.secEyebrow}>Start here</div>
            <div className={styles.secH}>Book a free<br />discovery call</div>
            <div className={styles.secBody}>
              A free 20-minute conversation to explore gut health coaching, speaking
              opportunities, or partnership possibilities — no pressure, just a chance to
              connect and see if we&apos;re the right fit.
            </div>
            <a
              href={calendlyUrl}
              className={styles.bookingBtn}
              target={settings?.calendlyUrl ? "_blank" : undefined}
              rel={settings?.calendlyUrl ? "noopener noreferrer" : undefined}
            >
              Book your call →
            </a>
          </div>
          <div className={styles.bookingRight}>
            <div className={styles.bookingNoteH}>What to expect</div>
            <div className={styles.bookingNoteBody}>
              This is a low-pressure conversation where we get to know each other, discuss
              your goals, and figure out the best path forward — whether that&apos;s coaching,
              a speaking engagement, or a brand collaboration. No commitment required.
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Contact Form ── */}
      <div id="form" className={styles.formSection}>
        <div className={styles.secEyebrow}>Get in touch</div>
        <div className={styles.formH}>Send a message</div>
        <p className={styles.formSub}>
          Prefer email? Fill out the form below and we&apos;ll get back to you within 2–3 business days.
        </p>
        <div className={styles.formGrid}>
          <div>
            <label className={styles.formLabel}>First name</label>
            <input className={styles.formInput} type="text" placeholder="Your first name" />
          </div>
          <div>
            <label className={styles.formLabel}>Last name</label>
            <input className={styles.formInput} type="text" placeholder="Your last name" />
          </div>
          <div>
            <label className={styles.formLabel}>Email address</label>
            <input className={styles.formInput} type="email" placeholder="your@email.com" />
          </div>
          <div>
            <label className={styles.formLabel}>Inquiry type</label>
            <select className={styles.formInput} defaultValue="coaching">
              <option value="coaching">Gut health coaching</option>
              <option value="speaking">Speaking engagement</option>
              <option value="brand">Brand partnership</option>
              <option value="org">Organizational partnership</option>
              <option value="general">General question</option>
            </select>
          </div>
          <div className={styles.formFull}>
            <label className={styles.formLabel}>Message</label>
            <textarea
              className={styles.formTextarea}
              placeholder="Tell us a little about yourself and what you're looking for..."
            />
          </div>
          <div className={styles.formFull}>
            <button className={styles.formSubmit}>Send message →</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
