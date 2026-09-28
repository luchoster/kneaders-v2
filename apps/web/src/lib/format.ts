export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

/** "2026-04-03" → "April 3, 2026" */
export function formatDate(date: string | undefined) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
