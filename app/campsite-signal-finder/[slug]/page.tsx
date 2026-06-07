import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RelatedTools from "@/components/RelatedTools";
import ToolPage from "@/components/ToolPage";
import { createToolMetadata } from "@/lib/seo";
import {
  campsiteSignalCampgrounds,
  carrierLabels,
  formatConfidenceLevel,
  formatLastVerified,
  getBestCarriers,
  getCampsiteSignalCampgroundBySlug,
} from "@/lib/campsiteSignalFinder";

function getScoreTone(score: number) {
  if (score >= 8) {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-100";
  }

  if (score >= 6) {
    return "border-amber-300/30 bg-amber-300/10 text-amber-100";
  }

  return "border-red-400/30 bg-red-400/10 text-red-100";
}

export function generateStaticParams() {
  return campsiteSignalCampgrounds.map((campground) => ({
    slug: campground.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campground = getCampsiteSignalCampgroundBySlug(slug);

  if (!campground) {
    return createToolMetadata(
      "Campsite Signal Finder",
      "Review campground signal planning scores and placeholder coverage notes.",
    );
  }

  return createToolMetadata(
    `${campground.parkName} Cell Service, Verizon Coverage & Remote Work Notes`,
    `Review placeholder Verizon, AT&T, and T-Mobile planning scores for ${campground.parkName}, including source transparency and whether you may be able to work remotely from the campground.`,
  );
}

export default async function CampsiteSignalCampgroundDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campground = getCampsiteSignalCampgroundBySlug(slug);

  if (!campground) {
    notFound();
  }

  const strongestCarrierKeys = getBestCarriers(campground).map(
    (carrierKey) => carrierLabels[carrierKey],
  );

  return (
    <ToolPage
      line="Goodfolk Utilities"
      title={campground.name}
      description={`Placeholder planning scores for ${campground.parkName} in ${campground.city}, ${campground.state}. Use this page as a rough planning aid, not a verified carrier coverage guarantee.`}
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm font-semibold text-amber-300">
          {campground.parkName}
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          {campground.city}, {campground.state} · {campground.latitude},{" "}
          {campground.longitude}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/campsite-signal-finder"
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
          >
            Back to Campsite Signal Finder
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-4">
        <ScoreTile label="Verizon" score={campground.verizonScore} />
        <ScoreTile label="AT&T" score={campground.attScore} />
        <ScoreTile label="T-Mobile" score={campground.tmobileScore} />
        <ScoreTile
          label="Remote work"
          score={campground.remoteWorkScore}
          emphasize
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div
            className={`inline-flex rounded-xl border px-4 py-3 text-sm ${getScoreTone(
              campground.remoteWorkScore,
            )}`}
          >
            <div>
              <p className="font-semibold">
                Remote work score: {campground.remoteWorkScore}/10
              </p>
              <p className="mt-1">{campground.recommendation}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm font-semibold text-white">Coverage notes</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {campground.notes}
            </p>
            <p className="mt-4 text-sm text-zinc-400">
              Strongest carrier: {strongestCarrierKeys.join(", ")}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Source transparency</h2>
          <div className="mt-5 space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-zinc-300">
            <DetailRow label="Source" value={campground.sourceLabel} />
            <DetailRow
              label="Confidence"
              value={formatConfidenceLevel(campground.confidenceLevel)}
            />
            <DetailRow
              label="Last verified"
              value={formatLastVerified(campground.lastVerified)}
            />
            <DetailRow label="Last updated" value={campground.lastUpdated} />
          </div>

          <p className="mt-5 text-sm leading-6 text-zinc-400">
            These are placeholder planning scores for the MVP. They are not
            verified carrier measurements yet. Use them as a rough planning
            aid, not a guarantee of campsite connectivity.
          </p>
        </section>
      </div>

      <RelatedTools currentHref="/campsite-signal-finder" category="camp" />
    </ToolPage>
  );
}

function ScoreTile({
  label,
  score,
  emphasize = false,
}: {
  label: string;
  score: number;
  emphasize?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        emphasize
          ? "border-amber-300/30 bg-amber-300/10"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{score}/10</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-slate-800 pb-3 last:border-b-0 last:pb-0">
      <p className="text-zinc-400">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
