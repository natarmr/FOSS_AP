import Link from "next/link";
import Image from "next/image";

// Shared "coming soon" layout — mirrors the /poap page design (white bg, image
// column on the left ~30%, copy on the right). Used by /speakers, /sponsors and
// /partners while those details are still being finalised.
export default function ComingSoon({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white px-6 py-16 md:flex-row md:gap-12 md:px-10 lg:px-16">
      {/* "coming soon" lockup — pinned to the far left (~30% column) */}
      <div className="flex w-full shrink-0 justify-center md:w-[30%] md:justify-start">
        <Image
          src="/assets/coming-soon.png"
          alt="Coming soon"
          width={2336}
          height={696}
          priority
          sizes="(max-width: 768px) 70vw, 30vw"
          className="h-auto w-full max-w-[280px] object-contain md:max-w-[360px]"
        />
      </div>

      {/* Copy */}
      <div className="w-full md:flex-1">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0a010]">
            {eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-black md:text-5xl">
            {title}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
            {blurb}
          </p>

          {/* Placeholder Registration CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <span className="rounded-full border border-[#f0a010]/40 bg-[#f0a010]/10 px-6 py-3 text-sm font-semibold text-[#f0a010]">
              Registration — coming soon
            </span>
          </div>

          <Link
            href="/"
            className="mt-10 inline-block text-sm text-black/40 underline underline-offset-4 transition-colors hover:text-black"
          >
            ← back home
          </Link>
        </div>
      </div>
    </main>
  );
}
