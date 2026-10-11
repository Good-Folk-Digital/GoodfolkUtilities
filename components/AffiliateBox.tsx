import { getRecommendation } from "@/lib/affiliate";

/**
 * Renders a single affiliate recommendation below the tool, matched to the
 * page's category. Renders nothing when the category has no recommendation
 * or the link is still a placeholder.
 */
export default function AffiliateBox({ line }: { line: string }) {
  const rec = getRecommendation(line);
  if (!rec) return null;

  return (
    <aside className="mt-12 rounded-xl border border-amber-300/30 bg-amber-300/5 p-6">
      <p className="text-xs uppercase tracking-widest text-amber-300/80 mb-2">
        {rec.label}
      </p>
      <h2 className="text-xl font-semibold text-white mb-2">{rec.title}</h2>
      <p className="text-zinc-300 text-sm mb-4 max-w-2xl">{rec.blurb}</p>
      <a
        href={rec.url}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="inline-block rounded-lg bg-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-200"
      >
        {rec.cta} →
      </a>
      <p className="mt-3 text-xs text-zinc-500">
        Affiliate link — we may earn a commission at no extra cost to you.
      </p>
    </aside>
  );
}
