import { useState } from 'react';
import type { Person } from 'types/talent';

export const useSignatures = () => {
  const [signatures, setSignatures] = useState<Record<string, string>>({});

  const addSignature = (person: Person, signature: string) => {
    setSignatures(prev => ({ ...prev, [person.name]: signature }));
  };

  const getSignature = (personName: string) => signatures[personName];

  return { signatures, addSignature, getSignature };
};
