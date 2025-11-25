// not in useDataPersistence hook because this is called outside of FormProvider
export const loadFromLocalStorage = () => {
  const stored = localStorage.getItem('worksheetData');
  return stored ? JSON.parse(stored) : null;
};

export const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(2);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: 'America/Los_Angeles',
  }).replace(',', '');
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
  }).replace(',', ' at');
}

export const isNum = (value: unknown): value is number => typeof value === 'number';

export const blobToBase64 = async (blob : Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to read blob as base64 string.'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
