import {
  getRemoteWorkRecommendation,
  validateScore,
} from "@/lib/campsiteSignalFinder/scoring";
import { resolveSourceMetadata } from "@/lib/campsiteSignalFinder/sources";
import type {
  CampgroundSignalEntry,
  CarrierName,
  RawCampgroundSourceRecord,
  RawCarrierScoreSourceRecord,
} from "@/lib/campsiteSignalFinder/types";

const carrierNameMap: Record<string, CarrierName> = {
  verizon: "verizon",
  "verizon wireless": "verizon",
  att: "att",
  "at&t": "att",
  "at and t": "att",
  tmobile: "tmobile",
  "t-mobile": "tmobile",
  "t mobile": "tmobile",
};

function requireString(value: string, label: string) {
  if (!value.trim()) {
    throw new Error(`${label} is required.`);
  }

  return value.trim();
}

export function slugifyCampground(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!slug) {
    throw new Error("Unable to generate a valid campground slug.");
  }

  return slug;
}

export function normalizeCarrierName(carrier: string): CarrierName {
  const normalized = carrierNameMap[carrier.trim().toLowerCase()];

  if (!normalized) {
    throw new Error(`Unsupported carrier name: ${carrier}`);
  }

  return normalized;
}

function normalizeCarrierScores(carrierScores: RawCarrierScoreSourceRecord[]) {
  const normalizedScores: Partial<Record<CarrierName, number>> = {};

  for (const carrierScore of carrierScores) {
    const carrier = normalizeCarrierName(carrierScore.carrier);
    normalizedScores[carrier] = validateScore(
      carrierScore.score,
      `${carrier} score`,
    );
  }

  return {
    verizonScore: normalizedScores.verizon ?? 0,
    attScore: normalizedScores.att ?? 0,
    tmobileScore: normalizedScores.tmobile ?? 0,
  };
}

export function normalizeCampgroundSignalRecord(
  rawRecord: RawCampgroundSourceRecord,
): CampgroundSignalEntry {
  const sourceMetadata = resolveSourceMetadata(
    rawRecord.sourceType,
    rawRecord.sourceLabel,
    rawRecord.confidenceLevel,
    rawRecord.lastVerified,
  );
  const name = requireString(rawRecord.name, "Campground name");
  const parkName = requireString(rawRecord.parkName, "Park name");
  const city = requireString(rawRecord.city, "City");
  const state = requireString(rawRecord.state, "State");
  const notes = requireString(rawRecord.notes, "Notes");
  const lastUpdated = requireString(rawRecord.lastUpdated, "Last updated");

  return {
    slug: rawRecord.slug ? slugifyCampground(rawRecord.slug) : slugifyCampground(parkName),
    name,
    parkName,
    city,
    state,
    latitude: rawRecord.latitude,
    longitude: rawRecord.longitude,
    ...normalizeCarrierScores(rawRecord.carrierScores),
    remoteWorkScore: validateScore(rawRecord.remoteWorkScore, "Remote work score"),
    recommendation: getRemoteWorkRecommendation(rawRecord.remoteWorkScore),
    notes,
    ...sourceMetadata,
    lastUpdated,
  };
}

export function normalizeCampgroundSignalRecords(
  rawRecords: RawCampgroundSourceRecord[],
) {
  return rawRecords.map(normalizeCampgroundSignalRecord);
}
