import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'trackas1.firebaseapp.com',
  projectId: 'trackas1',
  storageBucket: 'trackas1.appspot.com',
  messagingSenderId: '672092906058',
  appId: '1:672092906058:web:f3589aa30b780eb08a7cb3',
  measurementId: 'G-88C7N1YV1E',
});

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
