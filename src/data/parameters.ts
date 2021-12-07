import { ModelVersion } from "../types";
import { ModelParameter } from "../legacy/types";

export const modelParameters: ModelParameter[] = [
  {
    id: "emissionFactor/material/cotton/standard",
    label: "Cotton, conventional",
    source:
      "Using value for 'Cotton - Conventional' for China from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+conventional&refine.impact_country=China). 2.100 (Crop farming) + 0.871 (Ginning) + 13.246 (Spinning Weaving and Dyeing): 6.945.",
    value: 16.217,
    unit: "kgCO2eq/kg",
    countryIds: ["china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/cotton/standard",
    label: "Cotton - Conventional",
    source:
      "Using value for 'Cotton - Conventional' for Portugal from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+conventional&refine.impact_country=Portugal). 2.282 (Crop farming) + 0.383 (Ginning) + 4.280 (Spinning Weaving and Dyeing): 6.945.",
    value: 6.945,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_3_0,
  },
  {
    id: "emissionFactor/material/cotton/standard",
    label: "Cotton - Conventional",
    source:
      "Using value for 'Cotton - Conventional' for Vietnam from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+conventional&refine.impact_country=Vietnam). 5.583 (Crop farming) + 0.640 (Ginning) + 13.246 (Spinning Weaving and Dyeing for China): 19.469.",
    value: 19.469,
    unit: "kgCO2eq/kg",
    countryIds: ["vietnam"],
    version: ModelVersion.version_0_5_0,
    comments:
      "No value for 'Spinning Weaving and Dyeing' step in Vietnam, using China's.",
  },
  {
    id: "emissionFactor/material/cotton/standard",
    label: "Cotton - Conventional",
    source:
      "Using value for 'Cotton - Conventional' for Peru from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+conventional&refine.impact_country=Peru). 3.147 (Crop farming) + 0.539 (Ginning) + 13.246 (Spinning Weaving and Dyeing for China): 16.932",
    value: 16.932,
    unit: "kgCO2eq/kg",
    countryIds: ["peru"],
    version: ModelVersion.version_0_5_0,
    comments:
      "No value for 'Spinning Weaving and Dyeing' step in Peru, using China's.",
  },
  {
    id: "emissionFactor/material/cotton/organic",
    label: "Cotton - Organic",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.356,
    unit: "kgCO2eq/kg",
    countryIds: ["italy"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/cotton/organic",
    label: "Cotton - Organic",
    source:
      "[Kering Group database](https://kering-group.opendatasoft.com) for 'Cotton - Organic':\n- Crop farming: 1.447 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton&refine.impact_country=Spain&refine.processstep=Crop+farming))\n- Ginning: 0.491 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+organic&refine.impact_country=Spain&refine.processstep=Ginning))\n- Spinning, weaving and dyeing: 2.652 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+organic&refine.impact_country=Spain&refine.processstep=Spinning+Weaving+and+Dyeing))",
    value: 4.59,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_3_0,
  },
  {
    id: "emissionFactor/material/cotton/organic",
    label: "Cotton - Organic",
    source:
      "[Kering Group database](https://kering-group.opendatasoft.com) for 'Cotton - Organic':\n- Crop farming (no value for Portugal, using value for Spain): 1.447 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+organic&refine.processstep=Crop+farming&refine.impact_country=Spain))\n- Ginning (no value for Portugal, using value for Spain): 0.491 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+organic&refine.impact_country=Spain&refine.processstep=Ginning))\n- Spinning, weaving and dyeing: 2.668 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+organic&refine.impact_country=Portugal))",
    value: 4.606,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_3_0,
  },
  {
    id: "emissionFactor/material/cotton/organic",
    label: "Cotton - Organic",
    source:
      "Using value 'Cotton - Organic' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+organic&refine.impact_country=China) for China: 1.257 (Crop Farming) + 0.855 (Ginning) + 13.246 (Spinning, Weaving & Dyeing) = 15.358",
    value: 15.358,
    unit: "kgCO2eq/kg",
    countryIds: ["china"],
    version: ModelVersion.version_0_4_0,
  },
  {
    id: "emissionFactor/material/cotton/organic",
    label: "Cotton - Organic",
    source:
      "Using value for 'Cotton - Organic' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cotton+-+organic), averaging several values for different countries. 1.92925 (Crop farming, average for 4 available african countries: Tanzania - 3.048, Zimbabwe - 0.811, Central African Republic - 3.048, Cameroun - 0.810) + 0.683 (Ginning, same value for all 4 african countries) + 13.246 (Spinning Weaving and Dyeing, using conservative China's value in the absence of any value for african countries): 15.85825",
    value: 15.85825,
    unit: "kgCO2eq/kg",
    countryIds: ["senegal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Using an average value for 4 other african countries. Fallback on China's value for 'Spinning Weaving and Dyeing' process step.",
  },
  {
    id: "emissionFactor/material/cotton/recycled",
    label: "Cotton, recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.265,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/cotton/recycled",
    label: "Cotton, recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 4.28,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/elastane",
    label: "Elastane",
    source:
      "Using value for 'Plastic - Elastane' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=elastane&refine.environmental_impact_group=GHGs): 0.297 (Extraction, China) + 20.644 (Processing, China) + 4.638 (Spininng, Weaving and Dyeing, Italy) = 25.579",
    value: 25.579,
    unit: "kgCO2eq/kg",
    countryIds: ["china"],
    version: ModelVersion.version_0_4_0,
    comments:
      "Fallback on value for 'italy' for the 'Spinning, Weaving and Dyeing' step.",
  },
  {
    id: "emissionFactor/material/linen/organic",
    label: "Linen, organic",
    source:
      "'Linen - organic' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=linen+-+organic&refine.environmental_impact_group=GHGs): 0.914 (Crop farming, using value for Belgium - none available for Portugal) + 0.298 (Ginning, using value for Belgium - none available for Portugal) + 4.356 (Spinning, Weaving and Dyeing, for Portugal) = 5.492",
    value: 5.568,
    unit: "kgCO2eq/kg",
    countryIds: ["italy"],
    version: ModelVersion.version_0_4_0,
  },
  {
    id: "emissionFactor/material/linen/standard",
    label: "Linen - Standard",
    source:
      "'Linen - conventional' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=linen+-+organic&refine.environmental_impact_group=GHGs): 0.914 (Crop farming, using value for Belgium - none available for Portugal) + 0.298 (Ginning, using value for Belgium - none available for Portugal) + 4.280 (Spinning, Weaving and Dyeing, for Portugal) = 5.492",
    value: 5.492,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_4_0,
  },
  {
    id: "emissionFactor/material/linen/organic",
    label: "Linen, organic",
    source:
      "'Linen - organic' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=linen+-+organic&refine.environmental_impact_group=GHGs): 0.914 (Crop farming, using value for Belgium - none available for Portugal) + 0.298 (Ginning, using value for Belgium - none available for Portugal) + 4.280 (Spinning, Weaving and Dyeing, for Portugal) = 5.492",
    value: 5.492,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_4_0,
  },
  {
    id: "emissionFactor/material/polyester/standard",
    label: "Polyester - Standard",
    source:
      "Using value for 'Polyester - Conventional' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyester+-+conventional). 0.415 (Extraction) + 14.217 (Processing) + 14.697 (Spinning Weaving and Dyeing) = 29.329.",
    value: 29.329,
    unit: "kgCO2eq/kg",
    countryIds: ["china"],
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "emissionFactor/material/polyester/standard",
    label: "Polyester - Standard",
    source:
      "Using value for 'Polyester - Conventional' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyester+-+conventional). 0.203 (Extraction) + 3.794 (Processing) + 4.546 (Spinning Weaving and Dyeing) = 29.329.",
    value: 8.543,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "emissionFactor/material/polyester/standard",
    label: "Polyester - Standard",
    source:
      "Using value for 'Polyester - Conventional' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyester+-+conventional). 0.203 (Extraction) + 3.794 (Processing) + 4.638 (Spinning Weaving and Dyeing) = 29.329.",
    value: 8.635,
    unit: "kgCO2eq/kg",
    countryIds: ["italy"],
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "emissionFactor/material/polyester/standard",
    label: "Polyester - Standard",
    source:
      "Using value for 'Polyester - Conventional' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyester+-+conventional). 0.203 (Extraction, value for Spain) + 3.794 (Processing, value for Spain) + 4.561 (Spinning Weaving and Dyeing) = 8.558.",
    value: 8.558,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Using values for Spain for 2 process steps (missing values for Portugal).",
  },
  {
    id: "emissionFactor/material/polyester/standard",
    label: "Polyester - Standard",
    source:
      "Using value for 'Polyester - Conventional' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyester+-+conventional). 0.203 (Extraction, value for Greece) + 3.794 (Processing, value for Greece) + 4.50075 (Spinning Weaving and Dyeing, average value for other european countries, Italy - 4.638, Portugal - 4.561, Spain - 4.546, France - 4.163, Germany - 4.832, Switzerland - 4.129, UK - 4.764, Belgium - 4.373) = 8.49775.",
    value: 8.49775,
    unit: "kgCO2eq/kg",
    countryIds: ["greece"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Using average value for european countries with data for 'Spinning Weaving and Dyeing' step.",
  },
  {
    id: "emissionFactor/material/polyester/standard",
    label: "Polyester - Standard",
    source:
      "Using value for 'Polyester - Conventional' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyester+-+conventional). 0.217 (Extraction) + 13.311 (Processing) + 14.697 (Spinning Weaving and Dyeing, value for China) = 28.225.",
    value: 28.225,
    unit: "kgCO2eq/kg",
    countryIds: ["vietnam"],
    version: ModelVersion.version_0_5_0,
    comments: "Using China's value for 'Spinning Weaving and Dyeing'.",
  },
  {
    id: "emissionFactor/material/polyester/recycled",
    label: "Polyester - Recycled",
    source:
      "Using value for 'Polyester - recycled' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyester+-+recycled). 3.205 (Processing) + 4.638 (Spinning Weaving and Dyeing) = 7.843",
    value: 7.843,
    unit: "kgCO2eq/kg",
    countryIds: ["italy"],
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "emissionFactor/material/polyester/recycled",
    label: "Polyester - Recycled",
    source:
      "Using value for 'Polyester - recycled' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyester+-+recycled). 3.205 (Processing, missing vlaue for Spain, using Italy's) + 4.546 (Spinning Weaving and Dyeing, for Spain) = 7.751",
    value: 7.751,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Fallback on Italy's value for 'Spinning Weaving and Dyeing' step.",
  },
  {
    id: "emissionFactor/material/polyester/recycled",
    label: "Polyester - Recycled",
    source:
      "Using value for 'Polyester - recycled' from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyester+-+recycled). 3.205 (Processing, missing vlaue for Spain, using Italy's) + 4.561 (Spinning Weaving and Dyeing, for Portugal) = 7.766",
    value: 7.766,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Fallback on Italy's value for 'Spinning Weaving and Dyeing' step.",
  },
  {
    id: "emissionFactor/material/polyester/recycled",
    label: "Polyester - Recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 26.676,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"],
    version: ModelVersion.version_0_5_0,
    comments: "Using China's value for other asian countries: Vietnam.",
  },
  {
    id: "emissionFactor/material/rubber/undetermined",
    label: "Rubber",
    source: "Using the value for synthetic rubber for China",
    value: 5.844,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "senegal"],
    version: ModelVersion.version_0_3_0,
    comments:
      "Fallback on material/rubber/synthetic. Using the more conservative 'synthetic' value, but could be improved by determining the mean distribution of natural/synthetic rubber in shoes. Using China's value for other countries: Senegal.",
  },
  {
    id: "emissionFactor/material/rubber/undetermined",
    label: "Rubber",
    source:
      "Using the value for synthetic rubber for european countries (from Spain's value).",
    value: 1.529,
    unit: "kgCO2eq/kg",
    countryIds: ["spain", "portugal", "italy", "greece", "france"],
    version: ModelVersion.version_0_3_0,
    comments:
      "Fallback on material/rubber/synthetic. Using the more conservative 'synthetic' value, but could be improved by determining the mean distribution of natural/synthetic rubber in shoes. Needs improvement: we're using Spain's value which is the only one available for 'rubber - synthetic' in an european country.",
  },
  {
    id: "emissionFactor/material/rubber/undetermined",
    label: "Rubber",
    source: "Using our 'rubber/synthetic' value for Vietnam.",
    value: 4.985,
    unit: "kgCO2eq/kg",
    countryIds: ["vietnam"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Fallback on 'rubber/synthetic'. Using the more conservative 'synthetic' value, but could be improved by determining the mean distribution of natural/synthetic rubber in shoes.",
  },
  {
    id: "emissionFactor/material/rubber/natural",
    label: "Rubber - Natural",
    source:
      "Using value for 'Rubber - Natural' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=rubber+-+natural). 0.021 (Production) + 0.513 (Processing) = 0.534.",
    value: 0.534,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam", "portugal", "spain", "italy", "peru"],
    version: ModelVersion.version_0_5_0,
    comments: "Using value for China for all countries.",
  },
  {
    id: "emissionFactor/material/rubber/synthetic",
    label: "Rubber - Synthetic",
    source:
      "Value from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=rubber+-+synthetic&refine.impact_country=China) for 'Rubber - synthetic' and China: 0.449 (Extraction) + 5.395 (Processing): 5.844",
    value: 5.844,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "senegal", "peru"],
    version: ModelVersion.version_0_5_0,
    comments: "Using China's value for other countries: Senegal, Peru",
  },
  {
    id: "emissionFactor/material/rubber/synthetic",
    label: "Rubber - Synthetic",
    source:
      "Value from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=rubber+-+synthetic&refine.impact_country=Vietnam) for 'Rubber - synthetic' and Vietnam: 0.449 (Extraction) + 4.536 (Processing): 4.985",
    value: 4.985,
    unit: "kgCO2eq/kg",
    countryIds: ["vietnam"],
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "emissionFactor/material/rubber/synthetic",
    label: "Rubber - Synthetic",
    source:
      "Value from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=rubber+-+synthetic&refine.impact_country=Spain) for 'Rubber - synthetic' and Spain: 0.112 (Extraction) + 1.417 (Processing): 1.529",
    value: 1.529,
    unit: "kgCO2eq/kg",
    countryIds: ["spain", "portugal", "italy", "greece", "france"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Using the value for Spain for other european countries: Portugal, Italy, Greece, France.",
  },
  {
    id: "emissionFactor/material/rubber/recycled",
    label: "Rubber, recycled",
    source: "Using the value for synthetic rubber for Spain",
    value: 1.529,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/recycled",
    label: "Rubber, recycled",
    source: "Using the value for synthetic rubber for China",
    value: 5.844,
    unit: "kgCO2eq/kg",
    countryIds: ["china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/recycled",
    label: "Rubber, recycled",
    source: "Using the value for synthetic rubber for Spain",
    value: 1.529,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/rubber/recycled",
    label: "Rubber, recycled",
    source:
      "Using 'Processing' step for 'Rubber - synthetic' in Vietnam from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=rubber&refine.impact_country=Vietnam&refine.environmental_impact_group=GHGs) in the absence of value for recycled rubber. The 'extraction' step is ignored since it's recycled material.",
    value: 4.536,
    unit: "kgCO2eq/kg",
    countryIds: ["vietnam"],
    version: ModelVersion.version_0_4_0,
  },
  {
    id: "emissionFactor/material/nylon/standard",
    label: "Nylon",
    source:
      "Value for 'Synthetic Fibers - Nylon - Conventional' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=nylon+-+conventional&refine.raw_material=Synthetic+Fibers+&refine.environmental_impact_group=GHGs&refine.impact_country=China) for China: 0.951 (Extraction) + 66.595 (Processing) + 29.394 (Spinning, Weaving and Dyeing) = 96.94",
    value: 96.94,
    unit: "kgCO2eq/kg",
    countryIds: ["china"],
    version: ModelVersion.version_0_4_0,
  },
  {
    id: "emissionFactor/material/nylon/standard",
    label: "Nylon",
    source:
      "Value for 'Synthetic Fibers - Nylon - Conventional' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=nylon+-+conventional&refine.raw_material=Synthetic+Fibers+&refine.environmental_impact_group=GHGs&refine.impact_country=Portugal) for Portugal: 0.951 (Extraction) + 18.070 (Processing) + 9.123 (Spinning, Weaving and Dyeing) = 28.144",
    value: 28.144,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_4_0,
  },
  {
    id: "emissionFactor/material/nylon/standard",
    label: "Nylon",
    source:
      "Value for 'Synthetic Fibers - Nylon - Conventional' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=Nylon+-+Conventional&refine.impact_country=Vietnam): 0.951 (Extraction) + 55.795 (Processing) + 29.394 (Spinning, Weaving and Dyeing, for China) = 86.14",
    value: 86.14,
    unit: "kgCO2eq/kg",
    countryIds: ["vietnam"],
    version: ModelVersion.version_0_5_0,
    comments: "Using China's value for 'Spinning Weaving and Dyeing' step.",
  },
  {
    id: "emissionFactor/material/polyurethane/standard",
    label: "Polyurethane",
    source:
      "Using value for 'Plastic - Polyurethane' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyurethane). 10.374 (Processing).",
    value: 10.374,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Using China's value for other asian countries: Vietnam. This value may lack other steps which are not present in the Kering's database (e.g. extraction, spinning/weaving/dyeing.",
  },
  {
    id: "emissionFactor/material/polyurethane/standard",
    label: "Polyurethane",
    source:
      "Using 'plastic - polyurethane' value from [Kering Group's database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyurethan) (no value for Greece, using value for most european countries)",
    value: 2.785,
    unit: "kgCO2eq/kg",
    countryIds: ["greece"],
    version: ModelVersion.version_0_3_0,
    comments:
      "There's only a 'processing' step in Kering's database. It may lack the 'extraction' and 'spinning/weaving/dyeing' steps.",
  },
  {
    id: "emissionFactor/material/polyurethane/standard",
    label: "Polyurethane",
    source:
      "Using 'plastic - polyurethane' value from [Kering Group's database](chttps://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyurethan&refine.impact_country=Spain)",
    value: 2.785,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_3_0,
    comments:
      "There's only a 'processing' step in Kering's database. It may lack the 'extraction' and 'spinning/weaving/dyeing' steps.",
  },
  {
    id: "emissionFactor/material/polyurethane/standard",
    label: "Polyurethane",
    source:
      "Using 'plastic - polyurethane' value from [Kering Group's database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyurethan) (no value for Portugal, using value for most european countries)",
    value: 2.785,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_3_0,
    comments:
      "There's only a 'processing' step in Kering's database. It may lack the 'extraction' and 'spinning/weaving/dyeing' steps.",
  },
  {
    id: "emissionFactor/material/polyurethane/recycled",
    label: "Polyurethane - Recycled",
    source:
      "Using 'plastic - polyurethane' value from [Kering Group's database](chttps://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyurethan&refine.impact_country=Spain). Not specific to recycled material.",
    value: 2.785,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_3_0,
    comments:
      "No specific value for recycled, this needs to be improved. There's only a 'processing' step in Kering's database. It may lack the 'extraction' and 'spinning/weaving/dyeing' steps.",
  },
  {
    id: "emissionFactor/material/polyurethane/recycled",
    label: "Polyurethane - Recycled",
    source:
      "Using 'plastic - polyurethane' value from [Kering Group's database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=polyurethan) (no value for Portugal, using value for most european countries). Not specified to recycled material.",
    value: 2.785,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_3_0,
    comments:
      "No specific value for recycled, this needs to be improved. There's only a 'processing' step in Kering's database. It may lack the 'extraction' and 'spinning/weaving/dyeing' steps.",
  },
  {
    id: "emissionFactor/material/polyethylene/recycled",
    label: "PE - Recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 1.48,
    unit: "kgCO2eq/kg",
    countryIds: ["china"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyethylene/recycled",
    label: "PE - Recycled",
    source:
      "Kering database, Raw Material Intensities 2020: https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/",
    value: 0.397,
    unit: "kgCO2eq/kg",
    countryIds: ["italy"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/polyethylene/recycled",
    label: "PE - Recycled",
    source: "Using value for Italy",
    value: 0.397,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/material/eva/standard",
    label: "EVA - Standard",
    source:
      "Values from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=eva) for 'Plastic - eva' and China: 0.226 (Extraction) + 7.563 (Processing): 7.789",
    value: 7.789,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"],
    version: ModelVersion.version_0_5_0,
    comments: "Using value for China for other asian countries: Vietnam.",
  },
  {
    id: "emissionFactor/material/eva/standard",
    label: "EVA - Standard",
    source:
      "Values from [Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=eva) for 'Plastic - eva' and Italy or France: 0.112 (Extraction) + 2.126 (Processing): 2.238",
    value: 2.238,
    unit: "kgCO2eq/kg",
    countryIds: ["italy", "portugal", "france"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Using value for Italy, France for other european countries without emission factor: Portugal, France.",
  },
  {
    id: "emissionFactor/material/eva/recycled",
    label: "EVA - Recycled",
    source: "Using our value for 'eva/standard'.",
    value: 2.238,
    unit: "kgCO2eq/kg",
    countryIds: ["italy", "portugal", "france"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Not using a specific value for recycled EVA. Using Italy's value for several european countries: Portugal, France.",
  },
  {
    id: "emissionFactor/material/eva/recycled",
    label: "EVA - Recycled",
    source: "Using our value for 'eva/standard'.",
    value: 7.789,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Using China's value for other asian countries: Vietnam. Not using a specific value for recycled EVA.",
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather - Cattle",
    source:
      "Using 'Leather - beef - calf - conventional' value from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.raw_material=Leather+-+beef+&refine.impact_country=China&refine.environmental_impact_group=GHGs&q=conventional) for China: 20.917 (Animal rearing) + 0.569 (Abattoir) + 0.866 (Tanning - RH_WB) + 1.054 (Tanning - WB_FL) = 23.406",
    value: 23.406,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Using the value for China for other countries in Asia (Vietnam).",
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather - Cattle",
    source:
      "Emission factors for Leather/Beef/Italy from [Kering database, Raw Material Intensities 2020](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/): 16.883 (Rearing) + 0.513 (Slaughter) + 0.866 (Tanning RH_WB)",
    value: 18.262,
    unit: "kgCO2eq/kg",
    countryIds: ["italy", "portugal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Value based on Italy's emission factors. Used for other european countries (Portual).",
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather - Cattle",
    source:
      "[Kering group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=leather+-+beef) value for 'Leather - beef - calf - conventional'. 'Animal rearing': 48.1535 (average for Argentina (48.110), Brazil (48.206), Chile (48.133), Paraguay (48.165) + 'Abattoir': 0.513 (same values for the 4 countries) + 'Tanning - RH_WB': 0.8635 (0.866 - Argentina, 0.861 - Brazil, 0.866 Chile, 0.861 Paraguay) + 'Tanning WB_FL': 1.054 (almost unique value for all countries available in the database, though there are no countries from South America). Total: 50.584.",
    value: 50.584,
    unit: "kgCO2eq/kg",
    countryIds: ["peru"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Creating a value by averaging values from South America countries and using a default value for Tanning WB_FL step.",
  },
  {
    id: "emissionFactor/material/leather/cattle",
    label: "Leather - Cattle",
    source:
      "Using 'Leather - beef - calf - conventional' value from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=Leather+-+beef+-+calf+-+conventional&refine.impact_country=Spain) for Spain: 16.984 (Animal rearing) + 0.513 (Abattoir) + 0.866 (Tanning - RH_WB) + 1.054 (Tanning - WB_FL) = 23.406",
    value: 19.417,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "emissionFactor/material/leather/cattle/recycled",
    label: "Leather - Cattle, recycled",
    source:
      "None at this time. For now, we arbitrarily take 20% of the emission factor for cattle leather from China (23.406 * 0.2 = 4.6812)",
    value: 4.6812,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Need to look for research material and sources to get a better emission factor. Using the value for China for other asian countries (Vietnam).",
  },
  {
    id: "emissionFactor/material/leather/cattle/recycled",
    label: "Leather - Cattle, recycled",
    source:
      "None at this time. For now, we arbitrarily take 20% of the emission factor for cattle leather from Italy (18.262 * 0.2 = 3.6524)",
    value: 3.6524,
    unit: "kgCO2eq/kg",
    countryIds: ["italy", "portugal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Need to look for research material and sources to get a better emission factor. Using the value for Italy for other european countries (Portugal).",
  },
  {
    id: "emissionFactor/material/leather/vegan/grape",
    label: "Leather - Vegan - Grape",
    description:
      "Alternative to leather, mostly made out of grape vegetal, mixed with other materials (generally polyester, polyurethan and cotton)",
    source:
      "Sami.eco LCA report for MoEA shoes. Based on 1.12 kgCO2eq estimation per pair of shoes and 0.184 kg approximate estimate for the upper's weight. 1.12/0.184 = 6.087 kgCO2eq/kg. The manufacturer of the material is not indicated (shoes produced in Portugal).",
    value: 6.087,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal", "italy"],
    version: ModelVersion.version_0_5_0,
    comments: "We don't know the country origin for this material.",
  },
  {
    id: "emissionFactor/material/leather/vegan/cactus",
    label: "Leather - Vegan - Cactus",
    description:
      "Alternative to leather, mostly made out of cactus vegetal, mixed with other materials (generally polyester, polyurethan and cotton)",
    source:
      "Sami.eco LCA report for MoEA shoes. Based on 1.02 kgCO2eq estimation per pair of shoes and 0.160 kg approximate estimate for the upper's weight. 1.02/0.160 = 6.375 kgCO2eq/kg. The manufacturer of the material is not indicated (shoes produced in Portugal).",
    value: 6.375,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_5_0,
    comments: "We don't know the country origin for this material.",
  },
  {
    id: "emissionFactor/material/leather/vegan/corn",
    label: "Leather - Vegan - Corn",
    description:
      "Alternative to leather, mostly made out of corn vegetal, mixed with other materials (generally polyester, polyurethan and cotton)",
    source:
      "Sami.eco LCA report for MoEA shoes. Based on 2.13 kgCO2eq estimation per pair of shoes and 0.560 kg approximate estimate for the upper's weight. 2.13/0.560 = 3.804 kgCO2eq/kg. The manufacturer of the material is not indicated (shoes produced in Portugal).",
    value: 3.804,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal", "spain", "italy"],
    version: ModelVersion.version_0_5_0,
    comments:
      "We don't know the country origin for this material. This emission factor may embed emission for end-of-life (recycling or incineration), which should not be the case for our current model. Using the same values for different european countries.",
  },
  {
    id: "emissionFactor/material/leather/vegan/pineapple",
    label: "Leather - Vegan - Pineapple",
    description:
      "Alternative to leather, mostly made out of pineapple vegetal, mixed with other materials (generally polyester, polyurethan and cotton)",
    source:
      "Sami.eco LCA report for MoEA shoes. Based on 1.72 kgCO2eq estimation per pair of shoes and 0.263 kg approximate estimate for the upper's weight. 1.72/0.263 = 6.540 kgCO2eq/kg. The manufacturer of the material is not indicated (shoes produced in Portugal).",
    value: 6.54,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "We don't know the country origin for this material. This emission factor may embed emission for end-of-life (recycling or incineration), which should not be the case for our current model.",
  },
  {
    id: "emissionFactor/material/leather/vegan/apple",
    label: "Leather - Vegan - Apple",
    description:
      "Alternative to leather, mostly made out of apple vegetal, mixed with other materials (generally polyester, polyurethan and cotton)",
    source:
      "Sami.eco LCA report for MoEA shoes. Based on 2.23 kgCO2eq estimation per pair of shoes and 0.160 kg approximate estimate for the upper's weight. 2.23/0.160 = 13.937 kgCO2eq/kg. The manufacturer of the material is not indicated (shoes produced in Portugal).",
    value: 13.937,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal", "spain"],
    version: ModelVersion.version_0_5_0,
    comments:
      "We don't know the country origin for this material. This emission factor may embed emission for end-of-life (recycling or incineration), which should not be the case for our current model.",
  },
  {
    id: "emissionFactor/material/leather/vegan/undetermined",
    label: "Leather - Vegan",
    description:
      "Alternative to leather, mostly made out of vegetal, mixed with other materials (generally polyester, polyurethan and cotton)",
    source:
      "Internal value calculated by average our current values for 'Leather - Vegan' (cactus, corn, pineapple, apple, grape)",
    value: 7.349,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "We don't know the country origin for this material. This emission factor may embed emission for end-of-life (recycling or incineration), which should not be the case for our current model.",
  },
  {
    id: "emissionFactor/material/leather/cattle/vegetan",
    label: "Leather - Cattle - Vegetan",
    source:
      "Emission factors for 'Leather - beef - calf - conventional' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=Leather+-+beef+-+calf+-+conventional&refine.impact_country=Italy): 16.883 (Animal rearing) + 0.513 (Slaughter) + 0.637 (Tanning RH_WB Metal-free) + 0.954 (Tanning WB_FL Metal-free): 18.987",
    value: 18.987,
    unit: "kgCO2eq/kg",
    countryIds: ["italy", "portugal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Using the value for Italy for other european countries: Portugal.",
  },
  {
    id: "emissionFactor/material/leather/cattle/vegetan",
    label: "Leather - Cattle - Vegetan",
    source:
      '[Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=leather+-+beef+-+conventional&refine.environmental_impact_group=GHGs&refine.impact_country=China), values for "Leather - beef - calf - conventional":\n- Animal rearing: 20.917\n- Abattoir: 0.569\n- Tanning RH_WB Metal-free: 0.866\nTotal: 22.352 kgCO2eq/kg.',
    value: 22.352,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"],
    version: ModelVersion.version_0_5_0,
    comments: "Using the value for Italy for other asian countries: Vietnam.",
  },
  {
    id: "emissionFactor/material/leather/synthetic",
    label: "Leather - Synthetic",
    source:
      "Using value for 'microfiber/undetermined' as a proxy (microfiber is used to produce artifical suede)",
    value: 29.329,
    unit: "kgCO2eq/kg",
    countryIds: ["china"],
    version: ModelVersion.version_0_5_0,
    comments: "Fallback to 'microfiber/undetermined'",
  },
  {
    id: "emissionFactor/material/microsuede/undetermined",
    label: "Microsuede",
    source:
      "Microsuede is a type of microfiber ([source](https://www.beanbagsrus.com.au/blog/difference-between-microsuede-microfiber/)). Without more details on the type of microfiber, we use the value for 'microfiber/undetermined'.",
    value: 29.329,
    unit: "kgCO2eq/kg",
    countryIds: ["china"],
    version: ModelVersion.version_0_5_0,
    comments: "Fallback on 'microfiber/undetermined'.",
  },
  {
    id: "emissionFactor/material/microsuede/undetermined",
    label: "Microsuede",
    source:
      "Microsuede is a type of microfiber ([source](https://www.beanbagsrus.com.au/blog/difference-between-microsuede-microfiber/)). Without more details on the type of microfiber, we use the value for 'microfiber/undetermined'.",
    value: 8.543,
    unit: "kgCO2eq/kg",
    countryIds: ["greece"],
    version: ModelVersion.version_0_5_0,
    comments: "Fallback on 'microfiber/undetermined'.",
  },
  {
    id: "emissionFactor/material/microsuede/undetermined",
    label: "Microsuede",
    source:
      "Microsuede is a type of microfiber ([source](https://www.beanbagsrus.com.au/blog/difference-between-microsuede-microfiber/)). Without more details on the type of microfiber, we use the value for 'microfiber/undetermined'.",
    value: 8.635,
    unit: "kgCO2eq/kg",
    countryIds: ["italy"],
    version: ModelVersion.version_0_5_0,
    comments: "Fallback on 'microfiber/undetermined'.",
  },
  {
    id: "emissionFactor/material/microsuede/cotton+polyester",
    label: "Microsuede - Cotton and polyester",
    source:
      "Using a weighted mean of emission factors:\n- 50% 'cotton/standard': 6.945 (source: our value for 'cotton/standard' from Portugal)\n- 50% 'polyester/standard':  8.558 (source: our value for 'polyester/standard' from Portugal)",
    value: 7.7515,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_3_0,
    comments:
      "Constructed from 'cotton/standard - Portugal' and 'polyester/standard - Portugal' emission factors.",
  },
  {
    id: "emissionFactor/material/microfiber/undetermined",
    label: "Microfiber",
    source:
      "Without details about the nature of the microfiber, we assume it's mostly made of polyester ([source Wikipedia](https://en.wikipedia.org/wiki/Microfiber)). Using our 'polyester/standard' value.",
    value: 8.558,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_5_0,
    comments: "Fallback to 'polyester/standard' for Portugal.",
  },
  {
    id: "emissionFactor/material/microfiber/undetermined",
    label: "Microfiber",
    source:
      "Without details about the nature of the microfiber, we assume it's mostly made of polyester ([source Wikipedia](https://en.wikipedia.org/wiki/Microfiber)). Using our 'polyester/standard' value.",
    value: 8.49775,
    unit: "kgCO2eq/kg",
    countryIds: ["greece"],
    version: ModelVersion.version_0_5_0,
    comments: "Fallback to 'polyester/standard' for Greece.",
  },
  {
    id: "emissionFactor/material/wood/cork",
    label: "Cork",
    source:
      "Using 'Other - cork' emission factors from [Kering Group database](https://kering-group.opendatasoft.com):\n- Production: 0.006 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cork&refine.processstep=Production&refine.impact_country=Portugal))\n- Processing: 0.127 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cork&refine.impact_country=Portugal&refine.processstep=Processing))",
    value: 0.133,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_3_0,
  },
  {
    id: "emissionFactor/material/wood/cork/recycled",
    label: "Cork - Recycled",
    source:
      "Using 'Other - cork' emission factors from [Kering Group database](https://kering-group.opendatasoft.com):\n- Production: 0.006 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cork&refine.impact_country=Spain&refine.processstep=Production))\n- Processing: 0.127 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cork&refine.impact_country=Spain&refine.processstep=Processing))",
    value: 0.133,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_3_0,
    comments:
      "Not taking into account that it is recycled in the absence of existing emission factors for it.",
  },
  {
    id: "emissionFactor/material/wool/undetermined",
    label: "Wool",
    source:
      "Using value for 'Wool - conventional' for China from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?q=wool&refine.environmental_impact_group=GHGs&refine.impact_country=China) (no specific value for Vietnam: 127.454 (Animal rearing) + 1.542 (Washing) + 14.027 (Spinning, weaving and dyeing) = 143.023",
    value: 143.023,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Fallback to 'wool/conventional'. Using China's value for other asian countries: Vietnam.",
  },
  {
    id: "emissionFactor/material/paper/cardboard",
    label: "Cardboard",
    source:
      "Using 'paper and cardboard - uncertified' values from [Kering Group database](https://kering-group.opendatasoft.com):\n- Production (no value for Portugal, using value for Italy, Spain, Belgium...): 0.779 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cardboard&refine.processstep=Production))\n- Processing (no value for Portugal, using value for Spain): 0.511 ([source](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=cardboard&refine.processstep=Processing))",
    value: 1.29,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_3_0,
    comments:
      "This could be improved by searching for a better extrapolation for the processing value than using Spain's",
  },
  {
    id: "emissionFactor/material/seaqual",
    label: "Seaqual",
    source:
      "Internally constructed. According to Seads ([source](https://seads.global/pages/espadrilles-made-of-ocean-plastic-materials)), the carbon emission of Seaqual's production is reduced by 60% when compared to a polyester yarn. Using 0.4 * our value for 'polyester - conventional' from Portugal (8.558)",
    value: 3.4232,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_3_0,
    comments:
      "The following claims on carbon footprint reduction of Seaqual by Seads ([source](https://seads.global/pages/espadrilles-made-of-ocean-plastic-materials)) must be verified: 'Seaqual® Yarn is a unique 100% recycled yarn made from 10% Upcycled Marine Plastic, recovered from our oceans, beaches and rivers, and 90% recycled PET packaging waste from households. It’s almost identical in look and feel to virgin polyester yarn, but reduces water waste by 40%, energy consumption by 50%, and carbon emissions by 60% during the production process. Seaqual Yarn® is fully recyclable. ) must be verified: 'Seaqual® Yarn is a unique 100% recycled yarn made from 10% Upcycled Marine Plastic, recovered from our oceans, beaches and rivers, and 90% recycled PET packaging waste from households. It’s almost identical in look and feel to virgin polyester yarn, but reduces water waste by 40%, energy consumption by 50%, and carbon emissions by 60% during the production process. Seaqual Yarn® is fully recyclable.'",
  },
  {
    id: "emissionFactor/material/seaqual",
    label: "Seaqual",
    source:
      "Internally constructed. According to Seads ([source](https://seads.global/pages/espadrilles-made-of-ocean-plastic-materials)), the carbon emission of Seaqual's production is reduced by 60% when compared to a polyester yarn. Using 0.4 * our value for 'polyester - conventional' from Spain (8.543)",
    value: 3.4172,
    unit: "kgCO2eq/kg",
    countryIds: ["spain"],
    version: ModelVersion.version_0_3_0,
    comments:
      "The following claims on carbon footprint reduction of Seaqual by Seads ([source](https://seads.global/pages/espadrilles-made-of-ocean-plastic-materials)) must be verified: 'Seaqual® Yarn is a unique 100% recycled yarn made from 10% Upcycled Marine Plastic, recovered from our oceans, beaches and rivers, and 90% recycled PET packaging waste from households. It’s almost identical in look and feel to virgin polyester yarn, but reduces water waste by 40%, energy consumption by 50%, and carbon emissions by 60% during the production process. Seaqual Yarn® is fully recyclable. ) must be verified: 'Seaqual® Yarn is a unique 100% recycled yarn made from 10% Upcycled Marine Plastic, recovered from our oceans, beaches and rivers, and 90% recycled PET packaging waste from households. It’s almost identical in look and feel to virgin polyester yarn, but reduces water waste by 40%, energy consumption by 50%, and carbon emissions by 60% during the production process. Seaqual Yarn® is fully recyclable.'",
  },
  {
    id: "emissionFactor/material/special/bloom/foam",
    label: "Bloom Foam",
    source:
      'Internally constructed. According to Bloom ([source](https://www.bloommaterials.com/rise/)), using Bloom Foam sequesters carbon dioxide from the atmosphere through the algae used to produce the material. Converting this to an emission factor is out-of-scope for now so we will assume this may be considered as a "net-zero" material, and we will use a 0 value.',
    value: 0,
    unit: "kgCO2eq/kg",
    countryIds: ["italy", "vietnam"],
    version: ModelVersion.version_0_5_0,
    comments:
      "This material must be investigated to determine a better emission factor. Same value used for different countries.",
  },
  {
    id: "emissionFactor/material/fabric/hemp",
    label: "Fabric - Hemp",
    source:
      "Value for 'Plant Fiber - Hemp' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=hemp): 1.773 (Crop Farming, value for several European countries in absence of value for Portugal) + 0 (Ginning) + 4.280 (Spinning, Weaving and Dyeing for Portugal)",
    value: 6.053,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_4_0,
  },
  {
    id: "emissionFactor/material/fabric/hemp",
    label: "Fabric - Hemp",
    source:
      "Value for 'Plant Fiber - Hemp' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=hemp): 4.038 (Crop farming) + 0.000 (Ginning) + 13.246 (Spinning Weaving and Dyeing) = 17.284",
    value: 17.284,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "senegal"],
    version: ModelVersion.version_0_5_0,
    comments: "Using China's value for other countries: Senegal.",
  },
  {
    id: "emissionFactor/material/fabric/jute",
    label: "Fabric - Jute",
    source:
      "No known value for 'Jute', using value for 'Plant Fiber - Hemp' from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=hemp): 1.773 (Crop Farming, value for several European countries in absence of value for Portugal) + 0 (Ginning) + 4.280 (Spinning, Weaving and Dyeing for Portugal)",
    value: 6.053,
    unit: "kgCO2eq/kg",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_4_0,
    comments: "Fallback on 'fabric/hemp'",
  },
  {
    id: "emissionFactor/material/fabric/jute",
    label: "Fabric - Jute",
    source:
      "No known value for 'Jute', using our 'fabric/hemp' value for China.",
    value: 17.284,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "senegal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "Fallback on 'fabric/hemp'. Using China's value for other countries: Senegal.",
  },
  {
    id: "emissionFactor/material/vegetal/waste",
    label: "Vegetal - Waste",
    source: "Internal hypothesis",
    value: 0.534,
    unit: "kgCO2eq/kg",
    countryIds: ["italy", "portugal"],
    version: ModelVersion.version_0_5_0,
    comments:
      "With no information on the average emission factor for vegetal waste used in fabrics, we currently use the same value as for natural rubber, since it's currently mostly used in the products we saw to complete rubber in outsoles. This must be improved to take into account part of the farming impact, as well as the processing impact.",
  },
  {
    id: "emissionFactor/material/tencel",
    label: "Tencel",
    source:
      "[IFATCC report on Tencel environmental footprint](http://www.ifatcc.org/wp-content/uploads/2018/01/A03-Taylor.pdf)",
    value: 2.08,
    unit: "kgCO2eq/kg",
    countryIds: ["italy", "china"],
    version: ModelVersion.version_0_5_0,
    comments: "Same value used for different countries.",
  },
  {
    id: "emissionFactor/material/plastic/pet/standard",
    label: "Plastic - PET - Standard",
    value: 3.26,
    unit: "kgCO2eq/kg",
    countryIds: ["france", "italy", "spain"] as string[], // europe
    version: ModelVersion.version_0_5_0,
    source:
      "Value for 'Primary or pure amorphous PET' from [ADEME Bilan GES database](https://www.bilans-ges.ademe.fr/documentation/UPLOAD_DOC_EN/index.htm?produits_en_caoutchouc_et_en_p.htm), from PlasticsEurope 2005.",
    comments:
      "Value seems to be applicable Europe. This is raw plastic and should only be used for molded components (like soles).",
  },
  {
    id: "emissionFactor/material/plastic/pet/recycled",
    label: "Plastic - PET - Recycled",
    value: 0.202,
    unit: "kgCO2eq/kg",
    countryIds: ["france", "italy", "spain", "portugal"] as string[], // europe
    version: ModelVersion.version_0_5_0,
    source:
      "Value for 'PET (recycled)' from [ADEME Bilan GES database](https://www.bilans-ges.ademe.fr/documentation/UPLOAD_DOC_EN/index.htm?produits_en_caoutchouc_et_en_p.htm). Assumes mechanical recycling.",
    comments: "Value seems to be applicable for Europe.",
  },
  {
    id: "emissionFactor/material/plastic/pet/standard",
    label: "Plastic - PET - Standard",
    value: 11.41,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"] as string[],
    version: ModelVersion.version_0_5_0,
    source:
      "In the absence of a value for China, we estimate the PET emission factor by applying the factor observed between the emission factor for Polyethylene between Europe and China (using 'plastic - pe' values from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=&refine.raw_material=Plastic+-+pe&refine.impact_country=China)). PE's emission factor for Europe is: 0.203 (Extraction) + 3.856 (Processing) = 4.059. Value for China is: 0.203 (Extraction) + 14.009 (Processing) = 14.212. Factor is: x3.5. Taking Europe's 'pet/standard' value, we have for China: 3.5 * 3.26 = 11.41.",
    comments:
      "Internal estimation based on Europe's value and Value seems to be applicable Europe. This is raw plastic and should only be used for molded components (like soles).",
  },
  {
    id: "emissionFactor/material/plastic/pet/recycled",
    label: "Plastic - PET - Recycled",
    value: 0.66,
    unit: "kgCO2eq/kg",
    countryIds: ["china", "vietnam"] as string[],
    version: ModelVersion.version_0_5_0,
    source:
      "In the absence of a value for China, we estimate the PET emission factor by applying the factor observed between the emission factor for Polyethylene between Europe and China (using 'plastic - pe' values from [Kering Group database](https://kering-group.opendatasoft.com/explore/dataset/raw-material-intensities-2020/table/?refine.environmental_impact_group=GHGs&q=&refine.raw_material=Plastic+-+pe&refine.impact_country=China)). PE's emission factor for Europe is: 0.203 (Extraction) + 3.856 (Processing) = 4.059. Value for China is: 0.203 (Extraction) + 14.009 (Processing) = 14.212. Factor is: x3.5. Taking Europe's 'pet/recycled' value, we have for China: 0.202 * 3.26 = 0.66.",
    comments: "Value seems to be applicable for Europe.",
  },
  {
    id: "emissionFactor/material/missingMaterialPart",
    label: "Missing material part - Emission factor for shoes",
    source: "Carbonfact",
    value: 5.92,
    unit: "kgCO2eq/kg",
    countryIds: ["world"],
    comments:
      "This value is used to represent the emissions of unknown materials in our shoes model. It has been defined using the mean of the aggregate emission per kg of final product for 2 generic shoes LCA in ADEME BaseImpact database: leather shoes and cotton shoes.\n\nThe materials for the leather shoes represent a total of 3.06 kgCO2eq (NB: ADEME's model doesn't include the cattle stock raising in the material's emissions) and weight 0.8 kg. The emission factor is thus 3.06 / 0.8 = 3.82 kgCO2eq/kg. For the cotton shoes, the emission factor is 4.81 / 0.6 = 8.02 kgCO2eq/kg. The result is then (3.82 + 8.02) / 2 = 5.92.",
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source: "Unknown",
    value: 0.6,
    unit: "kgCO2eq/kWh",
    countryIds: ["china"],
    version: ModelVersion.version_0_1_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "https://www.statista.com/statistics/1190081/carbon-intensity-outlook-of-australia/",
    value: 0.656,
    unit: "kgCO2eq/kWh",
    countryIds: ["australia"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "https://www.eea.europa.eu/data-and-maps/indicators/overview-of-the-electricity-production-3/assessment-1",
    value: 0.21,
    unit: "kgCO2eq/kWh",
    countryIds: ["spain"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "https://www.eea.europa.eu/data-and-maps/indicators/overview-of-the-electricity-production-3/assessment-1",
    value: 0.233,
    unit: "kgCO2eq/kWh",
    countryIds: ["italy"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "https://www.eea.europa.eu/data-and-maps/indicators/overview-of-the-electricity-production-3/assessment-1",
    value: 0.255,
    unit: "kgCO2eq/kWh",
    countryIds: ["portugal"],
    version: ModelVersion.version_0_2_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "World Bank, https://documents.worldbank.org/curated/en/781731523025593046/Implementation-Completion-and-Results-Report-ICR-Document-04032018.docx",
    value: 0.8154,
    unit: "kgCO2eq/kWh",
    countryIds: ["vietnam"],
    version: ModelVersion.version_0_3_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "[climate-transparency.org China 2019 report](https://www.climate-transparency.org/wp-content/uploads/2019/11/B2G_2019_China.pdf), page 7. Original source: Enerdata 2019.",
    value: 0.555,
    unit: "kgCO2eq/kWh",
    countryIds: ["china"],
    version: ModelVersion.version_0_4_0,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "Value for 2020 from [Statista](https://www.statista.com/statistics/1190067/carbon-intensity-outlook-of-france/)",
    value: 0.057,
    unit: "kgCO2eq/kWh",
    countryIds: ["france"],
    version: ModelVersion.version_0_4_1,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "Using ourworldindata.org data on energy mix for Senegal in 2019 ([source](https://ourworldindata.org/grapher/share-elec-by-source?country=~SEN)): 88.51% oil, 7.78% hydropower, 2.01% other renewables (not solar, wind or hydropower), 1.70% solar. Using mean values for emission factors from [Comparison of Lifecycle GHG of Various Electricity Generation Sources from world-nuclear.org](https://www.world-nuclear.org/uploadedFiles/org/WNA/Publications/Working_Group_Reports/comparison_of_lifecycle.pdf) (unit is tCO2e/GWh): gas 499, wind 26, coal 888, oil 733, solar 85, hydropower 26, other renewables 45 (using biomass' value). Result is: 88.51% * 733 + 7.78% * 26 + 2.01% * 45 + 1.7% * 85 = 0.6531506 kgCO2eq/kWh.",
    value: 0.6531506,
    unit: "kgCO2eq/kWh",
    countryIds: ["senegal"],
    version: ModelVersion.version_0_4_1,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "Using ourworldindata.org data on energy mix for Greece in 2019 ([source](https://ourworldindata.org/grapher/share-elec-by-source?country=~GRC)): 36.75% gas, 18.42% wind, 15.29% coal, 12.06% oil, 9.01% solar, 7.84% hydropower, 0.65% other renewables (not solar, wind or hydropower). Using mean values for emission factors from [Comparison of Lifecycle GHG of Various Electricity Generation Sources from world-nuclear.org](https://www.world-nuclear.org/uploadedFiles/org/WNA/Publications/Working_Group_Reports/comparison_of_lifecycle.pdf) (unit is tCO2e/GWh): gas 499, wind 26, coal 888, oil 733, solar 85, hydropower 26, other renewables 45 (using biomass' value). Result is: 36.75% * 499 + 18.42% * 26 + 15.29% * 888 + 12.06 * 733 + 9.01% * 85 + 7.84% * 26 + 0.65 * 45 = 0.4223361 kgCO2eq/kWh.",
    value: 0.4223361,
    unit: "kgCO2eq/kWh",
    countryIds: ["greece"],
    version: ModelVersion.version_0_4_1,
  },
  {
    id: "emissionFactor/energy/electricity",
    label: "Electricity",
    source:
      "Using ourworldindata.org data on energy mix for Peru in 2019 ([source](https://ourworldindata.org/grapher/share-elec-by-source?country=~PER)): 58.60% hydropower, 34.09% gas, 3.49% wind, 1.51% solar, 1.19% coal, 1.12% other renewables (not solar, wind or hydropower). Using mean values for emission factors from [Comparison of Lifecycle GHG of Various Electricity Generation Sources from world-nuclear.org](https://www.world-nuclear.org/uploadedFiles/org/WNA/Publications/Working_Group_Reports/comparison_of_lifecycle.pdf) (unit is tCO2e/GWh): gas 499, wind 26, coal 888, oil 733, solar 85, hydropower 26, other renewables 45 (using biomass' value). Result is: 58.60% * 26 + 34.09% + 499 + 3.49% * 26 + 1.51% * 85 + 1.19% * 888 + 1.12% * 45 = 0.33829 kgCO2eq/kWh.",
    value: 0.33829,
    unit: "kgCO2eq/kWh",
    countryIds: ["peru"],
    version: ModelVersion.version_0_4_1,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/manufacturing/shoes/energyConsumption/electricity",
    label: "Electricity consumed for manufacturing a pair of shoes",
    source: "ADEME BaseImpact",
    value: 6.0,
    unit: "kWh",
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/use/shoes",
    label: "Emissions for the use of a pair of shoes",
    source:
      "Most references ignore the impact of using shoes or have a very low value",
    value: 0,
    unit: "kgCO2eq",
    version: ModelVersion.version_0_5_0,
  },
  {
    id: `fixedValue/lifeCycleAnalysisStep/distribution/shoes/intercontinental/default`,
    label:
      'Emissions for an average intercontinental distribution of a pair of shoes (from the manufacturing plant to the local distribution warehouse, a.k.a. "upstream freight")',
    source:
      "13 % * (12 000 km * ((0.7 kg shoes + 0.2 kg packaging) / 1 000 kg) t * 0.60 kgCO2eq/t.km) + 87 % * (18 000 km * ((0.7 kg shoes + 0.2 kg packaging) / 1 000) t * 0.015 kgCO2eq/t.km).\n- 13 % airplane, 87 % boat distribution from ADEME BaseImpact LCA for shoes.\n- Like in other parts of our methodology, we assume an average 0.7 kg weight for shoes and 0.2 kg for the packaging.\n- 12 000 km is an average trip length for intercontinental flights.\n- 18 000 km is an average trip length for intercontinental sea-freight routes.\n-Emission factors from [EASAC report](https://easac.eu/fileadmin/PDF_s/reports_statements/Decarbonisation_of_Tansport/EASAC_Decarbonisation_of_Transport_FINAL_March_2019.pdf).",
    value: 1.05381,
    unit: "kgCO2eq",
    version: ModelVersion.version_0_5_0,
  },
  {
    id: `fixedValue/lifeCycleAnalysisStep/distribution/shoes/intercontinental/sea-only/conventional`,
    label:
      'Emissions for 100% sea-freight intercontinental distribution of a pair of shoes (from the manufacturing plant to the local distribution warehouse, a.k.a. "upstream freight")',
    source:
      "(18 000 km * ((0.7 kg shoes + 0.2 kg packaging) / 1 000) t * 0.015 kgCO2eq/t.km).\n- Like in other parts of our methodology, we assume an average 0.7 kg weight for shoes and 0.2 kg for the packaging.\n- 18 000 km is an average trip length for intercontinental sea-freight routes.\n-Emission factors from [EASAC report](https://easac.eu/fileadmin/PDF_s/reports_statements/Decarbonisation_of_Tansport/EASAC_Decarbonisation_of_Transport_FINAL_March_2019.pdf).",
    value: 0.243,
    unit: "kgCO2eq",
    version: ModelVersion.version_0_5_0,
  },
  {
    id: `fixedValue/lifeCycleAnalysisStep/distribution/shoes/intercontinental/sea-only/biofuel`,
    label:
      'Emissions for intercontinental distribution of a pair of shoes (from the manufacturing plant to the local distribution warehouse, a.k.a. "upstream freight") with 100% sea-freight using biofuel',
    source:
      "According to studies on the GHG emissions reduction when using biofuel instead of HFO (conventional Heavy Fuel Oil for sea-freight), the reduction ranges from 40 to 93% in [one study](https://pubs.acs.org/doi/10.1021/acs.est.0c06141) and from 56 to 80% in [another](https://theicct.org/sites/default/files/publications/Marine-biofuels-sept2020.pdf). The reduction highly depends on the type of biofuel used, so for now we'll use a conservative average value of 50% reduction.\nUsing our value for conventional sea-freight: 0.243 * 0.5 = 0.1215",
    value: 0.1215,
    unit: "kgCO2eq",
    version: ModelVersion.version_0_5_0,
  },
  {
    id: `fixedValue/lifeCycleAnalysisStep/distribution/shoes/intracontinental/default`,
    label:
      'Emissions for the intracontinental distribution of a pair of shoes (from the manufacturing plant to the local distribution warehouse, a.k.a "upstream freight") using trucks',
    source:
      "2 500 km * 0.9 kg (0.7 shoes + 0.2 packaging) / 1000 kg/t * 0.06 kgCO2eq/t.km. Source for truck emission factor (0.06 kgCO2eq/t.km: https://easac.eu/fileadmin/PDF_s/reports_statements/Decarbonisation_of_Transport/EASAC_Decarbonisation_of_Transport_FINAL_March_2019.pdf).",
    value: 0.135,
    unit: "kgCO2eq",
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/endOfLife/shoes/withoutRecyclingProgram",
    label:
      "Emissions for the end of life of a pair of shoes, in case there is no known end-of-life recycling program.",
    source: "ADEME BaseImpact results (TODO: detail source)",
    value: 1.4,
    unit: "kgCO2eq",
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "fixedValue/lifeCycleAnalysisStep/endOfLife/shoes/withRecyclingProgram",
    label:
      "Emissions for the end of life of a pair of shoes, in case there is a known end-of-life recycling program (a 50% bonus is applied - coefficient chosen arbitrarily by Carbonfact)",
    source: "N/A",
    value: 0.7,
    unit: "kgCO2eq",
    version: ModelVersion.version_0_5_0,
  },
  {
    id: "fixedValue/categoryAverageEmissions/shoes/sneakers",
    label: "Average CO2e emissions for the Shoes/Sneakers category",
    source:
      "Using carbon footprint of a typical pair of running shoes made of synthetic materials ([source MIT](https://dspace.mit.edu/bitstream/handle/1721.1/102070/Olivetti_Manufacturing-focused.pdf)). Using this value as a proxy for the sneakers category until we can find or create data on this specific category.",
    value: 14,
    variationCoefficient: 0.2,
    unit: "kgCO2eq",
    version: ModelVersion.version_0_5_0,
  },
];
