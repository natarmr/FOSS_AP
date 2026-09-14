# FOSS SRMAP

The promotional website for **FOSS SRMAP** — the free and open source community at SRM University AP. A deliberately brain-rotted teaser site: a parental-advisory gate, a background soundtrack, a counting "time you've wasted" timer, and a `/poap` (Proof of Attendance Protocol) easter egg.

🔗 **Repo:** https://github.com/natarmr/FOSS_AP
🔗 **FOSS United:** https://fossunited.org/c/srm-university-ap
🔗 **Links:** [LinkedIn](https://www.linkedin.com/company/foss-srmap/) · [Instagram](https://www.instagram.com/foss.srmap/) · [Discord](https://discord.com/invite/Q5Zeg5Wx7d)

---

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**
- `next/font` (Geist Sans)

> ⚠️ Next.js 16 has breaking changes vs older versions. See `AGENTS.md` and check `node_modules/next/dist/docs/` before writing framework code.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3001  (binds 0.0.0.0:3001)
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
app/
  layout.tsx          # root layout — SEO metadata + viewport
  page.tsx            # home / teaser (client component) + remix version switcher
  home-versions.ts    # ⭐ registry of home-screen remix versions (edit to add yours)
  speakers/page.tsx   # speakers — coming soon
  sponsors/page.tsx   # sponsors — coming soon
  partners/page.tsx   # partners — coming soon
  _shared/            # shared building blocks (coming-soon.tsx) — not routed
  poap/page.tsx       # "POAP?" troll + contribute page (renamed from /chips)
  globals.css         # Tailwind import + theme tokens + scribble animation
  favicon.ico         # icons, generated from public/assets/foss-logo.png …
  icon.png            #   … (favicon.ico + icon.png + apple-icon.png are
  apple-icon.png      #   auto-wired by Next's metadata file conventions)
  opengraph-image.png # social share cards (1200×630)
  twitter-image.png
public/assets/        # logos, hero videos, soundtracks, images
next.config.ts        # poweredByHeader: false
```

---

## 🎬 Remix the home screen (contributor guide)

The home screen background **video + soundtrack** is community-remixable. By default every visitor sees the **original** (`FOSS SRMAP (OG)`); a switcher on the **bottom-left** lets them play other contributors' versions. **We merge at most 10 remixes** (`MAX_VERSIONS`), so make yours count.

**How the system works (and why it stays fast):** all versions live in [`app/home-versions.ts`](app/home-versions.ts). Only the **one active** `<video>` and `<audio>` is ever mounted — switching just swaps the source, so the page never decodes 10 videos at once and won't lag or crash no matter how many versions are registered. The switcher list is plain text (no video previews), so opening it loads nothing heavy.

**To add your version:**

1. **Add your media** to `public/assets/`, named after your GitHub handle:
   ```
   home-<your-handle>-video.mp4     # muted, looping background video
   home-<your-handle>-audio.mp3     # looping soundtrack
   ```
2. **Register it** — append **one** entry to the `HOME_VERSIONS` array in `app/home-versions.ts` (keep `FOSS SRMAP (OG)` first; never reorder or edit existing entries):
   ```ts
   {
     id: "your-slug",          // stable kebab-case; never change it later
     name: "Your Version",     // short label shown in the switcher
     author: "@your-handle",   // your credit
     video: "/assets/home-your-handle-video.mp4",
     audio: "/assets/home-your-handle-audio.mp3",
   },
   ```
3. **Stay on theme & keep it light:** full-bleed muted background video + looping track, on-brand (brain-rot welcome, gold `#f0a010` accents). Keep **each file ≲ 3 MB** (H.264 mp4 + mp3) — big files slow the first paint for *everyone*. Loop cleanly with no hard cut.
4. **Verify before the PR:**
   ```bash
   npx tsc --noEmit && npm run lint && npm run build
   ```
   Then open a PR titled `remix: <your version name>` and mention it in the description. That's it — no need to touch `page.tsx`.

---

## Brand guidelines

### Name & tagline
- **Community:** **FOSS SRMAP** — Free and Open Source Software at SRM University AP.
- **Repo:** `FOSS_AP` on GitHub.
- **Tagline:** *The free and open source community at SRM University AP.*

### Colors
| Role | Hex | Usage |
|------|-----|-------|
| Gold (primary accent) | `#f0a010` | CTAs, links, eyebrows, highlights |
| Gold — hover | `#ffb733` | hover state on gold buttons/links |
| Black | `#000000` | primary background, theme-color |
| Near-black | `#0a0a0a` | OG image / dark surfaces |
| White | `#ffffff` | text on dark; `/poap` background |
| Ink | `#171717` | body text on light surfaces |

### Typography
- **Geist Sans** via `next/font` (CSS var `--font-sans`); fallback `Arial`.
- **Eyebrows / labels:** uppercase, wide letter-spacing (e.g. `tracking-[0.35em]`).

### Logo & assets (`public/assets/`)
- `foss-logo.png` — primary mark/wordmark (favicon / icon source — keep it, object-contain, never stretch).
- `banner.png` — hero banner (object-contain, max-h constrained).
- `chips-3.png` — collectible POAP packet placeholder (re-skin later as POAP badge).
- `coming-soon.png` — "coming soon" lockup.
- `parental-advisory.jpg` — the Explicit-Content gate label.
- **Home-screen remix media** (registered in `app/home-versions.ts`):
  - `laura_video.mp4` + `final-audio.mp3` — **`FOSS SRMAP (OG)`**, the default hero.
  - `faah.mp3` — the "faah" entry SFX fired when you click through the gate (not a version).
  - New remixes follow `home-<handle>-video.mp4` / `home-<handle>-audio.mp3` — see **Remix the home screen** above.

### Voice & tone
Irreverent, meme-y, "brain-rot" humour. Profanity and edgy jokes are on-brand — there is literally a parental-advisory gate. Playful, self-aware, slightly unhinged. **Never corporate.**

---

## Contributing

PRs welcome — fork, branch, open a PR. There's a **surprise gift for contributors on event day** 😉

Before submitting, make sure both pass:

```bash
npx tsc --noEmit
npm run lint
```

## SEO / deployment notes
- Set `NEXT_PUBLIC_SITE_URL` to the production domain so Open Graph / canonical URLs resolve absolutely (defaults to `https://fossunited.org/c/srm-university-ap`).
- Icons, Open Graph and Twitter images are wired via Next's metadata **file conventions** in `app/` — no manual `<link>`/`<meta>` tags required.
