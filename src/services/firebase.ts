import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions';
const { VITE_FIREBASE_CONFIG, DEV } = import.meta.env;

const firebaseConfig = JSON.parse(VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { localCache: memoryLocalCache() });
const functions = getFunctions(app, 'us-west1');

if (DEV) {
  console.log('Using Firebase Emulator');
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

const firebaseFunctions = {
  saveWorksheet: httpsCallable(functions, 'saveWorksheet')
};

export { auth, db, firebaseFunctions };
