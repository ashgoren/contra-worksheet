// not in useLocalStorage hook because this is called outside of FormProvider
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

export const isNum = (value: number | string | null | undefined): value is number => typeof value === 'number';
