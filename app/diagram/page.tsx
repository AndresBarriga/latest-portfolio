import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diagram",
  robots: { index: false, follow: false },
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DiagramPage(props: PageProps<"/diagram">) {
  const searchParams = await props.searchParams;
  const src = firstParam(searchParams.src);
  const alt = firstParam(searchParams.alt) ?? "Diagram";
  const width = Number(firstParam(searchParams.w)) || 1200;
  const height = Number(firstParam(searchParams.h)) || 800;
  const rawFrom = firstParam(searchParams.from);
  const from = rawFrom && rawFrom.startsWith("/") ? rawFrom : "/";
  const label = firstParam(searchParams.label) ?? "home";

  if (!src) {
    notFound();
  }

  return (
    <div className="px-4 py-6 sm:px-6">
      <Link
        href={from}
        className="no-underline underline-sweep mb-4 inline-block font-mono text-xs text-meta"
      >
        ← back to {label}
      </Link>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        className="h-auto w-full"
      />
    </div>
  );
}
