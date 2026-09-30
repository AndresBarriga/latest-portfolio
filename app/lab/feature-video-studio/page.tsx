import type { Metadata } from "next";
import Link from "next/link";
import { FeatureVideo } from "@/src/components/FeatureVideo";
import { ScrollDepthTracker } from "@/src/components/ScrollDepthTracker";

const title = "Feature Video Studio";
const description =
  "A Claude Code skill that turns app screenshots into a short feature video.";
const url = "/lab/feature-video-studio";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
  twitter: { card: "summary_large_image", title, description },
};

export default function FeatureVideoStudioPage() {
  return (
    <article className="flex-1 bg-ink text-ink-inverse">
      <ScrollDepthTracker />
      <div className="border-b border-hairline-dark px-6 py-5 sm:px-12">
        <div className="mx-auto flex w-full max-w-[1080px] items-baseline justify-between font-mono text-[12.5px] text-meta-dark">
          <span>
            <Link
              href="/lab"
              className="no-underline underline-sweep text-meta-dark"
            >
              lab
            </Link>{" "}
            / feature-video-studio
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1080px] px-6 py-10 sm:px-12 sm:py-14">
        <h1 className="m-0 mb-4 max-w-[22ch] font-display text-[32px] font-medium leading-[1.12] tracking-[-0.02em] sm:text-[42px]">
          {title}
        </h1>

        <p className="mb-8 max-w-[64ch] text-[16.5px] leading-[1.68] text-body-dark">
          {description}
        </p>

        <div className="mb-10">
          <FeatureVideo
            src="/videos/feature-video-studio-intro.mp4"
            ariaLabel="Screen recording of Feature Video Studio turning app screenshots into a short feature video"
          />
        </div>

        <p className="mb-10 max-w-[64ch] text-[16.5px] leading-[1.68] text-body-dark">
          <strong className="text-ink-inverse">Why:</strong> A launch
          isn&apos;t finished until you can show what changed. Instead of
          editing one video for one launch, I built a tool that makes one for
          every launch, without a video editor or new software to learn.
        </p>

        <h2 className="mb-3 mt-9 max-w-[64ch] font-display text-2xl font-medium tracking-[-0.025em] sm:text-[26px]">
          How it works
        </h2>
        <ol className="mb-10 max-w-[64ch] list-decimal space-y-1.5 pl-5 text-[16.5px] leading-[1.68] text-body-dark">
          <li>
            Claude asks about the feature, the audience and the format, and
            writes the script with you.
          </li>
          <li>
            It tells you exactly which screenshots to take, checks them, and
            builds the scenes.
          </li>
          <li>
            It renders only the formats you ask for, locally, on your own
            Claude subscription.
          </li>
        </ol>

        <div className="max-w-[64ch] border-y border-hairline-dark py-8">
          <p className="m-0 text-[16.5px] leading-[1.68] text-body-dark">
            The decision that shaped it: generative output is cheap to
            produce and expensive to redo. So there are two approval points,
            placed right before the costly steps: the script before anything
            is built, and test frames of every scene before anything
            renders.
          </p>
        </div>
      </div>
    </article>
  );
}
