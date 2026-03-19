import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { client } from "@/sanity/lib/client";
import {
  ALL_WELLNESS_PROGRAMS_QUERY,
  PROGRAMS_TESTIMONIALS_QUERY,
  ALL_FAQ_ITEMS_QUERY,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Wellness Programs",
  description:
    "Explore faith-integrated wellness programs for breast cancer survivors, women's health, and organizational partnerships at Diary of a Breastie.",
};

const CheckIcon = ({ color = "#fff" }: { color?: string }) => (
  <svg
    className={styles.checkSvg}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const processSteps = [
  {
    num: "01",
    title: "Apply or Inquire",
    desc: "Fill out a short application so we can understand your unique needs and goals.",
  },
  {
    num: "02",
    title: "Discovery Call",
    desc: "We'll hop on a free 20-minute call to see if we're the right fit for each other.",
  },
  {
    num: "03",
    title: "Custom Plan",
    desc: "Receive a personalized program roadmap designed around your health journey.",
  },
  {
    num: "04",
    title: "Begin Healing",
    desc: "Start your program with ongoing support, accountability, and community.",
  },
];

interface WellnessProgram {
  _id: string;
  title: string;
  description?: string;
  tag?: string;
  tagStyle?: string;
  isFeatured?: boolean;
  includesLabel?: string;
  includes?: string[];
  ctaText?: string;
  ctaStyle?: string;
  ctaLink?: string;
}

interface Testimonial {
  _id: string;
  quote: string;
  name: string;
}

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

export default async function ProgramsPage() {
  const [programs, testimonials, faqs]: [WellnessProgram[], Testimonial[], FaqItem[]] =
    await Promise.all([
      client.fetch(ALL_WELLNESS_PROGRAMS_QUERY),
      client.fetch(PROGRAMS_TESTIMONIALS_QUERY),
      client.fetch(ALL_FAQ_ITEMS_QUERY),
    ]);

  const getCheckCircleClass = (tagStyle?: string) => {
    if (tagStyle === "pink") return styles.checkCirclePink;
    if (tagStyle === "teal") return styles.checkCircleTeal;
    return styles.checkCircleNeutral;
  };

  const getTagClass = (tagStyle?: string) => {
    if (tagStyle === "pink") return styles.tagPink;
    if (tagStyle === "teal") return styles.tagTeal;
    return styles.tagNeutral;
  };

  const getBtnClass = (ctaStyle?: string) => {
    if (ctaStyle === "pink") return styles.btnPink;
    if (ctaStyle === "teal") return styles.btnTeal;
    return styles.btnOutline;
  };

  return (
    <>
      <Navbar />
      <main>
        {/* -- Hero -- */}
        <section className={styles.hero}>
          <p className={styles.eyebrow}>WELLNESS PROGRAMS</p>
          <h1 className={styles.heroTitle}>
            Healing from the{" "}
            <span className={styles.heroTitleItalic}>inside out.</span>
          </h1>
          <p className={styles.heroSubtext}>
            Gut health coaching for individuals and organizations — meeting survivors and
            women wherever they are on the journey to feeling well.
          </p>
          <span className={styles.badge}>
            Now accepting clients &amp; organizational partners
          </span>
        </section>

        {/* -- Program Tracks -- */}
        <section className={styles.tracks}>
          <div className={styles.tracksGrid}>
            {programs && programs.length > 0
              ? programs.map((prog) => (
                  <div
                    key={prog._id}
                    className={
                      prog.isFeatured
                        ? styles.trackCardFeatured
                        : styles.trackCard
                    }
                  >
                    <span className={getTagClass(prog.tagStyle)}>
                      {prog.tag}
                    </span>
                    <h3 className={styles.trackTitle}>{prog.title}</h3>
                    <p className={styles.trackSubtext}>{prog.description}</p>
                    {prog.includes && prog.includes.length > 0 && (
                      <>
                        <div className={styles.includesLabel}>
                          {prog.includesLabel || "What\u2019s included"}
                        </div>
                        <ul className={styles.checkList}>
                          {prog.includes.map((item) => (
                            <li key={item} className={styles.checkItem}>
                              <span className={getCheckCircleClass(prog.tagStyle)}>
                                <CheckIcon color="#fff" />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <a
                      href={prog.ctaLink || "#"}
                      className={getBtnClass(prog.ctaStyle)}
                    >
                      {prog.ctaText || "Apply now"} &rarr;
                    </a>
                  </div>
                ))
              : (
                <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                  No programs yet. Add programs in the Sanity Studio.
                </div>
              )}
          </div>
        </section>

        {/* -- Nonprofit Band -- */}
        <section className={styles.nonprofit}>
          <div className={styles.nonprofitInner}>
            <div>
              <p className={styles.eyebrowTeal}>NONPROFIT MISSION</p>
              <h2 className={styles.nonprofitHeading}>
                Wellness is our mission — not a product.
              </h2>
              <p className={styles.nonprofitBody}>
                As a faith-integrated wellness nonprofit, every program we offer
                is designed to make holistic healing accessible. We believe that
                survivorship doesn&apos;t end at the last treatment — and
                neither should support.
              </p>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>3</div>
                <div className={styles.statLabel}>Program formats</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>1:1</div>
                <div className={styles.statLabel}>Custom pricing</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>&infin;</div>
                <div className={styles.statLabel}>Impact potential</div>
              </div>
            </div>
          </div>
        </section>

        {/* -- Process Steps -- */}
        <section className={styles.process}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <p className={styles.sectionSubtext}>
            Getting started is simple — here&apos;s what to expect.
          </p>
          <div className={styles.stepsGrid}>
            {processSteps.map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.num}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* -- Client Testimonials -- */}
        <section className={styles.testimonials}>
          <h2 className={styles.sectionTitle}>What our clients say</h2>
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

        {/* -- FAQ -- */}
        <section className={styles.faq}>
          <div className={styles.faqEyebrow}>Questions</div>
          <h2 className={styles.faqHeading}>Frequently asked</h2>
          <div className={styles.faqList}>
            {faqs && faqs.length > 0
              ? faqs.map((faq) => (
                  <div key={faq._id} className={styles.faqItem}>
                    <h4 className={styles.faqQuestion}>{faq.question}</h4>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </div>
                ))
              : (
                <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                  No FAQs yet.
                </div>
              )}
          </div>
        </section>

        {/* -- CTA Bar -- */}
        <section className={styles.cta}>
          <h2 className={styles.ctaHeading}>Ready to take the first step?</h2>
          <p className={styles.ctaSubtext}>
            Whether you&apos;re an individual or an organization — let&apos;s start with a conversation.
          </p>
          <div className={styles.ctaButtons}>
            <a href="#" className={styles.ctaBtnPink}>
              Book a free discovery call
            </a>
            <a href="#" className={styles.ctaBtnOutline}>
              Inquire about an organizational partnership
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
