import { ModelVersion } from "../lib/types";
import { ModelEntity, ModelParameter } from "./types";

export const countryDefault = "world";

export const modelEntities: ModelEntity[] = [
  {
    id: "country/china",
    label: "China",
  },
  {
    id: "country/italy",
    label: "Italy",
  },
  {
    id: "country/spain",
    label: "Spain",
  },
  {
    id: "country/portugal",
    label: "Portugal",
  },
  {
    id: `country/${countryDefault}`,
    label: "World",
    default: true,
  },
];

export const modelParameters: ModelParameter[] = [
  {
    id: "emissionFactor/material/cotton/standard",
    label: "Cotton",
    source: "N/A",
    value: 8.02,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/material/cotton/standard",
    label: "Cotton, conventional",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 16.217,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/cotton/organic",
    label: "Cotton, organic",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.356,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/italy`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/cotton/recycled",
    label: "Cotton, recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.265,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/spain`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/cotton/recycled",
    label: "Cotton, recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.28,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/portugal`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/linen/organic",
    label: "Linen, organic",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.356,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/italy`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/mixCotton50Linen50/organic",
    label: "Mix cotton/linen (50/50), organic",
    source: "Using corresponding emission factors to calculate the mix result.",
    value: 4.356,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/italy`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/mixPolyester50Cotton50/recycled",
    label: "Mix polyester/cotton (50/50), recycled",
    source: "Using corresponding emission factors to calculate the mix result.",
    value: 4.4055,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/spain`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/mixPolyester50Cotton50/recycled",
    label: "Mix polyester/cotton (50/50), recycled",
    source: "Using corresponding emission factors to calculate the mix result.",
    value: 4.4205,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/portugal`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/standard",
    label: "Polyester, standard",
    source:
      "[Kering database, Raw Material Intensities 2020](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=polyester&refine.impact_country=China&refine.environmental_impact_group=GHGs): Extraction(0.415)+SpinningWeavingAndDyeing(14.697)+Processing(14.217)=29.329",
    value: 29.329,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/standard",
    label: "Polyester, standard",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 8.543,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/spain"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/standard",
    label: "Polyester, standard",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.561,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/recycled",
    label: "Polyester, recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.546,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/spain`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/recycled",
    label: "Polyester, recycled",
    source: "Kering database, Raw Material Intensities 2019",
    value: 26.676,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/material/polyester/recycled",
    label: "Polyester, recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.561,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/recycled",
    label: "Polyester, recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 26.676,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/mixRecycled25",
    label: "Polyester, 25% recycled",
    source:
      "Calculating mix using emission factors from 'polyester/recycled' and 'polyester/standard'.",
    value: 28.66575,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/mixRecycled69",
    label: "Polyester, 69% recycled",
    source:
      "Calculating mix using emission factors from 'polyester/recycled' and 'polyester/standard' for Portugal.",
    value: 4.561,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/mixRecycled70",
    label: "Polyester, 70% recycled",
    source:
      "Calculating mix using emission factors from 'polyester/recycled' and 'polyester/standard' for Portugal.",
    value: 4.561,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyester/mixRecycled70",
    label: "Polyester, 70% recycled",
    source:
      "Calculating mix using emission factors from 'polyester/recycled' and 'polyester/standard' for China.",
    value: 27.4719,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/standard",
    label: "Rubber, standard",
    source: "N/A",
    value: 0.38,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
    deprecated: true,
  },
  {
    id: "emissionFactor/material/rubber/natural",
    label: "Rubber, natural",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 0.534,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/material/rubber/synthetic",
    label: "Rubber, synthetic",
    source:
      "Kering database, Raw Material Intensities 2020 (https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/)",
    value: 5.844,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/material/rubber/synthetic",
    label: "Rubber, synthetic",
    source:
      "Kering database, Raw Material Intensities 2020 (https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/)",
    value: 1.529,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/spain"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/synthetic",
    label: "Rubber, synthetic",
    source: "Unknown",
    value: 1.529,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/italy"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/synthetic",
    label: "Rubber, synthetic",
    source:
      "Figure is not associated with a particular geography yet it seems it can be used as an average. https://www.jatma.or.jp/english/tyrerecycling/pdf/lcco2guideline_en.pdf also used in https://core.ac.uk/download/pdf/196556605.pdf",
    value: 2.41,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/recycled",
    label: "Rubber, recycled",
    source: "Using the value for synthetic rubber for Italy and Spain",
    value: 1.529,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/recycled40synthetic60",
    label: "Rubber, 40% recycled / 60% synthetic",
    source: "N/D",
    value: 1.2844,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/material/rubber/mixRecycled95Natural5",
    label: "Rubber, 95% recycled / 5% natural",
    source: "Used value for natural rubber from China",
    value: 5.844,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/china`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/mixRecycled70Natural30",
    label: "Rubber, 70% recycled / 30% natural",
    source: "Used value for natural rubber from China",
    value: 0.534,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/mixNatural70Recycled30",
    label: "Rubber, 70% natural / 30% recycled",
    source: "Used value for natural rubber from China",
    value: 0.534,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/mixNatural50Synthetic50",
    label: "Rubber, 50% natural / 50% synthetic",
    source: "Calculated from the corresponding emission factors",
    value: 1.0315,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/spain"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/mixNatural60Recycled40",
    label: "Rubber, 60% natural / 40% recycled",
    source: "Calculated from the corresponding emission factors",
    value: 1.2844,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/mixSynthetic70Natural30",
    label: "Rubber, 70% synthetic / 30% natural",
    source: "Calculated from the corresponding emission factors",
    value: 1.2305,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/mixSynthetic80Recycled20",
    label: "Rubber, 80% synthetic / 20% recycled",
    source: "Calculated from the corresponding emission factors",
    value: 1.529,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/spain"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/mixSynthetic80Recycled20",
    label: "Rubber, 80% synthetic / 20% recycled",
    source: "Calculated from the corresponding emission factors",
    value: 2.41,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/nylon/standard",
    label: "Nylon",
    source:
      "Kering database, Raw Material Intensities 2019 (https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/)",
    value: 96.94,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/material/polyurethan/standard",
    label: "Polyurethan",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 10.374,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/material/polyethylene/recycled",
    label: "PE, recycled (Polyethylene)",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 1.48,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/china`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyethylene/recycled",
    label: "PE, recycled (Polyethylene)",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 0.397,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/italy`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyethylene/recycled",
    label: "PE, recycled (Polyethylene)",
    source: "Using value for Italy",
    value: 0.397,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/portugal`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyethyleneTerephtalate/recycled",
    label: "PET, recycled (Polyethylene Terephtalate)",
    source: "Unknown",
    value: 1.48,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/china`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyethyleneTerephtalate/recycled",
    label: "PET, recycled (Polyethylene Terephtalate)",
    source: "Using the same value as PE, recycled, from Italy",
    value: 0.397,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/italy`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyethyleneTerephtalate/recycled",
    label: "PET, recycled (Polyethylene Terephtalate)",
    source: "Using the same value as PE, recycled, from Italy",
    value: 0.397,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/portugal`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/eva/standard",
    label: "EVA (Ethylene Vinyl Acetate)",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 7.789,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/material/eva/standard",
    label: "EVA (Ethylene Vinyl Acetate)",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 7.789,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/eva/standard",
    label: "EVA (Ethylene Vinyl Acetate)",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 2.238,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/eva/standard",
    label: "EVA (Ethylene Vinyl Acetate)",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 2.238,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/italy"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/eva/mixRecycled50",
    label: "EVA, 50% recycled (Ethylene Vinyl Acetate)",
    source:
      "Used data to calculate the mix from Kering database, Raw Material Intensities 2020. The figure is actually for EVA and for Spain. Portugal data is missing and Portugal and Italy have similar carbon intensity of their electricity",
    value: 2.238,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather, cattle",
    source:
      "Kering database, Raw Material Intensities 2020 (https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/)",
    value: 23.406,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
    // TODO: check it's a correct default value for world
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather, cattle",
    source:
      "Kering database, Raw Material Intensities 2020 (https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/)",
    value: 23.406,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/china`],
    version: ModelVersion.version_0_2_0,
    // TODO: check it's a correct default value for world
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather, cattle",
    source:
      "A cow weights 700kg => 7 910kgCO2 per animal.  Skins and hides account for 3.5% => 276.85 kgCO2eq per animal for the skins and hides. There are 4.0-4.5m² of skins/hides per animal thanks to 'A full cowhide is typically around 50 square feet.' (https://www.reddit.com/r/Leathercraft/comments/9df6k0/how_much_leather_does_on_cow_typically_produce/). => 65.14kgCO2/m² of leather => 1m² of leather is 7.41kg (p8 of https://ec.europa.eu/environment/eussd/smgp/pdf/PEFCR_leather.pdf) so we got 65.14kgCO2/m² <=> 8.79kgCO2/kg of leather => adding the tannery which stands at 1.049kgCO2 (Kering), we got the full Emission Factor for Leather: 9.84kgCO2/kg",
    value: 9.84,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/portugal`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather, cattle",
    source:
      "Emission factors for Leather/Beef/Italy from [Kering database, Raw Material Intensities 2020](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/): 16.883 (Rearing) + 0.513 (Slaughter) + 0.866 (Tanning RH_WB)",
    value: 18.262,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/italy"],
    version: ModelVersion.version_0_2_1,
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather, cattle",
    source:
      "No specific emission factor available for Portugal. Using the value for Italy.",
    value: 18.262,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_1,
  },
  {
    id: "emissionFactor/material/leather/cattle/recycled",
    label: "Leather, cattle, recycled",
    source: "Using the value for cattle leather produced in Portugal",
    value: 9.84,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/portugal`],
    version: ModelVersion.version_0_2_0,
  },

  {
    id: "emissionFactor/material/leather/cactus",
    label: "Leather, cactus",
    source:
      "Sami.co proprietary research. Cactus leather stands at 1.02kgCO2eq per pair of shoes while cactus leathers represents approximately 147gr. Cactus leather emission factor is then about 6.94kgCO2/kg. Based on cactus leather produced in Portugal.",
    value: 6.94,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`], // though the source is for a material produced in Portugal, since that's the only value we have, we make it our default value
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/leather/vegan",
    label: "Leather, vegan",
    source:
      "Average vegan leather emissions stand at 6.6 kgCO2eq/m² (TODO: public source needed, we used Sami.eco's data). Since PEFCR indicates an average of 4.63 kg/m² for leather, we can take 1.42 kgCO2/kg of material as emission factor for vegan leather before tannery. Adding the tannery the result stands at 2.42 kgCO2/kg.",
    value: 2.42,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/leather/vegetan",
    label: "Leather, vegetan",
    source:
      'Using Portugal\'s "leather/cattle" emission factor. Removed 1.049 kgCO2eq/kg for the tanning process in Portugal (value from Kering database, Raw Material Intensities 2020 (https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/).',
    value: 8.791,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
    deprecated: true,
    replacedBy: "emissionFactor/material/leather/cattle/vegetan",
  },
  {
    id: "emissionFactor/material/leather/cattle/vegetan",
    label: "Leather, cattle, vegetan",
    source:
      "Emission factors for Leather/Beef/Italy from [Kering database, Raw Material Intensities 2020](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/): 16.883 (Rearing) + 0.513 (Slaughter) + 0.637 (Tanning RH_WB Metal-free)",
    value: 18.033,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/italy"],
    version: ModelVersion.version_0_2_1,
  },
  {
    id: "emissionFactor/material/leather/cattle/vegetan",
    label: "Leather, cattle, vegetan",
    source:
      "No specific emission factor available for Portugal. Using the value for Italy.",
    value: 18.033,
    unit: "kgCO2eq/kg",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_1,
  },
  {
    id: "emissionFactor/material/leather/wine",
    label: "Leather, wine",
    source: "Using the emission factor for vegan leather.",
    value: 2.42,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/microsuede",
    label: "Microsuede",
    source: "Unknown. Using the 'unidentified/shoesMix' emission factor.",
    value: 5.92,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/unidentified/shoesMix",
    label: "Unidentified - Shoes mix",
    source: "Carbonfact",
    value: 5.92,
    unit: "kgCO2eq/kg",
    connectedEntityIds: [`country/${countryDefault}`],
    comments:
      "This value is used to represent the emissions of unknown materials in our shoes model. It has been defined using the mean of the aggregate emission per kg of final product for 2 generic shoes LCA in ADEME BaseImpact database: leather shoes and cotton shoes.\n\nThe materials for the leather shoes represent a total of 3.06 kgCO2eq (NB: ADEME's model doesn't include the cattle stock raising in the material's emissions) and weight 0.8 kg. The emission factor is thus 3.06 / 0.8 = 3.82 kgCO2eq/kg.\n\nFor the cotton shoes, the emission factor is 4.81 / 0.6 = 8.02 kgCO2eq/kg.\n\nThe result is then (3.82 + 8.02) / 2 = 5.92.",
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source: "Unknown",
    value: 0.6,
    unit: "kgCO2eq/kWh",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "https://www.statista.com/statistics/1190081/carbon-intensity-outlook-of-australia/",
    value: 0.656,
    unit: "kgCO2eq/kWh",
    connectedEntityIds: ["country/australia"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "https://www.eea.europa.eu/data-and-maps/indicators/overview-of-the-electricity-production-3/assessment-1",
    value: 0.21,
    unit: "kgCO2eq/kWh",
    connectedEntityIds: ["country/spain"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "https://www.eea.europa.eu/data-and-maps/indicators/overview-of-the-electricity-production-3/assessment-1",
    value: 0.233,
    unit: "kgCO2eq/kWh",
    connectedEntityIds: ["country/italy"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "https://www.eea.europa.eu/data-and-maps/indicators/overview-of-the-electricity-production-3/assessment-1",
    value: 0.255,
    unit: "kgCO2eq/kWh",
    connectedEntityIds: ["country/portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: `emissionFactor/energy/electricity`,
    label: `Electricity`,
    source: "N/A",
    value: 0.6,
    unit: "kgCO2eq/kWh",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/manufacturing/shoes/energyConsumption/electricity",
    label: "Electricity consumed for manufacturing a pair of shoes",
    source: "ADEME BaseImpact",
    value: 6.0,
    unit: "kWh",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/use/shoes",
    label: "Emissions for the use of a pair of shoes",
    source:
      "Most references ignore the impact of using shoes or have a very low value. We chose to set it to 0.",
    value: 0,
    unit: "kgCO2eq",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/use/shoes",
    label: "Emissions for the use of a pair of shoes",
    source: "Missing",
    value: 1.5,
    unit: "kgCO2eq",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/distribution/shoes",
    label: "Emissions for the distribution of a pair of shoes from China",
    source:
      "Fixed amount for a shoe made in China, according to AllBirds report",
    value: 2.0,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/distribution/shoes",
    label: "Emissions for the distribution of a pair of shoes from China",
    source:
      "13 % * (12 000 km * ((0.7+0.2) / 1 000) t * 0.60 kgCO2eq/t.km) + 87 % * (18 000 km * ((0.7+0.2) / 1 000) t * 0.015 kgCO2eq/t.km). 13 % airplane, 87 % boat (source ADEME BaseImpact LCA for shoes). Emission factors from https://easac.eu/fileadmin/PDF_s/reports_statements/Decarbonisation_of_Tansport/EASAC_Decarbonisation_of_Transport_FINAL_March_2019.pdf",
    value: 1.05381,
    unit: "kgCO2eq",
    connectedEntityIds: ["country/china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: `fixedValue/lifeCycleAnalysisStep/distribution/shoes`,
    label:
      "Emissions for the distribution of a pair of shoes not manufactured in China",
    source: "Unknown",
    value: 0.6,
    unit: "kgCO2eq",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: `fixedValue/lifeCycleAnalysisStep/distribution/shoes`,
    label:
      "Emissions for the distribution of a pair of shoes not manufactured in China",
    source:
      "2 500 km * 0.9 kg (0.7 shoes + 0.2 packaging) * 0.06 kgCO2eq/t.km. Source for truck emission factor (0.06 kgCO2eq/t.km: https://easac.eu/fileadmin/PDF_s/reports_statements/Decarbonisation_of_Tansport/EASAC_Decarbonisation_of_Transport_FINAL_March_2019.pdf).",
    value: 0.135,
    unit: "kgCO2eq",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/endOfLife/shoes/withoutRecyclingProgram",
    label:
      "Emissions for the end of life of a pair of shoes, in case there is no known end-of-life recycling program.",
    source: "ADEME BaseImpact results (TODO: detail source)",
    value: 1.4,
    unit: "kgCO2eq",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/endOfLife/shoes/withRecyclingProgram",
    label:
      "Emissions for the end of life of a pair of shoes, in case there is a known end-of-life recycling program (a 50% bonus is applied - coefficient chosen arbitrarily by Carbonfact)",
    source: "N/A",
    value: 0.7,
    unit: "kgCO2eq",
    connectedEntityIds: [`country/${countryDefault}`],
    version: ModelVersion.version_0_1_0,
  },
];
