import type {
  CampgroundSignalEntry,
  CarrierFilter,
  CarrierKey,
} from "@/lib/campsiteSignalFinder/types";

export const carrierLabels: Record<CarrierKey, string> = {
  verizonScore: "Verizon",
  attScore: "AT&T",
  tmobileScore: "T-Mobile",
};

export function getBestCarriers(entry: CampgroundSignalEntry) {
  const carrierScores = [
    { key: "verizonScore" as const, score: entry.verizonScore },
    { key: "attScore" as const, score: entry.attScore },
    { key: "tmobileScore" as const, score: entry.tmobileScore },
  ];
  const topScore = Math.max(...carrierScores.map((carrier) => carrier.score));

  return carrierScores
    .filter((carrier) => carrier.score === topScore)
    .map((carrier) => carrier.key);
}

export function matchesCarrierFilter(
  entry: CampgroundSignalEntry,
  carrier: CarrierFilter,
) {
  if (carrier === "all") {
    return true;
  }

  return getBestCarriers(entry).includes(carrier);
}

export function searchCampgrounds(
  campgrounds: CampgroundSignalEntry[],
  query: string,
  carrier: CarrierFilter,
) {
  const normalizedQuery = query.trim().toLowerCase();

  return campgrounds.filter((campground) => {
    if (!matchesCarrierFilter(campground, carrier)) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const carrierTerms = getBestCarriers(campground).map(
      (carrierKey) => carrierLabels[carrierKey].toLowerCase(),
    );
    const haystack = [
      campground.name,
      campground.parkName,
      campground.city,
      campground.state,
      campground.recommendation,
      campground.notes,
      campground.sourceLabel,
      campground.confidenceLevel,
      ...carrierTerms,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
