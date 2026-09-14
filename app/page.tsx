"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  HOME_VERSIONS,
  DEFAULT_VERSION_ID,
  getVersion,
  type HomeVersion,
} from "./home-versions";

const GOLD = "#f0a010";

const TRANSITION_MS = 4200;

type Phase = "splash" | "leaving" | "home";

function TimeWasted({ since }: { since: number | null }) {
  const [ms, setMs] = useState(0);

  useEffect(() => {
    if (since == null) return;
    const tick = () => setMs(Date.now() - since);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [since]);

  const t = Math.max(0, Math.floor(ms / 1000));
  const units = [
    { label: "Days", value: Math.floor(t / 86400) },
    { label: "Hours", value: Math.floor((t % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((t % 3600) / 60) },
    { label: "Seconds", value: t % 60 },
  ];

  return (
    <div suppressHydrationWarning className="flex flex-col items-center gap-2">
      <p className="text-[7px] uppercase tracking-[0.3em] text-white/45 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
        time you&apos;ve wasted here
      </p>
      <div suppressHydrationWarning className="flex flex-wrap justify-center gap-1.5 md:gap-2">
        {units.map(({ label, value }) => (
          <div
            key={label}
            suppressHydrationWarning className="flex min-w-[52px] flex-col items-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md"
          >
            <span className="text-xl font-bold tabular-nums drop-shadow md:text-2xl">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-0.5 text-[8px] uppercase tracking-widest text-white/50">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4z" />
      {muted ? (
        <>
          <path d="m22 9-6 6" />
          <path d="m16 9 6 6" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      )}
    </svg>
  );
}

// POAP Easter egg — bait label pointing at packet, links to /poap
function PoapBait() {
  return (
    <Link
      href="/poap"
      aria-label="POAP?"
      className="group animate-fade-in fixed right-4 top-4 z-[9999] flex items-center gap-2"
    >
      <span className="relative whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-medium italic text-neutral-900 backdrop-blur-sm md:text-sm">
        Free POAP?
        <svg
          viewBox="0 0 180 12"
          preserveAspectRatio="none"
          className="absolute -bottom-1 left-3 h-2 w-[88%]"
          aria-hidden="true"
        >
          <path
            d="M2 7 C 30 2, 52 11, 84 5 S 150 2, 178 8"
            fill="none"
            stroke={GOLD}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-scribble"
          />
        </svg>
      </span>
      <Image
        src="/assets/chips-3.png"
        alt="FOSS SRMAP POAP — collectible"
        width={496}
        height={503}
        className="h-20 w-auto object-contain transition-transform group-hover:-rotate-6 group-hover:scale-105"
      />
    </Link>
  );
}

function SiteAudio({
  phase,
  onEnter,
  activeVersion,
}: {
  phase: Phase;
  onEnter: () => void;
  activeVersion: HomeVersion;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const faahRef = useRef<HTMLAudioElement>(null);
  const [audible, setAudible] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    const sync = () =>
      setAudible(!audio.paused && !audio.muted && audio.volume > 0);
    const evs = ["play", "playing", "pause", "volumechange", "ended"];
    evs.forEach((e) => audio.addEventListener(e, sync));
    return () => evs.forEach((e) => audio.removeEventListener(e, sync));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !startedRef.current) return;
    audio.load();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [activeVersion.audio]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const audibleNow = !audio.paused && !audio.muted && audio.volume > 0;
    if (audibleNow) {
      audio.muted = true;
    } else {
      audio.muted = false;
      if (audio.volume === 0) audio.volume = 0.6;
      audio.play().catch(() => {});
    }
  };

  const handleSplashClick = () => {
    startedRef.current = true;
    const faah = faahRef.current;
    if (faah) {
      faah.currentTime = 0;
      faah.volume = 0.85;
      faah.play().catch(() => {});
    }
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.muted = false;
      audio.volume = 0;
      audio.play().catch(() => {});
      const id = window.setInterval(() => {
        const next = Math.min(0.6, audio.volume + 0.6 / 80);
        audio.volume = next;
        if (next >= 0.6) window.clearInterval(id);
      }, 50);
    }
    onEnter();
  };

  const leaving = phase === "leaving";

  return (
    <>
      <audio ref={audioRef} src={activeVersion.audio} loop preload="auto" />
      <audio ref={faahRef} src="/assets/faah.mp3" preload="auto" />

      {phase !== "home" && (
        <div
          suppressHydrationWarning className={`fixed inset-0 z-[10000] flex select-none flex-col items-center justify-center overflow-hidden bg-black px-6 text-center transition-opacity duration-[4000ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            leaving ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {/* foss mark, top-left corner — object-contain to avoid stretch */}
          <Image
            src="/assets/foss-logo.png"
            alt="FOSS SRMAP"
            width={800}
            height={800}
            priority
            className="absolute left-5 top-5 h-12 w-12 object-contain opacity-90 md:h-14 md:w-14"
          />

          <div
            suppressHydrationWarning className={`relative z-10 mx-auto flex max-w-md flex-col items-center gap-7 transition-opacity duration-500 ease-out ${
              leaving ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src="/assets/parental-advisory.jpg"
              alt="Parental Advisory — Explicit Content"
              width={2048}
              height={1536}
              priority
              className="w-60 max-w-full md:w-72"
            />

            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              The content you are about to witness is highly brain&#8209;rotted.
              Viewer discretion is advised.
            </p>

            <button
              onClick={handleSplashClick}
              className="group relative mt-1 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#f0a010] px-5 py-2.5 text-sm font-semibold tracking-wide text-black shadow-lg shadow-[#f0a010]/30 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-[#ffb733] hover:shadow-xl hover:shadow-[#f0a010]/50 active:translate-y-0 active:scale-95 md:px-6 md:py-3 md:text-base"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]" />
              <span className="relative z-10">Okay, hasta la vista, skibidis</span>
              <span className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      )}

      {phase === "home" && (
        <>
          <PoapBait />
          <button
            onClick={toggle}
            data-music-btn
            aria-label={audible ? "Mute music" : "Unmute music"}
            className="animate-fade-in fixed bottom-5 right-5 z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-md transition-all hover:bg-white/20"
          >
            <SpeakerIcon muted={!audible} />
          </button>
        </>
      )}
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function VersionSwitcher({
  versions,
  activeId,
  onSelect,
}: {
  versions: HomeVersion[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = versions.find((v) => v.id === activeId) ?? versions[0];

  return (
    <div className="animate-fade-in fixed left-4 top-4 z-[9999] flex flex-col items-start gap-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Home screen challenge — pick a version"
        className="group flex items-center gap-2.5 rounded-full border border-[#f0a010]/40 bg-black/50 py-2 pl-2 pr-4 text-left text-white/90 shadow-lg backdrop-blur-md transition-all hover:border-[#f0a010]/70 hover:bg-black/70"
      >
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0a010] text-base text-black">
          🏆
          <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffb733] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ffb733]" />
          </span>
        </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-[#f0a010] md:text-sm">
              brainrot a PR →
            </span>
            <span className="text-[10px] text-white/55">
              ▶ now playing: {active.name}
            </span>
          </span>
      </button>

      {open && (
        <div className="w-64 max-h-[60vh] overflow-y-auto rounded-2xl border border-white/15 bg-black/75 p-2 shadow-2xl backdrop-blur-md">
          <p className="px-3 pt-2 text-[10px] uppercase tracking-[0.3em] text-[#f0a010]">
            Home screen challenge
          </p>
          <p className="px-3 pb-2 pt-1 text-[11px] leading-relaxed text-white/55">
            People PR their own remix of this home screen. Pick one to watch it —
            or make your own.
          </p>
          <ul className="flex flex-col gap-1">
            {versions.map((v) => {
              const isActive = v.id === activeId;
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(v.id);
                      setOpen(false);
                    }}
                    aria-current={isActive}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                      isActive ? "bg-[#f0a010]/20" : "hover:bg-white/10"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        isActive
                          ? "bg-[#f0a010] text-black"
                          : "bg-white/10 text-white/80"
                      }`}
                    >
                      {isActive ? <CheckIcon /> : <PlayIcon />}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-white">
                        {v.name}
                      </span>
                      <span className="block truncate text-xs text-white/50">
                        {v.author}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <a
            href="https://github.com/natarmr/FOSS_AP#-remix-the-home-screen-contributor-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block rounded-xl px-3 py-2 text-[11px] font-medium text-[#f0a010] transition-colors hover:bg-white/10"
          >
            + Make your own remix (PR it) →
          </a>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  // Strip extension-injected attrs (bis_skin_checked etc.) before hydration overlay fires
  useEffect(() => {
    const strip = () => {
      document.querySelectorAll("[bis_skin_checked]").forEach((el) => el.removeAttribute("bis_skin_checked"));
      document.querySelectorAll("[bis_register]").forEach((el) => el.removeAttribute("bis_register"));
      document.querySelectorAll("*").forEach((el) => {
        [...el.attributes].forEach((a) => {
          if (a.name.startsWith("__processed")) el.removeAttribute(a.name);
        });
      });
    };
    strip();
    const obs = new MutationObserver(strip);
    obs.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["bis_skin_checked", "bis_register"] });
    return () => obs.disconnect();
  }, []);

  const [phase, setPhase] = useState<Phase>("splash");
  const [enteredAt, setEnteredAt] = useState<number | null>(null);
  const [versionId, setVersionId] = useState(DEFAULT_VERSION_ID);
  const activeVersion = getVersion(versionId);

  const handleEnter = () => {
    if (phase !== "splash") return;
    setPhase("leaving");
    window.setTimeout(() => {
      setPhase("home");
      setEnteredAt(Date.now());
    }, TRANSITION_MS);
  };

  return (
    <main suppressHydrationWarning className="relative min-h-screen overflow-hidden bg-black font-sans text-white">
      <SiteAudio
        phase={phase}
        onEnter={handleEnter}
        activeVersion={activeVersion}
      />

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        <video
          key={activeVersion.id}
          className="absolute inset-0 h-full w-full object-cover"
          src={activeVersion.video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div suppressHydrationWarning className="absolute inset-0 bg-black/30" />
        <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />

        <div
          suppressHydrationWarning className={`relative z-10 mx-auto flex max-w-3xl flex-col items-center transition-all duration-[1500ms] ease-out ${
            phase === "splash" ? "scale-[1.03] opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <Image
            src="/assets/foss-logo.png"
            alt="FOSS SRMAP"
            width={800}
            height={800}
            priority
            className="h-44 w-auto max-w-[300px] object-contain drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] md:h-60"
          />

          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] md:text-xl">
            The free and open source community at SRM University AP.
          </p>

          <div suppressHydrationWarning className="mt-9">
            <TimeWasted since={enteredAt} />
          </div>

          {/* Placeholder Registration — wire later */}
          <div suppressHydrationWarning className="mt-10 flex flex-wrap justify-center gap-4">
            <span className="rounded-full border border-[#f0a010]/40 bg-[#f0a010]/10 px-6 py-3 text-base font-semibold text-[#f0a010] backdrop-blur-sm">
              Registration — coming soon
            </span>
          </div>

          {/* FOSS links */}
          <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/70 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            <a
              href="https://fossunited.org/c/srm-university-ap"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-[#f0a010]"
            >
              FOSS United
            </a>
            <span className="text-white/25">·</span>
            <a
              href="https://discord.com/invite/Q5Zeg5Wx7d"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-[#f0a010]"
            >
              Discord
            </a>
            <span className="text-white/25">·</span>
            <a
              href="https://www.linkedin.com/company/foss-srmap/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-[#f0a010]"
            >
              LinkedIn
            </a>
            <span className="text-white/25">·</span>
            <a
              href="https://www.instagram.com/foss.srmap/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-[#f0a010]"
            >
              Instagram
            </a>
          </nav>
        </div>
      </section>

      {phase === "home" && (
        <VersionSwitcher
          versions={HOME_VERSIONS}
          activeId={versionId}
          onSelect={setVersionId}
        />
      )}
    </main>
  );
}
