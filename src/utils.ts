// not in useLocalStorage hook because this is called outside of FormProvider
export const loadFromLocalStorage = () => {
  const stored = localStorage.getItem('worksheetData');
  return stored ? JSON.parse(stored) : null;
};

export const parse = (value: string | undefined): number | null => {
  return (value != null && value !== '') ? Number(value) : null;
};
