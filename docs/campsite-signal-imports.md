# Campsite Signal Finder Import Architecture

## Overview

The Campsite Signal Finder now separates raw source records from the normalized
records consumed by the UI.

## Raw vs normalized data

- Raw data lives in source-record form with a `carrierScores` array and optional
  source metadata fields.
- Normalized data is the UI-ready `CampgroundSignalEntry` shape with explicit
  `verizonScore`, `attScore`, `tmobileScore`, recommendation text, and source
  transparency fields.

## Why imports are not connected yet

This architecture prepares the project for future source-backed imports without
connecting to external APIs, coverage maps, or scraping workflows yet.

## Current module structure

- `types.ts`: raw and normalized type definitions
- `scoring.ts`: score validation and recommendation mapping
- `sources.ts`: source metadata defaults and formatting helpers
- `normalize.ts`: slug generation, carrier normalization, and record
  normalization
- `search.ts`: search and carrier-filter helpers
- `data.ts`: current raw placeholder records plus normalized exported dataset
- `index.ts`: stable public import surface for the UI

## Normalization responsibilities

The normalizer currently:

- validates score ranges stay between `0` and `10`
- generates or validates slugs
- normalizes carrier names into the supported internal set
- applies placeholder source metadata defaults when none are provided
- calculates recommendation text from remote work score
- returns the normalized shape used by the existing UI

## Future import flow

Future source-backed imports should:

1. produce raw campground source records
2. pass those records through the normalizer
3. export normalized records for the UI to read

The UI should continue reading from the normalized dataset rather than from raw
source inputs directly.
