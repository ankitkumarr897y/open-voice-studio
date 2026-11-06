import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OpenVoice Studio — Free AI Voice Generator & Voice Cloning",
    short_name: "OpenVoice",
    description: "100% free AI text-to-speech & 5-second voice cloning studio.",
    start_url: "/", display: "standalone", background_color: "#07090E", theme_color: "#07090E",
    icons: [{ src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
