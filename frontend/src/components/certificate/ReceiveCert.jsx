import React, { useState } from "react";
import { ethers } from "ethers";

function ReceiveCert() {
  const [certificateDetails, setCertificateDetails] = useState(null);

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

    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("User denied account access.");
        }

        const signer = provider.getSigner();

        const certificateData = await contract
          .connect(signer)
          .get_received_Certificates();

        setCertificateDetails(certificateData);
      } else {
        alert("Please connect to a wallet.");
      }
    } catch (error) {
      alert(`Something went wrong.\n${error}`);
    }
  };

  return (
    <div>
      <div className="pt-5 pb-5 ps-1 pe-1" style={{ background: "#6548bc" }}>
        <div class="card text-center" style={{ background: "#27bee3" }}>
          <div class="card-body">
            <h3 class="card-title">Check Received Certificate</h3>
            <p class="card-text mt-4">
              Certified user can send their certificate to anyone for
              visualization.
              <br />
              So, if you have received any certificate you can see.
            </p>
            <form onSubmit={handleFormSubmit}>
              <button type="submit" class="btn btn-primary mt-4">
                Check Received Certificates
              </button>
            </form>
          </div>
          {certificateDetails ? (
            <div class="card-footer">
              <p>
                <span className="fw-bold">Course Names: </span>
                {certificateDetails._course_names
                  .map((course) => course)
                  .join(", ")}
              </p>
              <p>
                <span className="fw-bold">Certificate URLs: </span>
                {certificateDetails._certificate_urls.map((url, index) => (
                  <React.Fragment key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                    {index < certificateDetails._certificate_urls.length - 1
                      ? ", "
                      : ""}
                  </React.Fragment>
                ))}
              </p>

              <p>
                <span className="fw-bold">Sended Addresses: </span>
                {certificateDetails._sended_addresses
                  .map((address) => address)
                  .join(", ")}
              </p>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReceiveCert;
