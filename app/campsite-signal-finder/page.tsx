"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import RelatedTools from "@/components/RelatedTools";
import ToolPage from "@/components/ToolPage";
import {
  campsiteSignalCampgrounds,
  carrierLabels,
  formatConfidenceLevel,
  formatLastVerified,
  getBestCarriers,
  searchCampgrounds,
  type CarrierFilter,
  type CampgroundSignalEntry,
} from "@/lib/campsiteSignalFinder";

const scoreToneClasses = {
  high: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  medium: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  low: "border-red-400/30 bg-red-400/10 text-red-100",
} as const;

function getScoreTone(score: number) {
  if (score >= 8) {
    return scoreToneClasses.high;
  }

  if (score >= 6) {
    return scoreToneClasses.medium;
  }

  return scoreToneClasses.low;
}

function scoreSummaryLabel(score: number) {
  if (score >= 8) {
    return "Strong";
  }

  if (score >= 6) {
    return "Moderate";
  }

  return "Weak";
}

export default function CampsiteSignalFinderPage() {
  const [query, setQuery] = useState("");
  const [carrierFilter, setCarrierFilter] = useState<CarrierFilter>("all");

  const results = useMemo(
    () => searchCampgrounds(campsiteSignalCampgrounds, query, carrierFilter),
    [query, carrierFilter],
  );

  const averageRemoteWorkScore = useMemo(() => {
    const totalScore = campsiteSignalCampgrounds.reduce(
      (sum, campground) => sum + campground.remoteWorkScore,
      0,
    );

    return totalScore / campsiteSignalCampgrounds.length;
  }, []);

  return (
    <ToolPage
      line="Goodfolk Utilities"
      title="Campsite Signal Finder"
      description="Estimate campground cell signal quality for Georgia state park camping before you book or pack your work setup."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 md:grid-cols-[1.4fr_0.8fr]">
            <label className="block">
              <span className="text-sm text-zinc-300">
                Search by campground, park, city, or recommendation
              </span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try Tallulah, Savannah, or remote work"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Best carrier filter</span>
              <select
                value={carrierFilter}
                onChange={(event) =>
                  setCarrierFilter(event.target.value as CarrierFilter)
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="all">All carrier mixes</option>
                <option value="verizonScore">Best for Verizon</option>
                <option value="attScore">Best for AT&amp;T</option>
                <option value="tmobileScore">Best for T-Mobile</option>
              </select>
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            These are placeholder planning scores for the MVP. They are not
            verified carrier measurements yet. Use them as a rough planning
            aid, not a guarantee of campsite connectivity. Carrier filtering
            shows campgrounds where the selected network is tied for the
            strongest score in the current placeholder record.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Georgia Snapshot
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <SummaryCard
              label="Campgrounds in dataset"
              value={`${campsiteSignalCampgrounds.length}`}
            />
            <SummaryCard
              label="Average remote work score"
              value={`${averageRemoteWorkScore.toFixed(1)}/10`}
            />
          </div>

          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-zinc-300">
            <p className="font-semibold text-white">Remote work score guide</p>
            <ul className="mt-3 space-y-2 leading-6 text-zinc-400">
              <li>0-3: Not recommended for remote work</li>
              <li>4-5: Risky; backup hotspot recommended</li>
              <li>6-7: Usable for light remote work</li>
              <li>8-10: Good remote-work candidate</li>
            </ul>
          </div>
        </section>
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Campground results</h2>
            <p className="mt-2 text-sm text-zinc-400">
              {results.length} match{results.length === 1 ? "" : "es"} from the
              current Georgia dataset.
            </p>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-5">
            {results.map((campground) => (
              <CampgroundCard key={campground.name} campground={campground} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-6 text-zinc-400">
            No campgrounds matched that search. Try a city name, park name, or
            switch the carrier filter back to all carrier mixes.
          </div>
        )}
      </section>

      <p className="mt-8 text-sm leading-6 text-zinc-500">
        Important: these current scores are placeholder planning estimates for
        the MVP and are not verified carrier measurements. Use them as a rough
        planning aid, not a guarantee of campsite connectivity. Real-world
        signal can vary substantially based on terrain, weather, foliage,
        campsite placement, congestion, season, and device hardware.
      </p>

      <RelatedTools currentHref="/campsite-signal-finder" category="camp" />
    </ToolPage>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function CampgroundCard({
  campground,
}: {
  campground: CampgroundSignalEntry;
}) {
  const strongestCarrierKeys = getBestCarriers(campground).map(
    (carrierKey) => carrierLabels[carrierKey],
  );

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-300">
            {campground.parkName}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-white">
            {campground.name}
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            {campground.city}, {campground.state} · {campground.latitude},{" "}
            {campground.longitude}
          </p>
        </div>

        <div
          className={`rounded-xl border px-4 py-3 text-sm ${getScoreTone(
            campground.remoteWorkScore,
          )}`}
        >
          <p className="font-semibold">
            Remote work score: {campground.remoteWorkScore}/10
          </p>
          <p className="mt-1">
            {scoreSummaryLabel(campground.remoteWorkScore)} fit
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <ScoreTile label="Verizon" score={campground.verizonScore} />
        <ScoreTile label="AT&T" score={campground.attScore} />
        <ScoreTile label="T-Mobile" score={campground.tmobileScore} />
        <ScoreTile
          label="Remote work"
          score={campground.remoteWorkScore}
          emphasize
        />
      </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm font-semibold text-white">Recommendation</p>
            <p className="mt-2 text-zinc-300">{campground.recommendation}</p>
            <p className="mt-4 text-sm text-zinc-400">
              Strongest carrier: {strongestCarrierKeys.join(", ")}
            </p>
            <Link
              href={`/campsite-signal-finder/${campground.slug}`}
              className="mt-4 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
            >
              View campground details
            </Link>
          </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm font-semibold text-white">Planner notes</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {campground.notes}
          </p>
          <div className="mt-4 space-y-2 text-sm text-zinc-400">
            <p>Source: {campground.sourceLabel}</p>
            <p>
              Confidence:{" "}
              {formatConfidenceLevel(campground.confidenceLevel)}
            </p>
            <p>Last verified: {formatLastVerified(campground.lastVerified)}</p>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
            Last updated {campground.lastUpdated}
          </p>
        </div>
      </div>
    </article>
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
          : "border-slate-800 bg-slate-950"
      }`}
    >
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{score}/10</p>
    </div>
  );
}
