import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3KtMCsiZt_75Fv6SZqh0zsEs8sHVntJs",
  authDomain: "firegram-66cba.firebaseapp.com",
  projectId: "firegram-66cba",
  storageBucket: "firegram-66cba.appspot.com",
  messagingSenderId: "866978670546",
  appId: "1:866978670546:web:41f8cde7d7c6cd0de30a0b",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const auth = getAuth(app);

const timestamp = serverTimestamp;

export { projectStorage, projectFirestore, auth, timestamp };
