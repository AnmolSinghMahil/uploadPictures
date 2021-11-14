import React, { useState, useEffect } from "react";
import ImageGrid from "./comps/ImageGrid";
import Title from "./comps/Title";
import UploadForm from "./comps/UploadForm";
import CredentialForm from "./comps/CredentialForm";
import { LoginContext } from "./Contexts/LoginContext";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
import Loading from "./comps/Loading";
import Header from "./comps/Header";

// import firebase from "firebase";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const string = "wefwe";
  // const [user, setUser] = useState({
  //   user: auth.currentUser,
  //   isLoading: auth.currentUser === null ? true : false,
  //   error: null,
  // });
  // console.log(user);
  // const isSignedIn = user !== null;
  // const userUid = isSignedIn ? user.uid : undefined;

  useEffect(() => {
    //   const onChange = (currentUser) => {
    //     setUser({ user: currentUser, isLoading: false, error: null });
    //   };
    //   const onError = (error) => {
    //     setUser({ user: null, isLoading: false, error });
    //   };

    //   const unsub = onAuthStateChanged(auth, onChange, onError);
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log(user, currentUser);

      // // if (currentUser) {
      //   setLoading(false);
      //   console.log(user, currentUser);
      // // } else {
      //   setUser(null);
      //   setLoading(true);
      // }
      //   // console.log(user, currentUser);
    });
    return () => {
      unsub();
    };
  }, []);

  if (!user) {
    return (
      <div className="App">
        {/* <Header /> */}
        <CredentialForm />
      </div>
    );
  } else {
    return (
      <div className="App">
        <LoginContext.Provider value={{ user, setUser, loading, setLoading }}>
          {/* <Header /> */}
          <Title />
          <CredentialForm />
          <UploadForm />
          <ImageGrid />
        </LoginContext.Provider>
      </div>
    );
  }
}

export default App;
