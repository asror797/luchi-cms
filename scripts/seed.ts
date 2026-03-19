import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function seed() {
  console.log("🌱 Seeding Sanity data...\n");

  // ── Site Settings ──
  console.log("⚙️  Creating Site Settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    heroEyebrow: "A safe space for survivors",
    heroTitle: "Your story deserves to be *heard.*",
    heroSubtitle:
      "Diary of a Breastie amplifies the voices of breast cancer survivors through honest conversations, wellness education, and community.",
    hostName: "Your Host",
    hostTitle: "Podcast Host · Gut Health Coach · Breastie",
    hostBio:
      "Faith-driven wellness entrepreneur, storyteller, and gut health coach on a mission to amplify the voices of breast cancer survivors everywhere.",
    missionQuote: '"Real stories. Real strength."',
    missionBody:
      "Diary of a Breastie exists to make sure no survivor has to navigate her journey in silence. Through honest storytelling, wellness education, and a community built on faith and resilience — we're here for every chapter of the journey.",
    contactEmail: "hello@diaryofabreastie.com",
  });

  // ── Episodes ──
  console.log("🎙  Creating Episodes...");

  const episodes = [
    {
      _id: "episode-01",
      episodeNumber: 1,
      title: "Why I started this podcast",
      description: "The story behind the mic — why this platform exists and who it's for.",
      duration: "35 min",
      isFeatured: false,
      isStarterEpisode: true,
      starterTag: "Origin story",
    },
    {
      _id: "episode-08",
      episodeNumber: 8,
      title: "What chemo does to your gut — and how to heal",
      description: "A deep dive into post-treatment gut health.",
      duration: "44 min",
      isFeatured: false,
      isStarterEpisode: true,
      starterTag: "Gut health",
    },
    {
      _id: "episode-14",
      episodeNumber: 14,
      title: "Gut health & your immune system after chemo",
      description: "A functional nutritionist shares what actually helps your gut heal after chemotherapy.",
      duration: "48 min",
      isFeatured: false,
      isStarterEpisode: true,
      starterTag: "Community",
    },
    {
      _id: "episode-25",
      episodeNumber: 25,
      title: "Faith, fear & the waiting room",
      description: "How faith carried three survivors through their darkest moments.",
      duration: "51 min",
      isFeatured: false,
      isStarterEpisode: false,
    },
    {
      _id: "episode-26",
      episodeNumber: 26,
      title: "Hormones, hair loss & healing",
      description: "The hormonal aftermath of breast cancer treatment nobody talks about.",
      duration: "38 min",
      isFeatured: false,
      isStarterEpisode: false,
    },
    {
      _id: "episode-27",
      episodeNumber: 27,
      title: "Finding joy after treatment",
      description:
        "A conversation about reclaiming your body and your life post-chemo — with special guest Dr. Renee Collins.",
      duration: "42 min",
      guestName: "Dr. Renee Collins",
      isFeatured: true,
      isStarterEpisode: false,
    },
  ];

  for (const ep of episodes) {
    await client.createOrReplace({
      ...ep,
      _type: "episode",
    } as Parameters<typeof client.createOrReplace>[0]);
  }

  // ── Wellness Programs ──
  console.log("🌿 Creating Wellness Programs...");

  const programs = [
    {
      _id: "program-survivor",
      title: "Survivor Gut Health Coaching",
      description:
        "Cancer treatment takes a serious toll on your gut microbiome. This program is designed specifically for breast cancer survivors ready to rebuild their digestive health, restore energy, and feel at home in their bodies again.",
      tag: "For breast cancer survivors",
      tagStyle: "pink",
      isFeatured: true,
      includesLabel: "What's included",
      includes: [
        "1:1 personalized coaching sessions",
        "Survivor-specific gut health protocol",
        "Anti-inflammatory nutrition guidance",
        "Lifestyle & movement recommendations",
        "Ongoing support between sessions",
      ],
      ctaText: "Apply now →",
      ctaStyle: "pink",
      order: 1,
    },
    {
      _id: "program-women",
      title: "Women's Wellness Gut Health Program",
      description:
        "You don't have to be a cancer survivor to deserve to feel well. This program is for any woman tired of bloating, fatigue, and hormonal imbalance — ready to get to the root cause and reclaim her energy.",
      tag: "For all women",
      tagStyle: "neutral",
      isFeatured: false,
      includesLabel: "What's included",
      includes: [
        "1:1 personalized coaching sessions",
        "Root-cause gut health assessment",
        "Hormone & digestion support plan",
        "Nutrition & lifestyle roadmap",
        "Ongoing support between sessions",
      ],
      ctaText: "Apply now →",
      ctaStyle: "outline",
      order: 2,
    },
    {
      _id: "program-org",
      title: "Organizational Wellness Partnership",
      description:
        "Bringing gut health education and coaching to the communities you serve — cancer support organizations, women's health nonprofits, churches, and corporate wellness programs. Every partnership is custom-built.",
      tag: "For nonprofits & organizations",
      tagStyle: "teal",
      isFeatured: false,
      includesLabel: "This can include",
      includes: [
        "Group gut health workshops & seminars",
        "Subsidized 1:1 coaching for members",
        "Educational content & resource creation",
        "Ongoing community wellness support",
        "Custom partnership pricing",
      ],
      ctaText: "Inquire about a partnership →",
      ctaStyle: "teal",
      order: 3,
    },
  ];

  for (const prog of programs) {
    await client.createOrReplace({
      ...prog,
      _type: "wellnessProgram",
    });
  }

  // ── Testimonials ──
  console.log("💬 Creating Testimonials...");

  const testimonials = [
    // Homepage
    {
      _id: "testi-homepage-1",
      quote: "This podcast made me feel seen for the first time since my diagnosis. I cried, laughed, and healed.",
      name: "— Monica T., survivor",
      page: "homepage",
    },
    {
      _id: "testi-homepage-2",
      quote: "The gut health coaching changed everything. I finally feel like myself again after treatment.",
      name: "— Jasmine R., coaching client",
      page: "homepage",
    },
    {
      _id: "testi-homepage-3",
      quote: "Every episode feels like a conversation with a friend who truly gets it. This community is everything.",
      name: "— Danielle W., listener",
      page: "homepage",
    },
    // Newsletter
    {
      _id: "testi-newsletter-1",
      quote:
        "This newsletter is the first thing I open every week. It feels like a letter from a friend who actually gets it.",
      name: "— Keisha B.",
      page: "newsletter",
    },
    {
      _id: "testi-newsletter-2",
      quote:
        "I've learned more about healing my gut from this newsletter than from any of my doctors. Practical and real.",
      name: "— Patricia W.",
      page: "newsletter",
    },
    {
      _id: "testi-newsletter-3",
      quote:
        "The community spotlight segment makes me feel like I'm not alone. Every survivor should be reading this.",
      name: "— Sandra O.",
      page: "newsletter",
    },
    // Programs
    {
      _id: "testi-programs-1",
      quote:
        "I finally feel like myself again. After chemo destroyed my gut, this program gave me my life back.",
      name: "— Jasmine R., survivor",
      page: "programs",
    },
    {
      _id: "testi-programs-2",
      quote:
        "I'd been bloated and exhausted for years. Within 6 weeks of coaching I felt a shift I hadn't experienced in a decade.",
      name: "— Tanya M., wellness client",
      page: "programs",
    },
    {
      _id: "testi-programs-3",
      quote:
        "She brought a workshop to our support group and it was the most engaged our members have ever been. Powerful and practical.",
      name: "— Director, breast cancer nonprofit",
      page: "programs",
    },
  ];

  for (const t of testimonials) {
    await client.createOrReplace({
      ...t,
      _type: "testimonial",
    });
  }

  // ── Library Articles ──
  console.log("📚 Creating Library Articles...");

  const articles = [
    {
      _id: "article-gut-guide",
      title: "The Survivor's Guide to Gut Health After Chemo",
      description:
        "What cancer treatment really does to your microbiome — and the steps to start rebuilding from the inside out.",
      category: "gut",
    },
    {
      _id: "article-scanxiety",
      title: "What is Scanxiety — and How Do You Actually Manage It?",
      description:
        "The anxiety that comes with follow-up scans is real, valid, and incredibly common. Here's how survivors cope.",
      category: "mental",
    },
    {
      _id: "article-25-essentials",
      title: "25 Essentials Every Breast Cancer Survivor Should Know",
      description:
        "The things nobody tells you at discharge — practical wisdom for navigating life on the other side of treatment.",
      category: "survival",
    },
    {
      _id: "article-faith",
      title: "Why I Chose Faith Over Fear — and What That Looked Like in Practice",
      description:
        "A personal reflection on anchoring your healing in something bigger than yourself when the road gets hard.",
      category: "faith",
    },
    {
      _id: "article-movement",
      title: "Movement as Medicine — Joyful Fitness for Breast Cancer Survivors",
      description:
        "How to reclaim movement without guilt, fear, or pushing too hard on a body that has been through so much.",
      category: "movement",
    },
    {
      _id: "article-food",
      title: "Rebuilding Your Relationship With Food After Chemo",
      description:
        "Compassionate, practical guidance on nourishing your body through recovery — without the diet culture noise.",
      category: "nutrition",
    },
  ];

  for (const a of articles) {
    await client.createOrReplace({
      ...a,
      _type: "libraryItem",
    });
  }

  // ── Downloads ──
  console.log("📄 Creating Downloads...");

  const downloads = [
    {
      _id: "download-25-essentials",
      title: "25 Essentials for Breast Cancer Awareness",
      description: "A comprehensive guide every survivor, patient, and caregiver should have in hand.",
      order: 1,
    },
    {
      _id: "download-starter-guide",
      title: "Breastie Wellness Starter Guide",
      description: "A beginner's roadmap to gut health, movement, and mindset after treatment.",
      order: 2,
    },
    {
      _id: "download-gut-reset",
      title: "5-Day Gut Reset for Survivors",
      description: "A gentle 5-day protocol to begin healing your gut microbiome after cancer treatment.",
      order: 3,
    },
  ];

  for (const d of downloads) {
    await client.createOrReplace({
      ...d,
      _type: "download",
    });
  }

  // ── Newsletter Issues ──
  console.log("📬 Creating Newsletter Issues...");

  const issues = [
    {
      _id: "issue-march-2026",
      title: "5 signs your gut needs attention after chemo",
      date: "March 2026",
      preview:
        "Your gut microbiome takes a serious hit during cancer treatment. Here are the signs most survivors miss — and what to do about them.",
    },
    {
      _id: "issue-feb-2026",
      title: "Finding joy in your body again — a survivor's journey to joyful movement",
      date: "February 2026",
      preview:
        "Movement doesn't have to look like a workout. This issue explores how survivors are reclaiming their bodies on their own terms.",
    },
    {
      _id: "issue-jan-2026",
      title: "Why I chose faith over fear — and what it looked like in practice",
      date: "January 2026",
      preview:
        "A personal reflection on anchoring your healing in something bigger than yourself — and the practical ways faith shows up daily.",
    },
  ];

  for (const i of issues) {
    await client.createOrReplace({
      ...i,
      _type: "newsletterIssue",
    });
  }

  // ── FAQ Items ──
  console.log("❓ Creating FAQ Items...");

  const faqs = [
    {
      _id: "faq-1",
      question: "Do I need to be a breast cancer survivor to work with you?",
      answer:
        "Not at all. The survivor track is designed for those who've gone through breast cancer treatment, but the women's wellness program is open to any woman ready to heal her gut.",
      order: 1,
    },
    {
      _id: "faq-2",
      question: "How long is the coaching program?",
      answer:
        "Programs are typically 3 or 6 months. Pricing is discussed on the discovery call — not posted publicly, so we can find the right fit for you.",
      order: 2,
    },
    {
      _id: "faq-3",
      question: "What does an organizational partnership look like?",
      answer:
        "Every partnership is custom-built — a one-time workshop, a recurring group program, subsidized 1:1 sessions, or a combination. We'll design it together based on your community's needs and budget.",
      order: 3,
    },
    {
      _id: "faq-4",
      question: "What if I'm still in active treatment?",
      answer:
        "We can discuss your specific situation on the discovery call. In some cases, we can begin gentle foundational work even during treatment.",
      order: 4,
    },
  ];

  for (const f of faqs) {
    await client.createOrReplace({
      ...f,
      _type: "faqItem",
    });
  }

  // ── Team Member ──
  console.log("👤 Creating Team Member...");
  await client.createOrReplace({
    _id: "team-host",
    _type: "teamMember",
    name: "Your Host",
    role: "Podcast Host · Gut Health Coach · Breastie",
    bio: "Faith-driven wellness entrepreneur, storyteller, and gut health coach on a mission to amplify the voices of breast cancer survivors everywhere.",
  });

  console.log("\n✅ Seed complete! All data created successfully.");
  console.log("   Open http://localhost:3000/studio to see your content.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
