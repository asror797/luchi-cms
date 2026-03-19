import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: () => "💬",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name (e.g. — Monica T., survivor)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "page",
      title: "Show on Page",
      type: "string",
      options: {
        list: [
          { title: "Homepage", value: "homepage" },
          { title: "Newsletter", value: "newsletter" },
          { title: "Wellness Programs", value: "programs" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "page",
    },
  },
});
