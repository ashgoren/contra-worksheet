import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAzpjNwmgPPxt8pWbHhuicAINoYq__ul7s",
  authDomain: "pcdc-worksheet.firebaseapp.com",
  projectId: "pcdc-worksheet",
  storageBucket: "pcdc-worksheet.firebasestorage.app",
  messagingSenderId: "1066708927715",
  appId: "1:1066708927715:web:63e6e0594663c9912f71d6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { localCache: memoryLocalCache() });

export { auth, db };
