import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'services/firebase';
import type { WorksheetFormData } from 'types/worksheet';

export const useDataPersistence = () => {
  const { getValues } = useFormContext<WorksheetFormData>();

  const saveBackup = useCallback(async () => {
    const data = getValues();

    // Save to localStorage
    localStorage.setItem('worksheetData', JSON.stringify(data));

    // Save backup to Firestore
    try {
      const sessionId = getSessionId();
      await setDoc(doc(db, 'backups', sessionId), {
        ...data,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      console.log('Firestore backup successful:', sessionId);
    } catch (error) {
      console.warn('Unable to perform Firestore backup:', error); // fail gracefully
    }

  }, [getValues]);

  return { saveBackup };
};

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = new Date().toISOString();
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};
