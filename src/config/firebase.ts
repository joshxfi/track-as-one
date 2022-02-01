import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAaKKaxkBg7wJ6vnfook39MFHN-nJDFgRw',
  authDomain: 'trackas1.firebaseapp.com',
  projectId: 'trackas1',
  storageBucket: 'trackas1.appspot.com',
  messagingSenderId: '672092906058',
  appId: '1:672092906058:web:f3589aa30b780eb08a7cb3',
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
