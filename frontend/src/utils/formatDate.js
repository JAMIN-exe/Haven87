export function formatDate(isoString, options = {}) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    weekday: options.weekday ?? "short",
    month: "short",
    day: "numeric",
    year: options.year ?? undefined,
  });
}

export function formatDateLong(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}