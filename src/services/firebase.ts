import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';
const { VITE_FIREBASE_CONFIG } = import.meta.env;

const firebaseConfig = JSON.parse(VITE_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { localCache: memoryLocalCache() });

export { auth, db };
