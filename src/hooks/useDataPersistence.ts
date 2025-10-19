import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { doc, setDoc, getDocs, collection, query, orderBy, where } from 'firebase/firestore';
import { db } from 'services/firebase';
import type { WorksheetFormData } from 'types/worksheet';

export const useDataPersistence = () => {
  const { getValues } = useFormContext<WorksheetFormData>();

  const saveBackup = useCallback(async () => {
    const data = getValues();

    // Save to localStorage
    localStorage.setItem('worksheetData', JSON.stringify(data));

    // Save backup to Firestore
    if (navigator.onLine) {
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
    } else {
      console.log('Offline: Skipping Firestore backup');
    }

  }, [getValues]);

  // Retrieve backups from Firestore
  const getBackups = useCallback(async () => {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const q = query(collection(db, 'backups'), orderBy('updatedAt', 'desc'), where('updatedAt', ">", oneMonthAgo.toISOString()));
      const querySnapshot = await getDocs(q);
      const docs: Record<string, unknown>[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id});
      });
      return docs;
    } catch (error) {
      console.warn('Unable to retrieve backups from Firestore', error); // fail gracefully
    }
  }, []);

  return { saveBackup, getBackups };
};

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = new Date().toISOString();
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};
