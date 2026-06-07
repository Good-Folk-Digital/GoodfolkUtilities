# Campsite Signal Finder Data Notes

## What the MVP scores represent

The current Campsite Signal Finder dataset uses placeholder planning scores for
an MVP Georgia campground set. These values are meant to help users compare
campgrounds at a rough planning level before booking or traveling.

## What the MVP scores do not represent

These scores are not verified carrier measurements. They are not based on live
tower telemetry, validated speed tests, guaranteed carrier-map ingestion, or
field-tested campsite-by-campsite connectivity checks.

Users should treat the current scores as a rough planning aid, not a guarantee
of campsite connectivity for work, streaming, hotspots, or emergency access.

## Current source metadata

The current MVP records use:

- `sourceType: "placeholder"`
- `sourceLabel: "MVP planning estimate"`
- `confidenceLevel: "low"`
- `lastVerified: null`

## Future source types

Future source-backed records may use source types such as:

- `fcc`
- `carrier-map`
- `field-test`
- `user-report`

These should only be used when the record has actually been supported by that
source class.

## Confidence level guidance

- `low`: Placeholder, incomplete, inferred, or weakly supported planning data
- `medium`: Partially supported by source-backed coverage inputs, but still
  uncertain or incomplete
- `high`: Strongly supported by recent, source-backed data and/or reliable
  field validation

## Future verified scoring reminder

Future verified or semi-verified scores should be derived from source-backed
coverage data, field testing, or clearly labeled user-reported evidence. The UI
should continue to communicate uncertainty honestly whenever the underlying data
is incomplete, stale, inferred, or mixed-source.
