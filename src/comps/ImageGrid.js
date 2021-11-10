import React from "react";
import useFirestore from "../hooks/useFirestore";
import DeleteImage from "./DeleteImg";

const ImageGrid = () => {
  const { docs } = useFirestore("images");

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div className="img-wrap" key={doc.id}>
            <img src={doc.url} alt="uploaded pics" />
            <DeleteImage id={doc.id} />
          </div>
        ))}
    </div>
  );
};
export default ImageGrid;
