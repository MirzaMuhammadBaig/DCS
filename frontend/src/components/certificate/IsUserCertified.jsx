import React, { useState } from "react";
import { ethers } from "ethers";

function IsUserCertified() {
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
    const formData = new FormData(event.target);
    const address = formData.get("address");
    const courseName = formData.get("courseName");

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
          .is_user_certified(address, courseName);

        setCertificateDetails(certificateData);

        console.log(certificateData);
      } else {
        alert("Please connect to a wallet.");
      }
    } catch (error) {
      alert(`Something went wrong.\n${error}`);
    }
  };

  return (
    <div>
      <div className="p-5" style={{ background: "#6548bc" }}>
        <div class="card text-center" style={{ background: "#27bee3" }}>
          {/* <div class="card-header">Become Provider</div> */}
          <div class="card-body">
            <h3 class="card-title">User Is Certified</h3>
            <p class="card-text mt-4">
              You can check that is user certified in any specific course from
              user's address and certificate or course name.
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
                Check User
              </button>
              <div className="col-5"></div>
            </form>
          </div>
          {certificateDetails ? (
            <div class="card-footer pt-4">
              <p>
                <span className="fw-bold">User Status: </span>
                {certificateDetails == 1 ? "Certified" : "Not Certified"}
              </p>
            </div>
          ) : (
            <p>
              {certificateDetails == 0 ? (
                <div class="card-footer pt-4">
                  <span className="fw-bold">
                    User Status:{" "}
                    <span className="fw-normal">Not Certified</span>
                  </span>
                </div>
              ) : (
                ""
              )}
            </p>
          )}
          {/* <div class="card-footer pt-4">
            {certificateDetails ? (
              <p>
                <span className="fw-bold">User Status: </span>
                {certificateDetails == 1 ? "Certified" : ""}
              </p>
            ) : (
              <p>
                {certificateDetails == 0 ? (
                  <span className="fw-bold">
                    User Status:{" "}
                    <span className="fw-normal">Not Certified</span>
                  </span>
                ) : (
                  ""
                )}
              </p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default IsUserCertified;
