export function compare<T>(a: T, b: T, order: "asc" | "desc"): number {
  if (a < b) return order === "asc" ? -1 : 1;
  if (a > b) return order === "asc" ? 1 : -1;
  return 0;
}
