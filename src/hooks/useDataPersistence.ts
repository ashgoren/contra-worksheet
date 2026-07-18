import { useCallback, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { doc, setDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from 'services/firebase';
import { debounce } from 'lodash';
import { useSessionId } from 'contexts/SessionIdContext';
import type { WorksheetFormData, WorksheetBackup } from 'types/worksheet';

export const useDataPersistence = () => {
  const { getValues } = useFormContext<WorksheetFormData>();
  const { sessionId } = useSessionId();

  const saveBackup = useCallback(async () => {
    const data = getValues();

    // Save to localStorage
    localStorage.setItem('worksheetData', JSON.stringify(data));
    localStorage.setItem('worksheetSessionId', sessionId);

    // Save backup to Firestore (offline persistence handles queuing when offline)
    if (data.date && data.band) {
      try {
        const backup: WorksheetBackup = {
          ...data,
          sessionId,
          updatedAt: new Date().toISOString(),
        };
        await setDoc(doc(db, 'backups', sessionId), backup, { merge: true });
        console.log('Firestore backup successful:', sessionId);
      } catch (error) {
        console.warn('Unable to perform Firestore backup:', error); // fail gracefully
      }
    } else {
      console.warn('Date or band fields are blank: Skipping Firestore backup');
    }

  }, [getValues, sessionId]);

  // Stable ref so the debounced function always calls the latest saveBackup
  // (necessary because sessionId can change without remounting the hook)
  const saveBackupRef = useRef(saveBackup);
  useEffect(() => {
    saveBackupRef.current = saveBackup;
  }, [saveBackup]);

  const debouncedSaveBackup = useRef(
    debounce(() => saveBackupRef.current(), 2000)
  ).current;

  useEffect(() => {
    return () => debouncedSaveBackup.cancel();
  }, [debouncedSaveBackup]);

  // Retrieve backups from Firestore
  const getBackups = useCallback(async (): Promise<WorksheetBackup[] | undefined> => {
    try {
      // const oneMonthAgo = new Date();
      // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const q = query(
        collection(db, 'backups'),
        orderBy('updatedAt', 'desc'),
        // limit(6)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as WorksheetBackup);
    } catch (error) {
      console.warn('Unable to retrieve backups from Firestore', error); // fail gracefully
    }
  }, []);

  return {
    saveBackup: debouncedSaveBackup,
    getBackups
  };
};
