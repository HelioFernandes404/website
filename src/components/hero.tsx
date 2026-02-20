export function Hero() {
  return (
    <section className="section-reveal relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute -top-20 right-0 h-52 w-52 rounded-full bg-[var(--color-accent-primary-a20)] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[var(--color-accent-primary-a10)] blur-[80px]" />

      <div className="relative max-w-5xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-xs uppercase tracking-widest text-neutral-600">
          <span className="h-2 w-2 rounded-full bg-success-500" aria-hidden />
          Curated stack
        </p>

        <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
          Discover developer tools that move your build velocity.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
          Browse production-grade tools by category, scan essentials fast, and jump to each official
          website in one click.
        </p>
      </div>
    </section>
  );
}
