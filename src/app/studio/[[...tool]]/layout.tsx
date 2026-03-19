export const metadata = {
  title: "Diary of a Breastie — CMS Studio",
  description: "Content management for Diary of a Breastie",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
}
