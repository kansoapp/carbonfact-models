# Shoes > Sneakers > Methodology details

## LCA breakdowns and weight in several sources

Let's review the different steps used in several life-cycle analyses for shoes and how much they account in the total footprint in several references.

### ADEME BaseImpact

According to ADEME BaseImpact LCA for a reference "fabric shoes" product model.

NB: we refer to [this document](https://docs.google.com/spreadsheets/d/1dV_kZYekUy-h6shJHynczlLRaqFaK2mQ/edit#gid=1913794051) we downloaded from ADEME BaseImpact website and uploaded to our Google Drive for easier use and sharing.

- Raw materials: 26.0%
- Raw materials transport: 1.6%
- Formatting: 21.5%
- Assembling and distribution: 44.4%
- Use: 0.0%
- End-of-life: 6.6%

In more details:

- Raw materials:
  - Production of raw materials: 26%
- Raw materials transport:
  - Truck: 1.6%
  - Train: 0.0%
  - Boat: 0.0%
  - Plane: 0.0%
- Formatting:
  - Formatting steps: 19.4%
  - Intermediate processes: 0.0%
  - Intermediate transport: 2.1%
- Assembling and distribution:
  - Assembling: 23.3%
  - Distribution: 21.1%
  - Storage in warehouses: 0.0%
  - Storage in retail stores: 0.0%
- Use:
  - Products: 0.0%
  - Energy: 0.0%
- End-of-life:
  - Production losses: 1.0%
  - Collecting and sorting: 0.1%
  - Disposal: 5.5%

### MIT Manufacturing-Focused Emissions Reductions in Footwear Production

[Source](https://dspace.mit.edu/bitstream/handle/1721.1/102070/Olivetti_Manufacturing-focused.pdf?sequence=1&isAllowed=y)

Total footprint: 14 ± 2.7 kgCO2eq

- Materials: 4.0 ± 0.36 kgCO2eq (28.6 %)
- Manufacturing: 9.7 ± 2.7 kgCO2eq (69.3 %)
- Transport: 0.25 kgCO2eq - data not available, approximed from a chart (< 2 %)
- Use: neglible (0.0 %)
- End-of-life: 0.25 kgCO2eq - data not available, approximed from a chart (< 2 %)

## Carbonfact's LCA breadown

We use the following steps and this is how they map to the referenced breakdowns:

- Materials: 54 % -> included
  - ADEME: Raw materials + Formatting steps (45.4 %)
  - MIT: Materials + part of Manufacturing - we take half (63.2 %)
- Assembling: 29 % -> included
  - ADEME: Assembling (23 %)
  - MIT: part of Manufacturing - we take the other half (34.6 %)
- Upstream transport: 2 % -> not included
  - ADEME: Raw materials transport + Intermediate transport (3.7 %)
  - MIT: negligible part of Transport (0.034 kgCO2eq / pair of shoes, < 0.03 %)
- Distribution: 11 % -> included
  - ADEME: Distribution (21.1 %)
  - MIT: most part of Transport (0.24 kgCO2eq, 1.7 %)
- Use: 0% -> not included
  - ADEME: Use (0.0%)
  - MIT: negligible
- End-of-life: 4 % -> included
  - ADEME: End-of-life (6.6 %)
  - MIT: Use (< 2 %)

The 2 references yield different weights for the different steps. We average both in our own breakdown to identify the most steps on which we must make our model the most accurate possible:

- Materials
- Assembling
- Distribution
