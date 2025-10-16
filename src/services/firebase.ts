import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, connectStorageEmulator } from 'firebase/storage';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions';
const { VITE_FIREBASE_CONFIG, DEV } = import.meta.env;

const firebaseConfig = JSON.parse(VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { localCache: memoryLocalCache() });
const storage = getStorage(app);
const functions = getFunctions(app, 'us-west1');

if (DEV) {
  console.log('Using Firebase Emulator');
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectStorageEmulator(storage, 'localhost', 9199);
}

const upload = async (blob: Blob, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob);
}

const firebaseFunctions = {
  saveWorksheet: httpsCallable(functions, 'saveWorksheet')
};

export { auth, db, upload, firebaseFunctions };
