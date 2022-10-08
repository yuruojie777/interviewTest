import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwJnwjTZYKZxm9IGtOcc5LuqmyFYtQPaE",
  authDomain: "test-784f1.firebaseapp.com",
  projectId: "test-784f1",
  storageBucket: "test-784f1.appspot.com",
  messagingSenderId: "432918867830",
  appId: "1:432918867830:web:229b8ec107def19356d457"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getMessage(db) {
  const message = collection(db, 'message');
  const messageSnapshot = await getDocs(message);
  const messageList = messageSnapshot.docs.map(doc => doc.data());
  return messageList;
}