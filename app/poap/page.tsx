import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POAP?",
  description:
    "Free POAP? Lmaooo. Proof of Attendance Protocol for FOSS SRMAP — help build the site (open a PR) for a surprise gift, or take the $100 brainrot timer challenge — clock the highest for a special award and cash prize.",
};

export default function PoapPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white px-6 py-16 md:flex-row md:gap-12 md:px-10 lg:px-16">
      {/* POAP packet/badge shot — pinned to the far left (~30% column) — object-contain, no stretch */}
      <div className="flex w-full shrink-0 justify-center md:w-[30%] md:justify-start">
        <Image
          src="/assets/chips-3.png"
          alt="FOSS SRMAP POAP — proof of attendance protocol"
          width={496}
          height={503}
          priority
          sizes="(max-width: 768px) 60vw, 30vw"
          className="h-auto w-full max-w-[260px] object-contain drop-shadow-2xl md:max-w-[400px]"
        />
      </div>

      {/* Copy — full brainrot kept */}
      <div className="w-full md:flex-1">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0a010]">
            proof of attendance protocol
          </p>

          <p className="mt-5 text-xl font-semibold leading-relaxed text-black md:text-2xl">
            These mfs, they&apos;re not even paying me to build this website — you
            really think they&apos;ll hand you a free POAP like that? Lmaooo! 😆🤣
          </p>

          <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
            But if oomfs really want that POAP? Then help build this website (make
            brainrot PR changes — go crazy): open a PR on{" "}
            <a
              href="https://github.com/natarmr/FOSS_AP"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#f0a010] underline underline-offset-4 transition-colors hover:text-black"
            >
              GitHub
            </a>{" "}
            and you&apos;ll receive a surprise gift on event day.
          </p>

          <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
            Want a <span className="font-semibold text-[#f0a010]">$100</span>{" "}
            challenge?
          </p>

          <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
            Plus, are you ready for a quick challenge? Complete the brainrot timer
            challenge, then post the video on{" "}
            <a
              href="https://www.instagram.com/foss.srmap/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#f0a010] underline underline-offset-4 transition-colors hover:text-black"
            >
              Instagram
            </a>{" "}
            tagging{" "}
            <a
              href="https://www.instagram.com/foss.srmap/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#f0a010] underline underline-offset-4 transition-colors hover:text-black"
            >
              @foss.srmap
            </a>{" "}
            or on{" "}
            <a
              href="https://discord.com/invite/Q5Zeg5Wx7d"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#f0a010] underline underline-offset-4 transition-colors hover:text-black"
            >
              Discord
            </a>
            . Whoever clocks the highest will get a special award and cash prize on
            event day. 🏆😉
          </p>

          <Link
            href="/"
            className="mt-10 inline-block text-sm text-black/40 underline underline-offset-4 transition-colors hover:text-black"
          >
            ← fine, take me back
          </Link>
        </div>
      </div>
    </main>
  );
}
