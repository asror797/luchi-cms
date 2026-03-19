import { defineField, defineType } from "sanity";

export default defineType({
  name: "episode",
  title: "Podcast Episode",
  type: "document",
  icon: () => "🎙",
  fields: [
    defineField({
      name: "episodeNumber",
      title: "Episode Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g. 42 min)",
      type: "string",
    }),
    defineField({
      name: "guestName",
      title: "Guest Name (if any)",
      type: "string",
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "amazonMusicUrl",
      title: "Amazon Music URL",
      type: "url",
    }),
    defineField({
      name: "audioFile",
      title: "Audio File (MP3)",
      type: "file",
      options: { accept: "audio/*" },
      description: "Upload the episode MP3 file",
    }),
    defineField({
      name: "image",
      title: "Episode Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured (Latest Episode on Homepage)",
      type: "boolean",
      initialValue: false,
      description: "Only one episode should be featured at a time",
    }),
    defineField({
      name: "isStarterEpisode",
      title: "Starter Episode (Start Here section)",
      type: "boolean",
      initialValue: false,
      description: "Shows in 'Start Here' sections on Homepage and Listen page",
    }),
    defineField({
      name: "starterTag",
      title: "Starter Tag (e.g. 'Origin story', 'Gut health')",
      type: "string",
      description: "Only used if Starter Episode is checked — shows as tag on Listen page",
      hidden: ({ document }) => !document?.isStarterEpisode,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Episode Number (Newest first)",
      name: "episodeNumberDesc",
      by: [{ field: "episodeNumber", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "episodeNumber",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `Ep ${subtitle}: ${title}`,
        media,
      };
    },
  },
});
