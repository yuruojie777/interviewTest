import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore"; 
// import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAxsKt9f2cpo8MM243ZuOT_QZ_jKmmlpdU",
  authDomain: "test-for-yuruojie.firebaseapp.com",
  projectId: "test-for-yuruojie",
  storageBucket: "test-for-yuruojie.appspot.com",
  messagingSenderId: "547159601573",
  appId: "1:547159601573:web:1a19221d336a867a6b784c",
  // databaseURL: "https://DATABASE_NAME.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const rtdb = getDatabase(app);
export default app;