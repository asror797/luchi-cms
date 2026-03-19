import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import styles from "./page.module.css";
import { client } from "@/sanity/lib/client";
import {
  SITE_SETTINGS_QUERY,
  FEATURED_EPISODE_QUERY,
  STARTER_EPISODES_QUERY,
  HOMEPAGE_TESTIMONIALS_QUERY,
  ALL_WELLNESS_PROGRAMS_QUERY,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [settings, featured, starters, testimonials, programs] =
    await Promise.all([
      client.fetch(SITE_SETTINGS_QUERY),
      client.fetch(FEATURED_EPISODE_QUERY),
      client.fetch(STARTER_EPISODES_QUERY),
      client.fetch(HOMEPAGE_TESTIMONIALS_QUERY),
      client.fetch(ALL_WELLNESS_PROGRAMS_QUERY),
    ]);

  // Parse hero title: *word* becomes <em>word</em>
  const heroTitle = settings?.heroTitle || "Your story deserves to be *heard.*";
  const titleParts = heroTitle.split(/\*(.*?)\*/);

  return (
    <>
      <Navbar />

      <div className={styles.heroWrap}>
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.heroEyebrow}>
              {settings?.heroEyebrow || "A safe space for survivors"}
            </div>
            <h1 className={styles.heroH1}>
              {titleParts.map((part: string, i: number) =>
                i % 2 === 1 ? <em key={i}>{part}</em> : part
              )}
            </h1>
            <p className={styles.heroSub}>
              {settings?.heroSubtitle ||
                "Diary of a Breastie amplifies the voices of breast cancer survivors through honest conversations, wellness education, and community."}
            </p>
            <div className={styles.heroBtns}>
              <Link href="/listen" className={styles.btnPrimary}>Listen to the podcast</Link>
              <Link href="/newsletter" className={styles.btnOutline}>Join the newsletter</Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.latestEpLabel}>Latest episode</div>
            {featured?.audioUrl ? (
              <AudioPlayer
                title={featured.title}
                description={featured.description}
                duration={featured.duration}
                audioUrl={featured.audioUrl}
              />
            ) : (
              <div className={styles.epCard}>
                <div className={styles.epTitle}>
                  {featured?.title || "Finding joy after treatment"}
                </div>
                <div className={styles.epDesc}>
                  {featured?.description ||
                    "A conversation about reclaiming your body and your life post-chemo — with special guest Dr. Renee Collins."}
                </div>
                <div className={styles.epPlayer}>
                  <button className={styles.playBtn} aria-label="Play">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                      <path d="M1 1l10 6-10 6V1z" fill="white" />
                    </svg>
                  </button>
                  <div className={styles.epBar}>
                    <div className={styles.epBarFill} />
                  </div>
                  <span className={styles.epTime}>{featured?.duration || "42 min"}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.sectionsStrip}>
        <div className={styles.stripItem}>
          <div className={styles.stripIcon}>🎙</div>
          <div className={styles.stripTitle}>The Podcast</div>
          <div className={styles.stripDesc}>Real conversations with survivors, doctors &amp; wellness experts.</div>
        </div>
        <div className={styles.stripItem}>
          <div className={styles.stripIcon}>📬</div>
          <div className={styles.stripTitle}>Newsletter</div>
          <div className={styles.stripDesc}>Wellness tips, survivor stories &amp; community updates in your inbox.</div>
        </div>
        <div className={styles.stripItem}>
          <div className={styles.stripIcon}>📚</div>
          <div className={styles.stripTitle}>Breastie Library</div>
          <div className={styles.stripDesc}>A curated resource hub — articles, guides &amp; episode archives.</div>
        </div>
        <div className={styles.stripItem}>
          <div className={styles.stripIcon}>🌿</div>
          <div className={styles.stripTitle}>Wellness Programs</div>
          <div className={styles.stripDesc}>Gut health coaching designed for survivors &amp; women everywhere.</div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Podcast</div>
        <div className={styles.sectionTitle}>Start here</div>
        <div className={styles.sectionSub}>New to Diary of a Breastie? These episodes are a great place to begin.</div>
        <div className={styles.epGrid}>
          {starters && starters.length > 0
            ? starters.map((ep: { _id: string; episodeNumber: number; title: string; spotifyUrl?: string }) => (
                <div key={ep._id} className={styles.epMini}>
                  <div className={styles.epNum}>Ep {String(ep.episodeNumber).padStart(2, "0")}</div>
                  <div className={styles.epMiniTitle}>{ep.title}</div>
                  <Link href={ep.spotifyUrl || "/listen"} className={styles.epMiniLink}>Listen &rarr;</Link>
                </div>
              ))
            : (
              <>
                <div className={styles.epMini}>
                  <div className={styles.epNum}>Ep 01</div>
                  <div className={styles.epMiniTitle}>Why I started this podcast</div>
                  <Link href="/listen" className={styles.epMiniLink}>Listen &rarr;</Link>
                </div>
                <div className={styles.epMini}>
                  <div className={styles.epNum}>Ep 14</div>
                  <div className={styles.epMiniTitle}>Gut health &amp; your immune system after chemo</div>
                  <Link href="/listen" className={styles.epMiniLink}>Listen &rarr;</Link>
                </div>
                <div className={styles.epMini}>
                  <div className={styles.epNum}>Ep 27</div>
                  <div className={styles.epMiniTitle}>Movement as medicine — joyful fitness for survivors</div>
                  <Link href="/listen" className={styles.epMiniLink}>Listen &rarr;</Link>
                </div>
              </>
            )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Wellness programs</div>
        <div className={styles.sectionTitle}>Gut health coaching</div>
        <div className={styles.sectionSub}>Healing from the inside out — programs designed for where you are.</div>
        <div className={styles.coachingGrid}>
          {programs && programs.length > 0
            ? programs.slice(0, 2).map((prog: { _id: string; tagStyle?: string; tag?: string; title: string; description?: string; ctaLink?: string }) => (
                <div
                  key={prog._id}
                  className={`${styles.coachingCard} ${
                    prog.tagStyle === "pink"
                      ? styles.coachingCardPink
                      : styles.coachingCardNeutral
                  }`}
                >
                  <span
                    className={`${styles.coachingTag} ${
                      prog.tagStyle === "pink"
                        ? styles.tagPink
                        : styles.tagNeutral
                    }`}
                  >
                    {prog.tag}
                  </span>
                  <div className={styles.coachingH}>{prog.title}</div>
                  <div className={styles.coachingDesc}>{prog.description}</div>
                  <Link href={prog.ctaLink || "/programs"} className={styles.coachingCta}>
                    Learn more &amp; apply &rarr;
                  </Link>
                </div>
              ))
            : (
              <>
                <div className={`${styles.coachingCard} ${styles.coachingCardPink}`}>
                  <span className={`${styles.coachingTag} ${styles.tagPink}`}>For survivors</span>
                  <div className={styles.coachingH}>Breast Cancer Gut Health Coaching</div>
                  <div className={styles.coachingDesc}>
                    A specialized program addressing the gut microbiome disruption that comes with cancer treatment — rebuilding your digestive health, energy, and confidence.
                  </div>
                  <Link href="/programs" className={styles.coachingCta}>Learn more &amp; apply &rarr;</Link>
                </div>
                <div className={`${styles.coachingCard} ${styles.coachingCardNeutral}`}>
                  <span className={`${styles.coachingTag} ${styles.tagNeutral}`}>For all women</span>
                  <div className={styles.coachingH}>Women&apos;s Wellness Gut Health Program</div>
                  <div className={styles.coachingDesc}>
                    A holistic approach to gut health for women at any stage of life — addressing bloating, energy, hormones, and overall wellbeing through root-cause healing.
                  </div>
                  <Link href="/programs" className={styles.coachingCta}>Learn more &amp; apply &rarr;</Link>
                </div>
              </>
            )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Community voices</div>
        <div className={styles.sectionTitle}>What Breasties are saying</div>
        <div className={styles.sectionSub}>Stories from our community of survivors and listeners.</div>
        <div className={styles.testimonialStrip}>
          {testimonials && testimonials.length > 0
            ? testimonials.map((t: { _id: string; quote: string; name: string }) => (
                <div key={t._id} className={styles.testi}>
                  <div className={styles.testiQuote}>&ldquo;{t.quote}&rdquo;</div>
                  <div className={styles.testiName}>{t.name}</div>
                </div>
              ))
            : (
              <>
                <div className={styles.testi}>
                  <div className={styles.testiQuote}>&ldquo;This podcast made me feel seen for the first time since my diagnosis. I cried, laughed, and healed.&rdquo;</div>
                  <div className={styles.testiName}>— Monica T., survivor</div>
                </div>
                <div className={styles.testi}>
                  <div className={styles.testiQuote}>&ldquo;The gut health coaching changed everything. I finally feel like myself again after treatment.&rdquo;</div>
                  <div className={styles.testiName}>— Jasmine R., coaching client</div>
                </div>
                <div className={styles.testi}>
                  <div className={styles.testiQuote}>&ldquo;Every episode feels like a conversation with a friend who truly gets it. This community is everything.&rdquo;</div>
                  <div className={styles.testiName}>— Danielle W., listener</div>
                </div>
              </>
            )}
        </div>
      </div>

      <div className={styles.newsletterBar}>
        <div className={styles.nlH}>Join the Breastie community</div>
        <div className={styles.nlSub}>Wellness wisdom, survivor stories &amp; new episodes — straight to your inbox.</div>
        <div className={styles.nlForm}>
          <input className={styles.nlInput} type="email" placeholder="your@email.com" />
          <button className={styles.btnPrimary}>Subscribe</button>
        </div>
      </div>

      <Footer />
    </>
  );
}
