import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, collection, getDocs, setDoc, doc, query, orderBy, onSnapshot} from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyAxsKt9f2cpo8MM243ZuOT_QZ_jKmmlpdU",
  authDomain: "test-for-yuruojie.firebaseapp.com",
  projectId: "test-for-yuruojie",
  storageBucket: "test-for-yuruojie.appspot.com",
  messagingSenderId: "547159601573",
  appId: "1:547159601573:web:1a19221d336a867a6b784c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;