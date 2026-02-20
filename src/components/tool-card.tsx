import type { Tool } from '@/types/catalog';
import { TagChip } from '@/components/tag-chip';

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg">
      <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-[var(--color-accent-primary-a10)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${tool.name} official site`}
        className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none"
      />

      <div className="relative z-0 flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
          {tool.name}
        </h3>
        <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-success-700">
          <span className="pulse-accent h-2 w-2 rounded-full bg-success-500" aria-hidden />
          Live
        </span>
      </div>

      <p className="relative z-0 mt-3 text-sm leading-relaxed text-neutral-600">
        {tool.description}
      </p>

      <ul className="relative z-0 mt-5 flex flex-wrap gap-2" aria-label="Tool tags">
        {tool.tags.map((tag) => (
          <li key={tag}>
            <TagChip tag={tag} />
          </li>
        ))}
      </ul>
    </article>
  );
}
