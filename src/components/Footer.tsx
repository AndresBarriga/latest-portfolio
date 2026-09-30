import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-hairline px-6 py-6 sm:px-12">
      <div className="mx-auto flex w-full max-w-[1080px] items-baseline justify-between gap-4 font-mono text-xs text-meta">
        <span>© {new Date().getFullYear()} Andres Barriga</span>
        <span className="flex gap-4">
          <Link href="/privacy" className="no-underline underline-sweep text-meta">
            privacy
          </Link>
          <Link href="/impressum" className="no-underline underline-sweep text-meta">
            impressum
          </Link>
        </span>
      </div>
    </footer>
  );
}
