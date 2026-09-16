"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-hairline">
      <nav
        aria-label="Main navigation"
        className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 py-5 sm:px-12"
      >
        <Link
          href="/"
          className="underline-sweep w-fit font-display text-[19px] tracking-[-0.02em] text-ink no-underline"
        >
          Andres Barriga
        </Link>
        <ul className="flex list-none gap-6 p-0 text-sm">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "border-b-[3px] border-accent pb-[2px] text-ink no-underline"
                      : "underline-sweep w-fit text-ink no-underline"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
