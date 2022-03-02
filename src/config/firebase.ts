import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
  apiKey: 'AIzaSyAaKKaxkBg7wJ6vnfook39MFHN-nJDFgRw',
  authDomain: 'trackas1.firebaseapp.com',
  projectId: 'trackas1',
  storageBucket: 'trackas1.appspot.com',
  messagingSenderId: '672092906058',
  appId: '1:672092906058:web:f3589aa30b780eb08a7cb3',
});

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
