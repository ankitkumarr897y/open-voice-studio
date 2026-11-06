import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpenVoice Studio — Free AI Voice Generator & Zero-Shot Voice Cloning",
    template: "%s | OpenVoice Studio",
  },
  description:
    "100% free AI text-to-speech & 5-second voice cloning. 54 Kokoro voices in-browser, Chatterbox + F5-TTS cloning on free Hugging Face ZeroGPU. Hindi, Hinglish, English & 23+ languages. No subscription, no paywall.",
  keywords: [
    "free ai voice generator", "free text to speech", "voice cloning free",
    "zero shot voice cloning", "hindi tts", "hinglish tts", "kokoro tts",
    "chatterbox tts", "f5 tts", "ai voice studio", "free elevenlabs alternative",
  ],
  authors: [{ name: "OpenVoice Studio" }],
  creator: "OpenVoice Studio",
  publisher: "OpenVoice Studio",
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: SITE_URL },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION },
  },
  openGraph: {
    title: "OpenVoice Studio — 100% Free AI Voice Cloning & TTS Studio",
    description: "Clone any voice in 5 seconds. 54 free voices, Hindi + 23 languages, zero subscription.",
    url: SITE_URL,
    siteName: "OpenVoice Studio",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "OpenVoice Studio — 100% Free AI Voice Cloning & TTS Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenVoice Studio — 100% Free AI Voice Cloning & TTS Studio",
    description: "Clone any voice in 5 seconds. 54 free voices, Hindi + 23 languages, zero subscription.",
    images: ["/opengraph-image"],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = { themeColor: "#07090E", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "OpenVoice Studio",
      url: SITE_URL,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and WebGPU/WASM support",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      isAccessibleForFree: true,
    },
    {
      "@type": "SoftwareApplication",
      name: "OpenVoice Studio",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is OpenVoice Studio really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. Kokoro TTS runs in your browser at zero server cost, and cloning uses free Hugging Face ZeroGPU. There is no subscription or paywall." } },
        { "@type": "Question", name: "How long a voice sample do I need to clone a voice?", acceptedAnswer: { "@type": "Answer", text: "5 to 30 seconds of clear audio is enough for zero-shot cloning with Chatterbox or F5-TTS." } },
        { "@type": "Question", name: "Does it support Hindi TTS?", acceptedAnswer: { "@type": "Answer", text: "Yes — Hindi, Hinglish, English and 23+ languages are supported via Chatterbox Multilingual and Kokoro voices." } },
        { "@type": "Question", name: "Where is my cloned voice stored?", acceptedAnswer: { "@type": "Answer", text: "Only in your browser's IndexedDB. Nothing is uploaded to a paid cloud database. You can export it as a .ovoice bundle." } },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="llms-txt" href="/llms.txt" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-[#07090E] text-white antialiased">{children}</body>
    </html>
  );
}
