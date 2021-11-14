import React, { useState, useContext } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { LoginContext } from "../Contexts/LoginContext";
const CredentialForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });
  const [userId, setuserId] = useState("");

  const { user, loading, setLoading } = useContext(LoginContext);
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const signin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.messagee);
    }
  };
  const logout = async () => {
    await signOut(auth);
    setLoading(null);
  };

  return (
    <div>
      <form>
        <input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            // console.log(password, email);
          }}
        />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={register}>Register</button>
      <button onClick={signin}> Signin</button>
      <button onClick={logout}> Signout</button>
      <h2>Current user: {user?.uid}</h2>
    </div>
  );
};

export default CredentialForm;
