"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_ID, trackEvent } from "@/lib/analytics";

/**
 * Loads Google Analytics 4 when NEXT_PUBLIC_GA_ID is set (renders nothing otherwise),
 * and reports contact clicks — phone, WhatsApp, SMS, email — as `contact_click` events
 * so calls and chats can be counted as leads alongside form submissions.
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href") ?? "";
      const method = href.startsWith("tel:")
        ? "phone"
        : href.includes("wa.me")
          ? "whatsapp"
          : href.startsWith("sms:")
            ? "sms"
            : href.startsWith("mailto:")
              ? "email"
              : null;
      if (method) trackEvent("contact_click", { method, page: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
