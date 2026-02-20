import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Dev Toolbox',
  description: 'About Dev Toolbox and project links.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24">
      <section className="terminal-panel p-8 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">About</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-950">
          Dev Toolbox
        </h1>
        <p className="mt-6 text-base leading-relaxed text-neutral-600">
          Dev Toolbox is a curated directory for developers to quickly find production-ready tools
          by category. The goal is simple: scan fast, understand value, and open the official source
          in one click.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-accent-primary hover:bg-[var(--color-accent-primary-a10)] hover:text-neutral-950"
          >
            Repository
          </Link>
          <Link
            href="mailto:hello@example.com"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-accent-primary hover:bg-[var(--color-accent-primary-a10)] hover:text-neutral-950"
          >
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
