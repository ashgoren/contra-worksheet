export const parse = (value: string | undefined): number | null => {
  return (value != null && value !== '') ? Number(value) : null;
};
