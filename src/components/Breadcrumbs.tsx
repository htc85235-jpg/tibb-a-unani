import Link from "next/link";

export default function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="breadcrumbs" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
      <Link href="/" className="transition hover:text-brand-600">Home</Link>
      {trail.map((t, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-slate-300">·</span>
          {t.href ? (
            <Link href={t.href} className="transition hover:text-brand-600">{t.label}</Link>
          ) : (
            <span className="font-semibold text-slate-700">{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
