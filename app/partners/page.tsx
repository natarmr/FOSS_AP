import type { Metadata } from "next";
import ComingSoon from "../_shared/coming-soon";

export const metadata: Metadata = {
  title: "partners",
  description:
    "FOSS SRMAP community and ecosystem partners will be announced soon. Partnership details are on the way.",
};

export default function PartnersPage() {
  return (
    <ComingSoon
      eyebrow="partners"
      title="Partners — coming soon."
      blurb="Our community and ecosystem partners will be announced soon. If you'd like to collaborate with FOSS SRMAP and the FOSS United community, partnership details are on the way — stay tuned."
    />
  );
}
