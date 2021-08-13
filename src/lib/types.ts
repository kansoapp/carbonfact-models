export const ModelVersion = {
  version_0_1_0: "0.1.0",
  version_0_2_0: "0.2.0",
  version_0_2_1: "0.2.1",
};

export type ModelVersion = typeof ModelVersion[keyof typeof ModelVersion];
