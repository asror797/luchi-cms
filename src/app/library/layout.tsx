import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breastie Library",
  description:
    "Your resource hub — articles, free downloads, and wellness guides for breast cancer survivors.",
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
