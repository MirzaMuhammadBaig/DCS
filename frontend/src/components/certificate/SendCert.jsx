import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar2 from "../navbar/Navbar2";
import Footer2 from "../Footer/Footer2";
import CheckUserCert from "./CheckUserCert";
import ReceiveCert from "./ReceiveCert";
import IsUserCertified from "./IsUserCertified";

function SendCert() {
  const [sendEvent, setSendEvent] = useState(null);

  const contractAddress = "0xac427e8155a8c24112f62b9e69d7a21efa734af9";
  const contractABI = require("../../contract/abi.json");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    provider
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const address = formData.get("address");
    const courseName = formData.get("courseName").trim();

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
          .send_certificate(address, courseName);

        await tx.wait();

        alert("Successfully sent");
      } else {
        alert("Please connect to a wallet.");
      }
    } catch (error) {
      console.log("error: ", error);
      try {
        if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: You are not registered"
          )
        ) {
          alert("You are not registered");
        } else if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: receiver is not registered"
          )
        ) {
          alert("Receiver must be a registered user");
        } else if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: You are not certified in this course."
          )
        ) {
          alert("You are not certified in this course.");
        } else {
          alert("'Something went wrong'");
        }
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };

  const handleCertificateSend = (
    takerAddress,
    giverAddress,
    courseName,
    certificateUrl
  ) => {
    console.log("CertificateSend event received:");
    console.log("Taker Address:", takerAddress);
    console.log("Giver Address:", giverAddress);
    console.log("Course Name:", courseName);
    console.log("Certificate URL:", certificateUrl);

    // Update the sendEvent state with the event data
    setSendEvent({
      takerAddress,
      giverAddress,
      courseName,
      certificateUrl,
    });
  };

  useEffect(() => {
    const eventFilter = contract.filters.CertificateSend();
    contract.on(eventFilter, handleCertificateSend);

    // Clean up the event listener when the component unmounts
    return () => {
      contract.off(eventFilter, handleCertificateSend);
    };
  }, [contract]);

  return (
    <>
      <Navbar2 />
      <CheckUserCert />
      <IsUserCertified />
      <div className="p-5" style={{ background: "#6548bc" }}>
        <div class="card text-center" style={{ background: "#27bee3" }}>
          {/* <div class="card-header">Become Provider</div> */}
          <div class="card-body">
            <h3 class="card-title">Send Certificate</h3>
            <p class="card-text mt-4">
              If you have any certificate, you can send to any registered user.
            </p>
            <form class="row g-3" onSubmit={handleFormSubmit}>
              <div className="col-2"></div>
              <div className="col-8">
                <div class="input-group mt-3">
                  <input
                    type="text"
                    name="address"
                    class="form-control"
                    placeholder="Enter receiver address "
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
                <div class="input-group mt-3">
                  <input
                    type="text"
                    name="courseName"
                    class="form-control"
                    placeholder="Enter certificate/course name"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
              </div>
              <div className="col-2"></div>
              <div className="col-5"></div>
              <button type="submit" class="btn btn-primary mt-3 col-2">
                Send Certificate
              </button>
              <div className="col-5"></div>
            </form>
          </div>
          {sendEvent && (
            <div class="card-footer">
              <p>
                <span className="fw-bold">Course Name:</span>{" "}
                {sendEvent.courseName}
              </p>
              <p>
                <span className="fw-bold">Certificate URL:</span>{" "}
                {sendEvent.certificateUrl}
              </p>
              <p>
                <span className="fw-bold">Receiver Address:</span>{" "}
                {sendEvent.takerAddress}
              </p>
              <p>
                <span className="fw-bold">Provider Address:</span>{" "}
                {sendEvent.giverAddress}
              </p>
            </div>
          )}
        </div>
      </div>
      <ReceiveCert />
      <Footer2 />
    </>
  );
}

export default SendCert;
