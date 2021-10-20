export type GeographicalAreaEntity = {
  id: string;
  label: string; // if missing, it should be assumed it's the id with the 1st letter upcased
  type: "country" | "continent" | "world";
  parentId?: string;
};
