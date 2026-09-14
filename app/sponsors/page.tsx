import type { Metadata } from "next";
import ComingSoon from "../_shared/coming-soon";

export const metadata: Metadata = {
  title: "sponsors",
  description:
    "FOSS SRMAP sponsors will be revealed soon. Interested in powering the community? Sponsorship details are on the way.",
};

export default function SponsorsPage() {
  return (
    <ComingSoon
      eyebrow="sponsors"
      title="Sponsors — coming soon."
      blurb="Our sponsors will be revealed soon. Want to help power FOSS SRMAP and support the open source community at SRM AP? Sponsorship details are on the way — check back shortly."
    />
  );
}
