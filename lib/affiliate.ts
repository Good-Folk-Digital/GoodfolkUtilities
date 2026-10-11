/**
 * Affiliate recommendations shown on tool pages.
 *
 * HOW TO USE:
 * 1. Join the affiliate programs listed in AFFILIATE_PROGRAMS below.
 * 2. Replace each `url` placeholder with your real affiliate link.
 * 3. Redeploy. The box appears automatically on matching tool pages.
 *
 * To disable a category, set its entry to `null`.
 * FTC: the box always renders an affiliate disclosure next to the link.
 */

export type AffiliateRecommendation = {
  /** Short label above the card, e.g. "Recommended" */
  label: string;
  /** Product or service name */
  title: string;
  /** One or two sentences tying it to the calculator the visitor just used */
  blurb: string;
  /** Call-to-action button text */
  cta: string;
  /** REPLACE with your affiliate link */
  url: string;
};

/**
 * Programs to join (all free to join, pay per signup/sale):
 * - Finance/Business: QuickBooks Affiliate Program (via Impact),
 *   Xero partner program, or FreshBooks affiliates.
 * - Home/moving: Amazon Associates (moving supplies, boxes, tape).
 * - Travel: VisitorsCoverage or Travelpayouts (travel insurance).
 * - Student: Amazon Associates (dorm/school supplies).
 */
export const AFFILIATE_URLS = {
  accounting: "https://example.com/REPLACE-WITH-QUICKBOOKS-AFFILIATE-LINK",
  movingSupplies: "https://example.com/REPLACE-WITH-AMAZON-MOVING-LINK",
  travelInsurance: "https://example.com/REPLACE-WITH-TRAVEL-INSURANCE-LINK",
  studentSupplies: "https://example.com/REPLACE-WITH-AMAZON-STUDENT-LINK",
} as const;

/**
 * Keyed by the `line` prop used in components/ToolPage.tsx.
 * Categories without a natural affiliate fit are omitted (no box renders).
 */
export const RECOMMENDATIONS: Record<string, AffiliateRecommendation | null> = {
  "Goodfolk Finance Utilities": {
    label: "Recommended",
    title: "QuickBooks",
    blurb:
      "Done calculating by hand? QuickBooks tracks expenses, invoices, and cash flow automatically — built for the same numbers you just ran.",
    cta: "Try QuickBooks",
    url: AFFILIATE_URLS.accounting,
  },
  "Goodfolk Business Utilities": {
    label: "Recommended",
    title: "QuickBooks",
    blurb:
      "If you're pricing jobs and margins here, QuickBooks keeps the books behind those numbers without the spreadsheet juggling.",
    cta: "Try QuickBooks",
    url: AFFILIATE_URLS.accounting,
  },
  "Goodfolk Home Utilities": {
    label: "Recommended",
    title: "Moving supplies on Amazon",
    blurb:
      "Got your box count? Grab the actual boxes, tape, and wrap — delivered before moving day.",
    cta: "Shop moving supplies",
    url: AFFILIATE_URLS.movingSupplies,
  },
  "Goodfolk Travel Utilities": {
    label: "Recommended",
    title: "Travel insurance",
    blurb:
      "Trip planned and budgeted — protect it. Compare travel insurance plans in minutes.",
    cta: "Compare plans",
    url: AFFILIATE_URLS.travelInsurance,
  },
  "Goodfolk Student Utilities": {
    label: "Recommended",
    title: "Student essentials on Amazon",
    blurb:
      "Semester planned? Stock up on dorm and study essentials in one order.",
    cta: "Shop student essentials",
    url: AFFILIATE_URLS.studentSupplies,
  },
};

export function getRecommendation(line: string): AffiliateRecommendation | null {
  const rec = RECOMMENDATIONS[line];
  if (!rec) return null;
  // Don't render placeholder links in production by accident.
  if (rec.url.includes("example.com")) return null;
  return rec;
}
