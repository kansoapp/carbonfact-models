export const ModelVersion = {
  version_0_1_0: "0.1.0",
  version_0_2_0: "0.2.0",
  version_0_2_1: "0.2.1",
  version_0_3_0: "0.3.0",
  version_0_3_1: "0.3.1",
  version_0_4_0: "0.4.0",
  current: "0.4.0",
};

export type ModelVersion = typeof ModelVersion[keyof typeof ModelVersion];
