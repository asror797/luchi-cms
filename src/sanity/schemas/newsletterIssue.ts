import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsletterIssue",
  title: "Newsletter Issue",
  type: "document",
  icon: () => "📬",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Issue Date (e.g. March 2026)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "preview",
      title: "Preview Text",
      type: "text",
    }),
    defineField({
      name: "link",
      title: "Link to Full Issue",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
    },
  },
});
