# Campsite Signal Finder Source Strategy

## Goal

This document outlines a practical plan for moving Campsite Signal Finder from
placeholder planning data toward source-backed and field-informed signal scores.

## Candidate source types

### FCC coverage or broadband datasets

Pros:

- public-interest oriented source category
- potentially broad geographic coverage
- useful as a baseline signal-availability input

Cons:

- may not map cleanly to campsite-level reality
- can be coarse compared to on-the-ground campground conditions
- may lag behind real-world carrier changes

Legal and usage caution:

- confirm dataset license terms and permitted downstream use before product
  integration

Expected reliability:

- medium baseline reliability when used as one signal input, not as a final
  campsite guarantee

### Carrier coverage maps

Pros:

- direct carrier-provided coverage claims
- useful for per-carrier comparisons
- often available for LTE/5G distinction at a broad level

Cons:

- optimistic by nature
- often generalized rather than campsite-specific
- terrain, congestion, and foliage can materially reduce actual performance

Legal and usage caution:

- do not scrape or ingest carrier-map data unless terms clearly allow it

Expected reliability:

- medium reliability as a directional input, not as verified truth

### Public campground datasets

Pros:

- helpful for canonical campground identity, park names, coordinates, and site
  context
- useful for joining signal data to campground records

Cons:

- generally not a signal source by themselves
- data quality varies across agencies and publishers

Legal and usage caution:

- confirm reuse permissions for each source

Expected reliability:

- high for identity fields when well-maintained, but not a direct signal input

### Manual field tests

Pros:

- closest to real campsite experience
- can capture terrain and developed-area differences
- supports honest overrides when source maps are wrong

Cons:

- expensive and slow to collect
- hard to scale across many parks
- results can age quickly

Legal and usage caution:

- ensure collection process is safe, consistent, and documented

Expected reliability:

- high when recent, methodical, and tied to a specific location

### User-submitted reports or speed tests

Pros:

- can scale better than manual in-house testing
- useful for recency and real-world anecdotal validation

Cons:

- quality and honesty vary
- subjective reports can conflict
- device, carrier plan, and hotspot setup can skew results

Legal and usage caution:

- require transparent consent and moderation policies before collecting or
  publishing submissions

Expected reliability:

- medium to high when moderated, recent, and corroborated

## Confidence level assignment

- `low`: placeholder, inferred, stale, sparse, or single-source planning data
- `medium`: multiple directional inputs agree, but there is still meaningful
  uncertainty at campsite level
- `high`: recent field-tested or strongly corroborated data supports the score

Suggested guidance:

- FCC-only or carrier-map-only inputs should usually stay `medium` at most
- a high confidence score should normally require field-test evidence or
  multiple corroborating sources plus strong recency

## Proposed Version 1 source-backed scoring model

Keep the future scoring simple and transparent. A first version can combine:

- baseline availability by carrier
- relative source reliability
- recency of the source
- technology indicator when available, such as LTE vs 5G
- terrain/context caution flags
- field-test overrides when present

Example draft formula:

1. Start with a baseline carrier score from the strongest allowed directional
   source input.
2. Apply a source reliability weight.
3. Apply a recency adjustment.
4. Apply a terrain/context penalty if the campground is known to be mountainous,
   forested, remote, or highly variable.
5. Apply a field-test override when recent field evidence exists.
6. Round to a transparent 0-10 score rather than pretending to precise Mbps
   certainty.

## Data to store per carrier

Future per-carrier records should ideally store:

- carrier name
- normalized score
- source type
- source label
- source date or verification date
- confidence level
- technology note, if available
- optional field-test summary
- optional user-report count or corroboration note

## Communicating uncertainty to users

The UI should continue to:

- distinguish planning estimates from verified data
- show source label and confidence level directly on records
- avoid claiming campsite-level certainty when only regional map data exists
- explain that terrain, congestion, weather, foliage, and device differences
  can materially change results

## Proposed reliability weights

Current scaffolding aligns with these draft weights:

- `placeholder`: `0.1`
- `fcc`: `0.5`
- `carrier-map`: `0.6`
- `field-test`: `0.9`
- `user-report`: `0.7`

These are planning values only and should be revised once real integrations and
validation rules exist.
