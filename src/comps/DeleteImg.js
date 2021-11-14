import React, { createContext, useContext } from "react";
import { deleteDoc, doc, getFirestore } from "@firebase/firestore";
import CredentialForm from "./CredentialForm";
import { LoginContext } from "../Contexts/LoginContext";
const DeleteImage = ({ id }) => {
  const { user } = createContext(LoginContext);
  const hand = async (id) => {
    console.log(id);
    const db = getFirestore();
    const userDoc = doc(
      db,
      "users",
      "0yzf5Ky02FcSk1FY2kTzoq2BcbI3",
      "images",
      id
    );
    await deleteDoc(userDoc);
  };

  return (
    <i
      className="uil uil-trash-alt"
      id="trash"
      onClick={() => {
        hand(id);
      }}
    ></i>
  );
};

export default DeleteImage;
