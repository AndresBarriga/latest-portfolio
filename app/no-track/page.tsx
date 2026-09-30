import type { Metadata } from "next";
import { NoTrackNotice } from "@/src/components/NoTrackNotice";

export const metadata: Metadata = {
  title: "No track",
  robots: { index: false, follow: false },
};

export default function NoTrackPage() {
  return <NoTrackNotice />;
}
