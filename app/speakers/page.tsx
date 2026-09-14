import type { Metadata } from "next";
import ComingSoon from "../_shared/coming-soon";

export const metadata: Metadata = {
  title: "speakers",
  description:
    "The FOSS SRMAP speaker lineup is being finalised — keynotes, technical talks, and panels announced soon.",
};

export default function SpeakersPage() {
  return (
    <ComingSoon
      eyebrow="speakers"
      title="Speakers — coming soon."
      blurb="Our speaker lineup is being finalised. Keynotes, technical talks, panel discussions, and workshops are on the way — check back soon to see who's taking the stage at FOSS SRMAP."
    />
  );
}
