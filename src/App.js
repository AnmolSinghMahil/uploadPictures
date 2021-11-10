import React from "react";
import ImageGrid from "./comps/ImageGrid";
import Title from "./comps/Title";
import UploadForm from "./comps/UploadForm";
import CredentialForm from "./comps/CredentialForm";

// import firebase from "firebase";
function App() {
  return (
    <div className="App">
      <Title />
      <CredentialForm />
      <UploadForm />
      <ImageGrid />
    </div>
  );
}

export default App;
