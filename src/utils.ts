// not in useDataPersistence hook because this is called outside of FormProvider
export const loadFromLocalStorage = () => {
  const stored = localStorage.getItem('worksheetData');
  return stored ? JSON.parse(stored) : null;
};

export const parse = (value: string | undefined): number | null => {
  return (value != null && value !== '') ? Number(value) : null;
};

export const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(2);
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  }).replace(',', ' at');
}

export const isNum = (value: unknown): value is number => typeof value === 'number';
