# OpenVoice Studio — STATIC version (index.html wala)

Ye wala ZIP seedha chalega — isme `index.html` root me hai, koi build / npm install nahi chahiye.

## Files
- `index.html` — poora Studio (orb, script editor, emotion pills, Expression Pad, Clone Lab, Dialogue, Settings)
- `sitemap.xml`, `index.xml`, `robots.txt`, `llms.txt`, `manifest.webmanifest`

## GitHub + Vercel (2 minute)
1. github.com → New repo `openvoice-studio` → Public → .gitignore: **None** → Create
2. Repo → Add file → Upload files → is folder ke **andar ki files** upload karo (index.html root me aani chahiye, folder ke andar folder nahi)
3. vercel.com → Add New Project → repo Import → Framework Preset: **Other** → Build Command: **khali chhodo** → Deploy

## Local test (bina deploy)
ZIP unzip karo → `index.html` par double-click karo → browser me khul jayega. Mic ke liye localhost/https chahiye hota hai, isliye mic test Vercel link par karna.

## Limits (saaf-saaf)
- Is static version me Instant engine device speech hai (browser ki awaaz). Asli Kokoro WebGPU + Chatterbox sirf Next.js ZIP (`openvoice-studio.zip`) me hai.
- Device speech ko WAV download nahi kar sakte. HF Engine B se aaya audio download hota hai.
- `your-domain.com` ki jagah apna real domain sitemap/robots/llms.txt me badlo.
