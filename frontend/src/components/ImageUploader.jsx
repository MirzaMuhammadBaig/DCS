import React, { useState } from "react";
// import UploadPinata from "./UploadPinata";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileSelect = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      {/* <h1>Upload image</h1> */}
      <div className="mt-3">
        <input type="file" onChange={handleFileSelect} />
        <br />
        <br />

        {previewImage && (
          <img src={previewImage} alt="Preview" style={{ maxWidth: "300px" }} />
        )}
      </div>
      {/* <UploadPinata selectedFile={selectedFile} /> */}
    </div>
  );
}
