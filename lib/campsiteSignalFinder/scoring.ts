import type { RecommendationLabel } from "@/lib/campsiteSignalFinder/types";

export function getRemoteWorkRecommendation(
  score: number,
): RecommendationLabel {
  if (score <= 3) {
    return "Not recommended for remote work";
  }

  if (score <= 5) {
    return "Risky; backup hotspot recommended";
  }

  if (score <= 7) {
    return "Usable for light remote work";
  }

  return "Good remote-work candidate";
}

export function validateScore(score: number, label: string) {
  if (!Number.isFinite(score) || score < 0 || score > 10) {
    throw new Error(`${label} must be a number between 0 and 10.`);
  }

  return score;
}
