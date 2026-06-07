import { normalizeCampgroundSignalRecords } from "@/lib/campsiteSignalFinder/normalize";
import type { RawCampgroundSourceRecord } from "@/lib/campsiteSignalFinder/types";

const placeholderCampgroundSignalSourceRecords: RawCampgroundSourceRecord[] = [
  {
    slug: "fort-yargo-state-park",
    name: "Fort Yargo State Park Campground",
    parkName: "Fort Yargo State Park",
    city: "Winder",
    state: "Georgia",
    latitude: 33.9618,
    longitude: -83.7274,
    carrierScores: [
      { carrier: "Verizon", score: 8 },
      { carrier: "AT&T", score: 7 },
      { carrier: "T-Mobile", score: 6 },
    ],
    remoteWorkScore: 7,
    notes:
      "Estimated stronger coverage near developed areas; verify before relying on this site for work.",
    lastUpdated: "2026-06-03",
  },
  {
    slug: "hard-labor-creek-state-park",
    name: "Hard Labor Creek Campground",
    parkName: "Hard Labor Creek State Park",
    city: "Rutledge",
    state: "Georgia",
    latitude: 33.6207,
    longitude: -83.5889,
    carrierScores: [
      { carrier: "Verizon", score: 6 },
      { carrier: "AT&T", score: 5 },
      { carrier: "T-Mobile", score: 4 },
    ],
    remoteWorkScore: 5,
    notes:
      "Placeholder estimate suggests basic connectivity may be possible in some areas, but a backup plan is strongly recommended.",
    lastUpdated: "2026-06-03",
  },
  {
    slug: "cloudland-canyon-state-park",
    name: "Cloudland Canyon West Rim Campground",
    parkName: "Cloudland Canyon State Park",
    city: "Rising Fawn",
    state: "Georgia",
    latitude: 34.8254,
    longitude: -85.4892,
    carrierScores: [
      { carrier: "Verizon", score: 4 },
      { carrier: "AT&T", score: 5 },
      { carrier: "T-Mobile", score: 3 },
    ],
    remoteWorkScore: 3,
    notes:
      "Placeholder estimate suggests weaker coverage in more remote terrain; plan for offline use unless you verify signal ahead of time.",
    lastUpdated: "2026-06-03",
  },
  {
    slug: "vogel-state-park",
    name: "Vogel State Park Campground",
    parkName: "Vogel State Park",
    city: "Blairsville",
    state: "Georgia",
    latitude: 34.7651,
    longitude: -83.9154,
    carrierScores: [
      { carrier: "Verizon", score: 5 },
      { carrier: "AT&T", score: 4 },
      { carrier: "T-Mobile", score: 2 },
    ],
    remoteWorkScore: 4,
    notes:
      "Estimated coverage may be somewhat better near developed access areas, but this record is not verified enough to rely on for work.",
    lastUpdated: "2026-06-03",
  },
  {
    slug: "tallulah-gorge-state-park",
    name: "Tallulah Gorge Campground",
    parkName: "Tallulah Gorge State Park",
    city: "Tallulah Falls",
    state: "Georgia",
    latitude: 34.7337,
    longitude: -83.3944,
    carrierScores: [
      { carrier: "Verizon", score: 7 },
      { carrier: "AT&T", score: 6 },
      { carrier: "T-Mobile", score: 5 },
    ],
    remoteWorkScore: 6,
    notes:
      "Placeholder estimate suggests moderate coverage near more developed park areas; verify before planning calls or uploads.",
    lastUpdated: "2026-06-03",
  },
  {
    slug: "unicoi-state-park",
    name: "Unicoi State Park Campground",
    parkName: "Unicoi State Park",
    city: "Helen",
    state: "Georgia",
    latitude: 34.7072,
    longitude: -83.7165,
    carrierScores: [
      { carrier: "Verizon", score: 7 },
      { carrier: "AT&T", score: 7 },
      { carrier: "T-Mobile", score: 5 },
    ],
    remoteWorkScore: 7,
    notes:
      "Estimated balanced coverage for the main campground area, but this remains a low-confidence planning record until verified.",
    lastUpdated: "2026-06-03",
  },
  {
    slug: "red-top-mountain-state-park",
    name: "Red Top Mountain Campground",
    parkName: "Red Top Mountain State Park",
    city: "Cartersville",
    state: "Georgia",
    latitude: 34.1419,
    longitude: -84.7074,
    carrierScores: [
      { carrier: "Verizon", score: 8 },
      { carrier: "AT&T", score: 8 },
      { carrier: "T-Mobile", score: 6 },
    ],
    remoteWorkScore: 8,
    notes:
      "Placeholder planning data suggests this may be one of the stronger options in the current MVP set, but it is not a verified coverage guarantee.",
    lastUpdated: "2026-06-03",
  },
  {
    slug: "amicalola-falls-state-park",
    name: "Amicalola Falls Campground",
    parkName: "Amicalola Falls State Park",
    city: "Dawsonville",
    state: "Georgia",
    latitude: 34.562,
    longitude: -84.2491,
    carrierScores: [
      { carrier: "Verizon", score: 6 },
      { carrier: "AT&T", score: 6 },
      { carrier: "T-Mobile", score: 4 },
    ],
    remoteWorkScore: 6,
    notes:
      "Estimated moderate service for planning purposes only; verify before depending on this site for steady work connectivity.",
    lastUpdated: "2026-06-03",
  },
  {
    slug: "black-rock-mountain-state-park",
    name: "Black Rock Mountain Campground",
    parkName: "Black Rock Mountain State Park",
    city: "Mountain City",
    state: "Georgia",
    latitude: 34.9067,
    longitude: -83.4128,
    carrierScores: [
      { carrier: "Verizon", score: 6 },
      { carrier: "AT&T", score: 5 },
      { carrier: "T-Mobile", score: 3 },
    ],
    remoteWorkScore: 5,
    notes:
      "Placeholder estimate suggests variable coverage across the mountain terrain; treat this as a rough planning aid and verify independently.",
    lastUpdated: "2026-06-03",
  },
  {
    slug: "skidaway-island-state-park",
    name: "Skidaway Island Campground",
    parkName: "Skidaway Island State Park",
    city: "Savannah",
    state: "Georgia",
    latitude: 31.9363,
    longitude: -81.0495,
    carrierScores: [
      { carrier: "Verizon", score: 9 },
      { carrier: "AT&T", score: 8 },
      { carrier: "T-Mobile", score: 7 },
    ],
    remoteWorkScore: 9,
    notes:
      "Placeholder planning data suggests relatively stronger coverage than most current MVP records, but it still has not been field-verified.",
    lastUpdated: "2026-06-03",
  },
];

export const campsiteSignalCampgrounds = normalizeCampgroundSignalRecords(
  placeholderCampgroundSignalSourceRecords,
);
