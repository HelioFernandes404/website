type TagChipProps = {
  tag: string;
};

export function TagChip({ tag }: TagChipProps) {
  return (
    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-xs uppercase tracking-wide text-neutral-700">
      {tag}
    </span>
  );
}
