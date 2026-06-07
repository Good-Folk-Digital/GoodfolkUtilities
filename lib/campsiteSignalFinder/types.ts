export type CarrierKey = "verizonScore" | "attScore" | "tmobileScore";

export type CarrierFilter = "all" | CarrierKey;

export type CarrierName = "verizon" | "att" | "tmobile";

export type SignalSourceType =
  | "placeholder"
  | "fcc"
  | "carrier-map"
  | "field-test"
  | "user-report";

export type ConfidenceLevel = "low" | "medium" | "high";

export type RecommendationLabel =
  | "Not recommended for remote work"
  | "Risky; backup hotspot recommended"
  | "Usable for light remote work"
  | "Good remote-work candidate";

export type SourceMetadata = {
  sourceType: SignalSourceType;
  sourceLabel: string;
  confidenceLevel: ConfidenceLevel;
  lastVerified: string | null;
};

export type CarrierScore = {
  carrier: CarrierName;
  score: number;
};

export type RawCarrierScoreSourceRecord = {
  carrier: string;
  score: number;
};

export type RawCampgroundSourceRecord = {
  slug?: string;
  name: string;
  parkName: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  carrierScores: RawCarrierScoreSourceRecord[];
  remoteWorkScore: number;
  notes: string;
  sourceType?: SignalSourceType;
  sourceLabel?: string;
  confidenceLevel?: ConfidenceLevel;
  lastVerified?: string | null;
  lastUpdated: string;
};

export type CampgroundSignalEntry = {
  slug: string;
  name: string;
  parkName: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  verizonScore: number;
  attScore: number;
  tmobileScore: number;
  remoteWorkScore: number;
  recommendation: RecommendationLabel;
  notes: string;
  sourceType: SignalSourceType;
  sourceLabel: string;
  confidenceLevel: ConfidenceLevel;
  lastVerified: string | null;
  lastUpdated: string;
};
