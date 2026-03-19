import { defineField, defineType } from "sanity";

export default defineType({
  name: "libraryItem",
  title: "Library Article",
  type: "document",
  icon: () => "📚",
  fields: [
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Gut health", value: "gut" },
          { title: "Survivorship", value: "survival" },
          { title: "Faith & purpose", value: "faith" },
          { title: "Nutrition", value: "nutrition" },
          { title: "Movement", value: "movement" },
          { title: "Mental wellness", value: "mental" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "externalLink",
      title: "Article Link (Substack URL)",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});
