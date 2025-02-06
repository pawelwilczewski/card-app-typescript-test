export type DateOnlyString = `${number}-${number}-${number}`;

export function dateOnlyToString(date: Date): DateOnlyString {
  return date.toISOString().split("T")[0] as DateOnlyString;
}
