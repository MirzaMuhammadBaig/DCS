import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

function GiveCert() {
  const [sending, setSending] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseLength, setCourseLength] = useState("");
  const [instructorNames, setInstructorNames] = useState([]);
  const [receiverAddress, setReceiverAddress] = useState("");

  const [certificateIssuedEvent, setCertificateIssuedEvent] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const COURSENAME = (e) => {
    setCourseName(e.target.value);
  };
  const COURSELENGTH = (e) => {
    setCourseLength(e.target.value);
  };
  const INSTRUCTORNAMES = (e) => {
    setInstructorNames(e.target.value);
  };
  const RECEIVERADDRESS = (e) => {
    setReceiverAddress(e.target.value);
  };

  const contractAddress = "0xac427e8155a8c24112f62b9e69d7a21efa734af9";
  const contractABI = require("../../contract/abi.json");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    provider
  );

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

  const submitForm = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      let ImageHash;
      if (selectedFile) {
        ImageHash = await PinImageToIpfs(selectedFile);
      }

      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts.length === 0) {
            throw new Error("User denied account access.");
          }

          const signer = provider.getSigner();

          const tx = await contract
            .connect(signer)
            .give_certificate_to_user(
              courseName,
              courseLength,
              ImageHash,
              instructorNames.split(","),
              receiverAddress
            );

          await tx.wait();
          alert("Certificate Sent");
        } else {
          alert("Please connect to a wallet.");
        }
      } catch (error) {
        if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: You are not provider"
          )
        ) {
          alert("You are not provider");
        } else if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: owner can't give certificate."
          )
        ) {
          alert("Owner can't be a recevier");
        } else if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: InvalidMetadataHash"
          )
        ) {
          alert(
            "Invalid Metadata Hash: Issue occured in file upload on pinata"
          );
        } else if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: Taker is not registered."
          )
        ) {
          alert("Receiver is not registered");
        } else if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: Course not found"
          )
        ) {
          alert("Course is not created");
        } else {
          alert(error);
          // console.log(error);
        }
      }
    } catch (error) {
      alert(error);
      // console.log(error);
    }
    setSending(false);
  };

  const handleCertificateIssued = (
    takerAddress,
    giverAddress,
    courseName,
    certificateUrl
  ) => {
    setCertificateIssuedEvent({
      takerAddress,
      giverAddress,
      courseName,
      certificateUrl,
    });
  };

  useEffect(() => {
    const eventFilter = contract.filters.CertificateIssued();
    contract.on(eventFilter, handleCertificateIssued);

    return () => {
      contract.off(eventFilter, handleCertificateIssued);
    };
  }, [contract]);

  return (
    <>
      <div className="pt-5 pb-5 ps-1 pe-1" style={{ background: "#6548bc" }}>
        <div class="card text-center" style={{ background: "#27bee3" }}>
          <div class="card-body">
            <h3 class="card-title">Issue Certificate</h3>
            <p class="card-text mt-4">
              After created the certificate you can issue certificate to the
              registered user.
            </p>

            <form onSubmit={submitForm}>
              <div className="row g-3">
                <div className="col-2"></div>
                <div className="col-8">
                  <div class="input-group">
                    <input
                      type="text"
                      name="courseName"
                      value={courseName}
                      onChange={COURSENAME}
                      class="form-control"
                      placeholder="Enter name of certificate/course"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>

                  <div class="input-group mt-3">
                    <input
                      type="text"
                      name="courseLength"
                      value={courseLength}
                      onChange={COURSELENGTH}
                      class="form-control"
                      placeholder="Enter duration of certificate/course"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>

                  <div class="input-group mt-3">
                    <input
                      type="text"
                      name="instructorNames"
                      value={instructorNames}
                      onChange={INSTRUCTORNAMES}
                      class="form-control"
                      placeholder="Enter instructor names"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>

                  <div class="input-group mt-3">
                    <input
                      type="text"
                      name="receiverAddress"
                      value={receiverAddress}
                      onChange={RECEIVERADDRESS}
                      class="form-control"
                      placeholder="Enter receiver address"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>
                  {/* ------------------------ */}
                  <div>
                    <div className="mt-3">
                      <input type="file" onChange={handleFileSelect} />
                      <br />
                      <br />

                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{ maxWidth: "300px" }}
                        />
                      )}
                    </div>
                  </div>
                  {/* ------------------------ */}
                </div>
                <div className="col-2"></div>
              </div>

              <button type="submit" class="btn btn-primary mt-3">
                {sending ? "Running...." : "Issue Certificate"}
                {/* (Issue Certificate) */}
              </button>
            </form>
          </div>
          {certificateIssuedEvent && (
            <div class="card-footer">
              <p>
                <span className="fw-bold">Course Name:</span>{" "}
                {certificateIssuedEvent.courseName}
              </p>
              <p>
                <span className="fw-bold">Certificate URL:</span>{" "}
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${certificateIssuedEvent.certificateUrl}`}
                  target="blank"
                >
                  {`https://gateway.pinata.cloud/ipfs/${certificateIssuedEvent.certificateUrl}`}
                </a>
              </p>
              <p>
                <span className="fw-bold">Receiver Address:</span>{" "}
                {certificateIssuedEvent.takerAddress}
              </p>
              <p>
                <span className="fw-bold">Provider Address:</span>{" "}
                {certificateIssuedEvent.giverAddress}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GiveCert;