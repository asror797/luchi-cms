import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  SITE_SETTINGS_QUERY,
  ALL_TEAM_MEMBERS_QUERY,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Diary of a Breastie — the story behind the mic, our mission, values, and how to work with us.",
};

interface SiteSettings {
  hostName?: string;
  hostTitle?: string;
  hostBio?: string;
  hostImage?: { asset: { _ref: string } };
  missionQuote?: string;
  missionBody?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  facebookUrl?: string;
  contactEmail?: string;
  calendlyUrl?: string;
}

export default async function AboutPage() {
  const [settings, _teamMembers]: [SiteSettings, unknown[]] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(ALL_TEAM_MEMBERS_QUERY),
  ]);

  return (
    <>
      <Navbar />

      {/* -- 1. Hero Split -- */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.eyebrow}>ABOUT</p>
          <h1 className={styles.heroTitle}>
            The story behind the{" "}
            <span className={styles.heroTitleItalic}>mic.</span>
          </h1>
          <div className={styles.heroBody}>
            <p>
              Diary of a Breastie started as a whisper between two friends
              navigating life after a breast cancer diagnosis — and grew into a
              movement.
            </p>
            <p>
              We realized the conversations we were having privately — about
              fear, faith, gut health, identity, and everything in between —
              were the same ones thousands of women were desperate to hear.
            </p>
            <p>
              So we hit record. What began as a podcast quickly became a
              platform for honest, faith-grounded storytelling that honors the
              full spectrum of survivorship.
            </p>
            <p>
              Today, Diary of a Breastie is a media and wellness brand
              dedicated to whole-body healing and the power of community.
            </p>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.hostAvatar}>
            {settings?.hostImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlFor(settings.hostImage).width(120).height(120).url()}
                alt={settings.hostName || "Host"}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <span className={styles.hostAvatarEmoji}>✍</span>
            )}
          </div>
          <p className={styles.hostLabel}>Your Host</p>
          <h2 className={styles.hostName}>
            {settings?.hostName || "Luchi Onyebueke"}
          </h2>
          <p className={styles.hostTitle}>
            {settings?.hostTitle || "Podcast Host \u00B7 Gut Health Coach"}
          </p>
          <p className={styles.hostBio}>
            {settings?.hostBio ||
              "Luchi is a breast cancer survivor, certified gut health coach, and the voice behind Diary of a Breastie. She's passionate about helping women reclaim their wellness through faith, food, and honest conversation."}
          </p>
          <div className={styles.socialButtons}>
            <a
              href={settings?.tiktokUrl || "https://tiktok.com"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="TikTok"
            >
              🎵
            </a>
            <a
              href={settings?.instagramUrl || "https://instagram.com"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Instagram"
            >
              📷
            </a>
            <a
              href={settings?.facebookUrl || "https://facebook.com"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Facebook"
            >
              📘
            </a>
          </div>
        </div>
      </section>

      {/* -- 2. Mission -- */}
      <section className={styles.mission}>
        <div className={styles.missionInner}>
          <p className={styles.missionLabel}>OUR MISSION</p>
          <p className={styles.missionQuote}>
            &ldquo;{settings?.missionQuote ||
              "To create a space where breast cancer survivors feel seen, heard, and empowered to heal — body, mind, and spirit."}&rdquo;
          </p>
          <p className={styles.missionBody}>
            {settings?.missionBody ||
              "We believe survivorship doesn't end at remission. Through storytelling, wellness education, and faith-centered community, we walk alongside women in every season of their journey."}
          </p>
        </div>
      </section>

      {/* -- 3. Values Grid -- */}
      <section className={styles.values}>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueEmoji}>🤍</div>
            <h3 className={styles.valueTitle}>Authentic storytelling</h3>
            <p className={styles.valueDesc}>
              Real stories from real survivors — no filters, no sugarcoating.
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueEmoji}>🌿</div>
            <h3 className={styles.valueTitle}>Whole-body wellness</h3>
            <p className={styles.valueDesc}>
              Healing that honors the gut, the mind, and the spirit together.
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueEmoji}>✝️</div>
            <h3 className={styles.valueTitle}>Faith-grounded</h3>
            <p className={styles.valueDesc}>
              Rooted in faith as a source of strength, hope, and resilience.
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueEmoji}>👩🏾‍🤝‍👩🏽</div>
            <h3 className={styles.valueTitle}>Community first</h3>
            <p className={styles.valueDesc}>
              Built by and for women who understand what it means to fight — and
              thrive.
            </p>
          </div>
        </div>
      </section>

      {/* -- 4. Work With Me -- */}
      <section className={styles.workSection}>
        <h2 className={styles.workSectionTitle}>Work With Me</h2>

        <div className={styles.bookingBar}>
          <span className={styles.bookingBarText}>
            Book a free discovery call
          </span>
          <Link href="/work-with-me" className={styles.bookingBarBtn}>
            Book Now
          </Link>
        </div>

        <div className={styles.workCards}>
          <div className={`${styles.workCard} ${styles.workCardFeatured}`}>
            <div className={styles.workCardEmoji}>🌿</div>
            <h3 className={styles.workCardTitle}>Gut Health Coaching</h3>
            <p className={styles.workCardDesc}>
              Personalized 1-on-1 coaching to help you restore your gut health
              after treatment. Includes meal plans, supplement guidance, and
              ongoing support.
            </p>
          </div>
          <div className={styles.workCard}>
            <div className={styles.workCardEmoji}>🎤</div>
            <h3 className={styles.workCardTitle}>Speaking Engagements</h3>
            <p className={styles.workCardDesc}>
              Invite Luchi to speak at your conference, retreat, or community
              event about survivorship, faith, and wellness.
            </p>
          </div>
          <div className={styles.workCard}>
            <div className={styles.workCardEmoji}>🤝</div>
            <h3 className={styles.workCardTitle}>Brand Partnerships</h3>
            <p className={styles.workCardDesc}>
              Partner with Diary of a Breastie to amplify your brand through
              authentic storytelling and our engaged community.
            </p>
          </div>
        </div>

        <div className={styles.contactCards}>
          <div className={styles.contactCard}>
            <h3 className={styles.contactCardTitle}>
              Podcast Guest Inquiries
            </h3>
            <p className={styles.contactCardDesc}>
              Have a story to share? We&apos;d love to hear from breast cancer
              survivors, advocates, and wellness experts.
            </p>
            <a
              href={`mailto:${settings?.contactEmail || "hello@diaryofabreastie.com"}`}
              className={styles.contactCardLink}
            >
              Submit your story &rarr;
            </a>
          </div>
          <div className={styles.contactCard}>
            <h3 className={styles.contactCardTitle}>General Contact</h3>
            <p className={styles.contactCardDesc}>
              Questions, feedback, or just want to say hi? We&apos;d love to
              connect with you.
            </p>
            <a
              href={`mailto:${settings?.contactEmail || "hello@diaryofabreastie.com"}`}
              className={styles.contactCardLink}
            >
              Get in touch &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* -- 5. Contact Form -- */}
      <section className={styles.contactSection}>
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
