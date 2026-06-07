export { campsiteSignalCampgrounds } from "@/lib/campsiteSignalFinder/data";
export {
  getBestCarriers,
  matchesCarrierFilter,
  searchCampgrounds,
  carrierLabels,
} from "@/lib/campsiteSignalFinder/search";
export {
  getRemoteWorkRecommendation,
  validateScore,
} from "@/lib/campsiteSignalFinder/scoring";
export {
  formatConfidenceLevel,
  formatLastVerified,
  placeholderSourceMetadata,
  resolveSourceMetadata,
} from "@/lib/campsiteSignalFinder/sources";
export {
  normalizeCampgroundSignalRecord,
  normalizeCampgroundSignalRecords,
  normalizeCarrierName,
  slugifyCampground,
} from "@/lib/campsiteSignalFinder/normalize";
export type {
  CampgroundSignalEntry,
  CarrierFilter,
  CarrierKey,
  CarrierName,
  CarrierScore,
  ConfidenceLevel,
  RawCampgroundSourceRecord,
  RawCarrierScoreSourceRecord,
  RecommendationLabel,
  SignalSourceType,
  SourceMetadata,
} from "@/lib/campsiteSignalFinder/types";

import { campsiteSignalCampgrounds } from "@/lib/campsiteSignalFinder/data";

export function getCampsiteSignalCampgroundBySlug(slug: string) {
  return campsiteSignalCampgrounds.find((campground) => campground.slug === slug);
}
