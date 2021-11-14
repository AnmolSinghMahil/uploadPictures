import { useState, useEffect, useContext, createContext } from "react";
import { projectStorage, timestamp } from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import { LoginContext } from "../Contexts/LoginContext";
const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { user, string } = useContext(LoginContext);
  console.log(LoginContext, user, string);

  const db = getFirestore();

  const docRef = doc(collection(db, "users", user.uid, "images"));

  // else {
  //   console.log(user);
  //   var docRef = doc(collection(db, "users", "test", "images"));
  // }
  //useEffect takes in a function that runs every time the dependiciy/data/[] changes it will run the function
  //all also called permorming sideeffect, it runs initially and then on every render
  useEffect(() => {
    //reference
    const storageRef = ref(projectStorage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // if (user != null) {
    //   const docRef = doc(collection(db, "users", user?.uid, "images"));

    // const db = getFirestore();
    // const docRef = doc(collection(db, "images"));

    // const docRef = doc(collection(db, "users", user.uid, "images"));

    //  else {
    //   console.log(user);
    //   var docRef = doc(collection(db, "users", "test", "images"));
    // }
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
          setDoc(docRef, {
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
