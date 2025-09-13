export default function ColorsAudit() {
  const items: Array<[string, string]> = [
    ['page', 'bg-page'],
    ['surface', 'bg-surface'],
    ['surfaceMuted', 'bg-surfaceMuted'],
    ['surfaceRaised', 'bg-surfaceRaised'],
    ['border', 'border border-border'],
    ['borderMuted', 'border border-borderMuted'],
    ['ink (text)', 'text-ink'],
    ['inkSubdued (text)', 'text-inkSubdued'],
    ['accent', 'bg-accent'],
    ['accentHover', 'bg-accentHover'],
  ];
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-xl font-semibold text-ink">Tokens (light/dark)</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(([name, cls]) => (
          <div key={name} className="rounded-md border border-border p-3">
            <div className={`h-10 w-full rounded ${cls}`} />
            <div className="mt-2 text-xs text-inkSubdued">{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

