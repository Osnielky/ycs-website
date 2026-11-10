import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: undefined },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning: browser extensions inject attributes on <body> before hydration */}
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
