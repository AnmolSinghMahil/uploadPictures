import { useState, useEffect, useContext } from "react";
import {
  onSnapshot,
  orderBy,
  collection,
  getFirestore,
} from "firebase/firestore";
import { LoginContext } from "../Contexts/LoginContext";

const useFirestore = (images) => {
  const { user } = useContext(LoginContext);

  const db = getFirestore();
  const [docs, setDocs] = useState([]);

  const collectionRef = collection(db, "users", user.uid, "images");

  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsub();
    // }
  }, [images]);

  return { docs };
};
export default useFirestore;
