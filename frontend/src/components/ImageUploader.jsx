import React, { useState } from "react";
import axios from "axios";
// import UploadPinata from "./UploadPinata";

export default function Upload(ImageCallBack) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const PinImageToIpfs = async (file) => {
    const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    const form_data = new FormData();
    form_data.append("file", file);

    try {
      const headers = {
        pinata_api_key: "c3137cb993709c8b676b",
        pinata_secret_api_key:
          "04fa8f75276ea59b39c5eb16ec2b5f9fb3b122d1568f94f6530e47adc686ca50",
      };

      const axiosInstance = axios.create({
        baseURL: pinataEndpoint,
        maxContentLength: Infinity,
        headers: headers,
      });

      const response = await axiosInstance.post("", form_data);
      const imageHash = response.data.IpfsHash;
      return imageHash;
    } catch (err) {
      throw err;
    }
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        // setError("");
        const  ImageHash = await PinImageToIpfs(selectedFile);
        ImageCallBack(ImageCallBack);
      }
    } catch (err) {
      // setError(err.message);
    }
  };

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

      <button onClick={handleUpload}>Click</button>
    </div>
  );
}
