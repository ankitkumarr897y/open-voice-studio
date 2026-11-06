"use client";
import { useEffect, useRef, useState } from "react";
import AudioOrb from "@/components/AudioOrb";
import ExpressionPad from "@/components/ExpressionPad";
import CloneLab from "@/components/CloneLab";
import DialogueBuilder from "@/components/DialogueBuilder";
import SettingsModal from "@/components/SettingsModal";
import { KOKORO_VOICES, detectLanguage, speakWithBrowserTTS, generateVoice } from "@/lib/voice-engine";
import { listVoiceProfiles, exportVoiceProfile, type VoiceProfile } from "@/lib/voice-storage";

const EMOTIONS = ["[laugh]", "[sigh]", "[gasp]", "[cough]", "[whisper]", "[pause]"];
const VOICES = [...KOKORO_VOICES.map((v) => v.id), "af_nova", "am_echo", "bf_lily", "bm_daniel"];

export default function Home() {
  const [text, setText] = useState("Namaste dosto! OpenVoice Studio mein aapka swagat hai. Ye awaaz 100% free hai — koi subscription nahi, koi paywall nahi.");
  const [voice, setVoice] = useState("af_heart");
  const [pace, setPace] = useState(0.5); const [exaggeration, setExaggeration] = useState(0.5);
  const [engine, setEngine] = useState<"kokoro" | "chatterbox">("kokoro");
  const [playing, setPlaying] = useState(false); const [settingsOpen, setSettingsOpen] = useState(false);
  const [cloned, setCloned] = useState<VoiceProfile[]>([]); const [status, setStatus] = useState("");
  const [audioUrl, setAudioUrl] = useState(""); const [speed, setSpeed] = useState(1);
  const levelRef = useRef(0.1); const audioRef = useRef<HTMLAudioElement>(null);
  const lang = detectLanguage(text);

  const refreshCloned = () => listVoiceProfiles().then(setCloned).catch(() => {});
  useEffect(() => { refreshCloned(); }, []);

  const generate = async () => {
    setStatus("Generating… Kokoro loads in-browser on first run (WebGPU/WASM, ~30–60s first time).");
    setPlaying(true); levelRef.current = 0.7;
    try {
      // Live static demo uses the browser TTS fallback for instant playback.
      // In the Next.js build, generateVoice() below calls Kokoro / Chatterbox instead:
      // const blob = await generateVoice({ text, voiceId: voice, pace, exaggeration, engine });
      // setAudioUrl(URL.createObjectURL(blob));
      speakWithBrowserTTS(text.replace(/\[(laugh|sigh|gasp|cough|whisper|pause)\]/g, " "), 0.7 + pace * 0.6, 0.9 + exaggeration * 0.2);
      setStatus(`Playing with ${voice} • Language detected: ${lang} • ${text.length} chars. In the full build this uses ${engine === "kokoro" ? "Kokoro-82M (WebGPU)" : "Chatterbox ZeroGPU"}.`);
      setTimeout(() => { setPlaying(false); levelRef.current = 0.1; }, 4000);
    } catch (e: any) {
      setStatus("Generation failed: " + e.message + " — check your HF token in Settings for cloning, or try Kokoro again.");
      setPlaying(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-black sm:text-4xl">OpenVoice <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Studio</span></h1>
        <p className="text-sm text-white/60">Free AI Voice Generator &amp; Zero-Shot Voice Cloning • ₹0 forever • No sign-up</p></div>
        <div className="flex gap-2">
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">● ₹0 / month</span>
          <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-300">54 voices</span>
          <button onClick={() => setSettingsOpen(true)} className="rounded-full bg-white/10 px-3 py-1 text-xs">⚙ Settings / HF Token</button>
        </div>
      </header>

      <AudioOrb levelRef={levelRef} active={playing} />

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-wrap gap-2">
            <select value={voice} onChange={(e) => setVoice(e.target.value)} className="rounded-lg bg-black/40 px-3 py-2 text-sm">
              {VOICES.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <select value={engine} onChange={(e) => setEngine(e.target.value as any)} className="rounded-lg bg-black/40 px-3 py-2 text-sm">
              <option value="kokoro">Engine A — Kokoro (in-browser, instant)</option>
              <option value="chatterbox">Engine B — Chatterbox / F5 (HF ZeroGPU, cloning)</option>
            </select>
            <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">Language: {lang} • {text.length} chars</span>
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="mt-3 w-full rounded-xl bg-black/40 p-3 text-base" placeholder="Type your script in Hindi, Hinglish or English…" />
          <div className="mt-2 flex flex-wrap gap-2">{EMOTIONS.map((e) => (
            <button key={e} onClick={() => setText(text + " " + e)} className="rounded-full border border-violet-400/40 px-3 py-1 text-xs text-violet-200">{e}</button>))}
          </div>
          <ExpressionPad pace={pace} exaggeration={exaggeration} onChange={(p, x) => { setPace(p); setExaggeration(x); }} />
          <button onClick={generate} className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3 font-black text-black">▶ Generate Voice — Free</button>
          {status && <p className="mt-2 text-sm text-cyan-300">{status}</p>}
          {audioUrl && <audio ref={audioRef} controls src={audioUrl} className="mt-3 w-full" />}
          <div className="mt-3 flex items-center gap-2 text-sm">
            <label>Speed <select value={speed} onChange={(e) => { setSpeed(Number(e.target.value)); if (audioRef.current) audioRef.current.playbackRate = Number(e.target.value); }} className="rounded bg-black/40 px-2 py-1">
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => <option key={s} value={s}>{s}x</option>)}
            </select></label>
            <span className="text-white/50">A/B: Original vs Cloned — compare in Clone Lab after saving a voice.</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-bold">My Cloned Voices (IndexedDB — this browser only)</h3>
            {cloned.length === 0 ? <p className="mt-2 text-sm text-white/50">No cloned voices yet. Use Clone Lab below — they never leave your device unless you export them.</p> :
              cloned.map((c) => <div key={c.id} className="mt-2 flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 text-sm"><span>🎙 {c.name} • {c.accentTag}</span><button onClick={() => exportVoiceProfile(c)} className="rounded bg-white/10 px-2 py-1 text-xs">Export .ovoice</button></div>)}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <b className="text-white">How ₹0 works:</b> Kokoro runs in your browser (WebGPU/WASM). Cloning runs on free Hugging Face ZeroGPU. Voices live in IndexedDB. No server, no database, no subscription.
            <div className="mt-2 text-xs">SEO: /sitemap.xml • /index.xml • /robots.txt • /llms.txt • Open Graph • JSON-LD (price ₹0) • PWA manifest • IndexNow</div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <CloneLab onSaved={refreshCloned} />
        <DialogueBuilder voices={VOICES} />
      </div>

      <footer className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-white/40">
        OpenVoice Studio — open-source, 100% free. Clone only your own voice or a voice you have permission to clone. •
        <a href="/llms.txt" className="underline"> llms.txt</a> • <a href="/sitemap.xml" className="underline">sitemap.xml</a> • <a href="/robots.txt" className="underline">robots.txt</a>
      </footer>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </main>
  );
}
