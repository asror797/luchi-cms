import { defineField, defineType } from "sanity";

export default defineType({
  name: "wellnessProgram",
  title: "Wellness Program Track",
  type: "document",
  icon: () => "🌿",
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
      name: "tag",
      title: "Tag Label (e.g. For breast cancer survivors)",
      type: "string",
    }),
    defineField({
      name: "tagStyle",
      title: "Tag Style",
      type: "string",
      options: {
        list: [
          { title: "Pink (Survivors)", value: "pink" },
          { title: "Neutral (All Women)", value: "neutral" },
          { title: "Teal (Organizations)", value: "teal" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured (pink background)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "includesLabel",
      title: "Includes Section Label (e.g. What's included)",
      type: "string",
      initialValue: "What's included",
    }),
    defineField({
      name: "includes",
      title: "What's Included (list items)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaStyle",
      title: "CTA Button Style",
      type: "string",
      options: {
        list: [
          { title: "Pink", value: "pink" },
          { title: "Outline", value: "outline" },
          { title: "Teal", value: "teal" },
        ],
      },
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tag",
    },
  },
});
