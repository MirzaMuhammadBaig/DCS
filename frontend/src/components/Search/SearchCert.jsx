import React, { useState } from "react";
import { ethers } from "ethers";
 

function SearchCert() {
  const [certificateDetails, setCertificateDetails] = useState(null);

  const contractAddress = require("../../contract/abi.json");
  const contractABI = require("../../contract/abi.json");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress.address,
    contractABI.abi,
    provider
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const certificate = formData.get("certificate");

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
          .find_certificates(certificate);

        const nextAaray = [...new Set(certificateData)];
        setCertificateDetails(nextAaray);

      } else {
        alert("Please connect to a wallet.");
      }
    } catch (error) {
      alert(`Something went wrong.\n${error}`);
    }
  };

  return (
    <>
      <div class="card text-center" style={{ background: "#ffffff" }}>
        <div class="card-body">
          <h3 class="card-title mb-3">Certificates</h3>
          <p class="card-text">You can find certificates.</p>
          <form class="card-text" onSubmit={handleFormSubmit}>
            <div className="row g-3">
              <div className="col-2"></div>
              <div className="col-8">
                <div class="input-group mt-3">
                  <input
                    type="text"
                    name="certificate"
                    class="form-control"
                    placeholder="certificate name"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
              </div>
              <div className="col-2"></div>
            </div>

            <button type="submit" class="btn btn-primary mt-3">
              Search
            </button>
          </form>
        </div>
        {certificateDetails ? (
          <div class="card-footer pt-4">
            <p>
              <span className="fw-bold">Certificate Names: </span>
              {certificateDetails.map((course) => course).join(
                ", "
              )}
            </p>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}

export default SearchCert;
