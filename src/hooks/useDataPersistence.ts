import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { doc, setDoc, getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from 'services/firebase';
import type { WorksheetFormData, WorksheetBackup } from 'types/worksheet';

export const useDataPersistence = () => {
  const { getValues } = useFormContext<WorksheetFormData>();

  const saveBackup = useCallback(async () => {
    const data = getValues();

    // Save to localStorage
    localStorage.setItem('worksheetData', JSON.stringify(data));

    // Save backup to Firestore
    if (data.date && data.band && navigator.onLine) {
      try {
        const backup: WorksheetBackup = {
          ...data,
          updatedAt: new Date().toISOString(),
        };
        await setDoc(doc(db, 'backups', data.date), backup, { merge: true });
        console.log('Firestore backup successful:', data.date);
      } catch (error) {
        console.warn('Unable to perform Firestore backup:', error); // fail gracefully
      }
    } else {
      if (!navigator.onLine) console.warn('Offline: Skipping Firestore backup');
      if (!data.date || !data.band) console.warn('Date or band fields are blank: Skipping Firestore backup');
    }

  }, [getValues]);

  // Retrieve backups from Firestore
  const getBackups = useCallback(async (): Promise<WorksheetBackup[] | undefined> => {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const q = query(
        collection(db, 'backups'),
        orderBy('date', 'desc'),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as WorksheetBackup);
    } catch (error) {
      console.warn('Unable to retrieve backups from Firestore', error); // fail gracefully
    }
  }, []);

  return { saveBackup, getBackups };
};
