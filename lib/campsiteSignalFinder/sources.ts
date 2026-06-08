import type {
  ConfidenceLevel,
  SignalSourceType,
  SourceMetadata,
} from "@/lib/campsiteSignalFinder/types";

export const placeholderSourceMetadata: SourceMetadata = {
  sourceType: "placeholder",
  sourceLabel: "MVP planning estimate",
  confidenceLevel: "low",
  lastVerified: null,
};

export const sourceReliabilityWeights: Record<SignalSourceType, number> = {
  placeholder: 0.1,
  fcc: 0.5,
  "carrier-map": 0.6,
  "field-test": 0.9,
  "user-report": 0.7,
};

export function formatConfidenceLevel(confidenceLevel: ConfidenceLevel) {
  return confidenceLevel.charAt(0).toUpperCase() + confidenceLevel.slice(1);
}

export function formatLastVerified(lastVerified: string | null) {
  return lastVerified ?? "Not yet verified";
}

export function resolveSourceMetadata(
  sourceType?: SignalSourceType,
  sourceLabel?: string,
  confidenceLevel?: ConfidenceLevel,
  lastVerified?: string | null,
): SourceMetadata {
  return {
    sourceType: sourceType ?? placeholderSourceMetadata.sourceType,
    sourceLabel: sourceLabel ?? placeholderSourceMetadata.sourceLabel,
    confidenceLevel:
      confidenceLevel ?? placeholderSourceMetadata.confidenceLevel,
    lastVerified:
      lastVerified === undefined
        ? placeholderSourceMetadata.lastVerified
        : lastVerified,
  };
}
