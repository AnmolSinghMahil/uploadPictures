import React from "react";
import { deleteDoc, doc, getFirestore } from "@firebase/firestore";

const DeleteImage = ({ id }) => {
  const hand = async (id) => {
    console.log(id);
    const db = getFirestore();
    const userDoc = doc(db, "images", id);
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
