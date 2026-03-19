import { groq } from "next-sanity";

// Site Settings
export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]`;

// Episodes
export const ALL_EPISODES_QUERY = groq`*[_type == "episode"] | order(episodeNumber desc)`;
export const FEATURED_EPISODE_QUERY = groq`*[_type == "episode" && isFeatured == true][0]{
  ...,
  "audioUrl": audioFile.asset->url
}`;
export const STARTER_EPISODES_QUERY = groq`*[_type == "episode" && isStarterEpisode == true] | order(episodeNumber asc)`;

// Wellness Programs
export const ALL_WELLNESS_PROGRAMS_QUERY = groq`*[_type == "wellnessProgram"] | order(order asc)`;

// Library
export const ALL_LIBRARY_ITEMS_QUERY = groq`*[_type == "libraryItem"]`;
export const ALL_DOWNLOADS_QUERY = groq`*[_type == "download"] | order(order asc)`;

// Testimonials (by page)
export const HOMEPAGE_TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && page == "homepage"]`;
export const NEWSLETTER_TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && page == "newsletter"]`;
export const PROGRAMS_TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && page == "programs"]`;

// Newsletter Issues
export const ALL_NEWSLETTER_ISSUES_QUERY = groq`*[_type == "newsletterIssue"] | order(_createdAt desc)`;

// FAQ
export const ALL_FAQ_ITEMS_QUERY = groq`*[_type == "faqItem"] | order(order asc)`;

// Team
export const ALL_TEAM_MEMBERS_QUERY = groq`*[_type == "teamMember"]`;
