// ─────────────────────────────────────────────────────────────────────────────
// Home-screen "remix" versions — FOSS SRMAP
// ─────────────────────────────────────────────────────────────────────────────
// The home screen is community-remixable: anyone can PR a new background
// video + soundtrack pairing. This registry is the single source of truth for
// the version switcher on the home page.
//
// The FIRST entry (DEFAULT_VERSION_ID) is what plays by default for every
// visitor. Contributors APPEND their version — they never replace the default.
//
// ⚡ Performance contract (keep the site fast, never lag/crash):
//   • Only ONE <video> + ONE <audio> is ever mounted (the active version).
//     Switching swaps the source; we never decode 10 videos at once.
//   • Keep each `video` ≲ 3 MB and each `audio` ≲ 3 MB, H.264/mp4 + mp3,
//     loopable with no hard cut. Big files = slow first paint for everyone.
//   • Hard cap: MAX_VERSIONS. Owner merges at most this many.
//

export type HomeVersion = {
  /** stable kebab-case slug — used in the UI + deep links; never change it */
  id: string;
  /** short display name shown in the switcher, e.g. "FOSS SRMAP (OG)" */
  name: string;
  /** contributor credit, e.g. "@foss-srmap" */
  author: string;
  /** background video under /public (muted, looping) */
  video: string;
  /** looping soundtrack under /public */
  audio: string;
};

export const HOME_VERSIONS: HomeVersion[] = [
  {
    id: "og",
    name: "FOSS SRMAP (OG)",
    author: "foss-srmap",
    video: "/assets/laura_video.mp4",
    audio: "/assets/final-audio.mp3",
  },
  // ── append new remix versions below (keep the OG first) ──
];

/** The version played by default for every visitor. */
export const DEFAULT_VERSION_ID = "og";

/** Owner merges at most this many community remixes. */
export const MAX_VERSIONS = 10;

export function getVersion(id: string): HomeVersion {
  return HOME_VERSIONS.find((v) => v.id === id) ?? HOME_VERSIONS[0];
}
