import { useState, useEffect } from "react";
import { projectStorage, timestamp } from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //reference
    const storageRef = ref(projectStorage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const db = getFirestore();
    const collectionRef = doc(collection(db, "images"));

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const createdAt = timestamp();
          setUrl(downloadURL);
          setDoc(collectionRef, {
            url: downloadURL,
            name: file.name,
            createdAt,
          });
        });
      }
    );
  }, [file]);
  return { progress, url, error };
};
export default useStorage;
