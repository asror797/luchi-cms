import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: () => "⚙️",
  groups: [
    { name: "hero", title: "Homepage Hero" },
    { name: "about", title: "About Page" },
    { name: "podcast", title: "Podcast Links" },
    { name: "social", title: "Social Links" },
    { name: "integrations", title: "Integrations" },
  ],
  fields: [
    // Homepage Hero
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow Text",
      type: "string",
      initialValue: "A safe space for survivors",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title (use *word* for italic pink)",
      type: "string",
      initialValue: "Your story deserves to be *heard.*",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      group: "hero",
    }),

    // About
    defineField({
      name: "hostName",
      title: "Host Display Name",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "hostTitle",
      title: "Host Title",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "hostBio",
      title: "Host Short Bio",
      type: "text",
      group: "about",
    }),
    defineField({
      name: "hostImage",
      title: "Host Photo",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),
    defineField({
      name: "missionQuote",
      title: "Mission Quote",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "missionBody",
      title: "Mission Body Text",
      type: "text",
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "About Page Body (paragraphs)",
      type: "array",
      of: [{ type: "block" }],
      group: "about",
    }),

    // Podcast Links
    defineField({
      name: "spotifyUrl",
      title: "Spotify Podcast URL",
      type: "url",
      group: "podcast",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Podcast URL",
      type: "url",
      group: "podcast",
    }),
    defineField({
      name: "amazonMusicUrl",
      title: "Amazon Music Podcast URL",
      type: "url",
      group: "podcast",
    }),

    // Social
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      group: "social",
    }),

    // Integrations
    defineField({
      name: "calendlyUrl",
      title: "Calendly Booking URL",
      type: "url",
      group: "integrations",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      group: "integrations",
    }),
    defineField({
      name: "substackUrl",
      title: "Substack URL",
      type: "url",
      group: "integrations",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
