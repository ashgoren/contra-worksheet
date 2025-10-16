export const formatDateUTC = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const formatDateTime = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  });
}
