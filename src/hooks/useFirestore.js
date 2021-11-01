import { useState, useEffect } from "react";
// import { projectFirestore } from "../firebase/config";
import {
  onSnapshot,
  orderBy,
  collection,
  getFirestore,
} from "firebase/firestore";

const useFirestore = (images) => {
  const [docs, setDocs] = useState([]);
  const db = getFirestore();
  const q = collection(db, "images");
  useEffect(() => {
    const unsub = onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsub();
  }, [images]);

  return { docs };
};
export default useFirestore;
