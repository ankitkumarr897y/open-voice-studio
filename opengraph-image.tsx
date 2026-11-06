import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 64, background: "#07090E", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 28, color: "#22D3EE", letterSpacing: 4 }}>OPENVOICE STUDIO</div>
      <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, marginTop: 16 }}>100% Free AI Voice<br />Cloning &amp; TTS Studio</div>
      <div style={{ fontSize: 28, color: "#A855F7", marginTop: 20 }}>54 voices • Hindi + 23 languages • 5-second cloning • ₹0 forever</div>
    </div>,
    { ...size }
  );
}
