import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Explore ways to work with Diary of a Breastie — gut health coaching, speaking engagements, brand partnerships, and more.",
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

      {/* -- 1. Page Hero -- */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>WORK WITH ME</p>
          <h1 className={styles.heroTitle}>
            Let&apos;s do something{" "}
            <span className={styles.heroTitleItalic}>meaningful.</span>
          </h1>
          <p className={styles.heroSub}>
            Whether you&apos;re looking for personalized coaching, want to
            collaborate on a project, or need a speaker for your next event —
            there&apos;s a place for us to connect.
          </p>
          <div className={styles.heroButtons}>
            <a
              href={calendlyUrl}
              className={styles.btnPink}
              target={settings?.calendlyUrl ? "_blank" : undefined}
              rel={settings?.calendlyUrl ? "noopener noreferrer" : undefined}
            >
              Book a Discovery Call
            </a>
            <Link href="#contact" className={styles.btnOutline}>
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      {/* -- 2. Ways to Work Grid -- */}
      <section className={styles.waysSection}>
        <h2 className={styles.waysSectionTitle}>Ways to Work Together</h2>

        <div className={styles.waysGrid}>
          {/* Card 1 - Featured */}
          <div className={`${styles.wayCard} ${styles.wayCardFeatured}`}>
            <div className={styles.wayCardEmoji}>🌿</div>
            <span className={`${styles.tag} ${styles.tagPink}`}>
              Most popular
            </span>
            <h3 className={styles.wayCardTitle}>Gut Health Coaching</h3>
            <p className={styles.wayCardDesc}>
              Personalized 1-on-1 coaching to help you restore your gut health
              after treatment. Includes meal plans, supplement guidance, and
              ongoing support tailored to your journey.
            </p>
          </div>

          {/* Card 2 */}
          <div className={styles.wayCard}>
            <div className={styles.wayCardEmoji}>🎤</div>
            <span className={`${styles.tag} ${styles.tagPurple}`}>
              Engagements
            </span>
            <h3 className={styles.wayCardTitle}>Speaking &amp; Events</h3>
            <p className={styles.wayCardDesc}>
              Invite Luchi to speak at your conference, retreat, or community
              event about survivorship, faith, and whole-body wellness.
            </p>
          </div>

          {/* Card 3 */}
          <div className={styles.wayCard}>
            <div className={styles.wayCardEmoji}>🤝</div>
            <span className={`${styles.tag} ${styles.tagTeal}`}>
              Partnerships
            </span>
            <h3 className={styles.wayCardTitle}>
              Brand &amp; Org Partnerships
            </h3>
            <p className={styles.wayCardDesc}>
              Partner with Diary of a Breastie to amplify your mission through
              authentic storytelling and our engaged, purpose-driven community.
            </p>
          </div>
        </div>
      </section>

      {/* -- 3. Booking Section -- */}
      <section id="booking" className={styles.bookingSection}>
        <div className={styles.bookingGrid}>
          <div className={styles.bookingLeft}>
            <p className={styles.bookingEyebrow}>LET&apos;S CONNECT</p>
            <h2 className={styles.bookingHeading}>
              Book a free discovery call
            </h2>
            <p className={styles.bookingBody}>
              Not sure where to start? Schedule a complimentary 20-minute call
              to talk through your goals, ask questions, and see if we&apos;re
              the right fit. No pressure — just real conversation.
            </p>
            <a
              href={calendlyUrl}
              className={styles.bookingBtn}
              target={settings?.calendlyUrl ? "_blank" : undefined}
              rel={settings?.calendlyUrl ? "noopener noreferrer" : undefined}
            >
              Schedule a Call
            </a>
          </div>

          <div className={styles.bookingRight}>
            <h3 className={styles.bookingRightHeading}>What to expect</h3>
            <p className={styles.bookingRightBody}>
              During your discovery call, we&apos;ll chat about where you are
              in your wellness journey, what you&apos;re looking for, and how
              we might work together. It&apos;s a relaxed, no-obligation
              conversation designed to help you feel confident about your next
              step — whether that&apos;s coaching, a partnership, or simply
              getting pointed in the right direction.
            </p>
          </div>
        </div>
      </section>

      {/* -- 4. Contact Form -- */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactInner}>
          <h2 className={styles.contactHeading}>Get in Touch</h2>
          <p className={styles.contactSub}>
            Fill out the form below and we&apos;ll get back to you within 48
            hours.
          </p>

          <form className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={styles.formInput}
                placeholder="Jane"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={styles.formInput}
                placeholder="Doe"
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label className={styles.formLabel} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.formInput}
                placeholder="jane@example.com"
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label className={styles.formLabel} htmlFor="inquiryType">
                Inquiry Type
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                className={styles.formSelect}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="coaching">Gut Health Coaching</option>
                <option value="speaking">Speaking Engagement</option>
                <option value="partnership">Brand Partnership</option>
                <option value="podcast">Podcast Guest Inquiry</option>
                <option value="general">General Question</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label className={styles.formLabel} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.formTextarea}
                placeholder="Tell us a bit about what you're looking for..."
                required
              />
            </div>

            <button type="submit" className={styles.formSubmit}>
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
