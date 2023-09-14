import React, { useState } from "react";
import { ethers } from "ethers";

function CheckUserCert() {
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
    const address = formData.get("address");

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
          .get_user_certificates(address);

        setCertificateDetails(certificateData);

      } else {
        alert("Please connect to a wallet.");
      }
    } catch (error) {
      alert(`Something went wrong.\n${error}`);
    }
  };

  const convertToRealTime = (hexValue) => {
    const date = new Date(parseInt(hexValue, 10) * 1000);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <div>
        <div className="pt-5 pb-5 ps-1 pe-1" style={{ background: "#6548bc" }}>
          <div class="card text-center" style={{ background: "#ffffff" }}>
            <div class="card-body">
              <h3 class="card-title">Get Certificate Holder Details</h3>
              <p class="card-text mt-4">
                You can get details of certificate of any certified user from
                his address.
              </p>
              <form onSubmit={handleFormSubmit}>
                <div className="row g-3">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <div class="input-group mt-3">
                      <input
                        type="text"
                        name="address"
                        class="form-control"
                        placeholder="Enter wallet address of user"
                        id="validationDefaultUsername"
                        aria-describedby="inputGroupPrepend2"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-2"></div>
                </div>

                <button type="submit" class="btn btn-primary mt-3">
                  Get Details
                </button>
              </form>
            </div>
            {certificateDetails ? (
              <div class="card-footer pt-4">
                <p>
                  <div className="fw-bold mb-3">Certificate Images: </div>
                  {certificateDetails[6].map((url, index) => (
                    <React.Fragment key={index}>
                      <div className="m-3">
                        <img
                          src={`https://gateway.pinata.cloud/ipfs/${url}`}
                          alt="Certificate Image"
                          style={{ width: "200px", height: "200px" }}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </p>
                <hr />
                <p>
                  <span className="fw-bold">User Id: </span>
                  {parseInt(certificateDetails[1], 16)}
                </p>
                <p>
                  <span className="fw-bold">Holder Name: </span>
                  {certificateDetails[0]}
                </p>
                <p>
                  <span className="fw-bold">Course Name: </span>
                  {certificateDetails[3].join(" , ")}
                </p>
                <p>
                  <span className="fw-bold">Insititute Name: </span>
                  {`${certificateDetails[4].join(" , ")}`}
                </p>
                <p>
                  <span className="fw-bold">Skills: </span>
                  {certificateDetails[5].join(" , ")}
                </p>

                <p>
                  <span className="fw-bold">Issue Date: </span>
                  {certificateDetails[2].map((date) => (
                    <span>{`${convertToRealTime(date)}, `}</span>
                  ))}
                </p>

                <p>
                  <span className="fw-bold">Certification Status: </span>
                  {certificateDetails[9].map((date) => (
                    <span>
                      {date === 1 ? "Certified , " : "Not Certified , "}
                    </span>
                  ))}
                </p>

                <p>
                  <span className="fw-bold">Certificate URLs: </span>
                  {certificateDetails[6].map((url, index) => (
                    <React.Fragment key={index}>
                      <a
                        href={`https://gateway.pinata.cloud/ipfs/${url}`}
                        target="_blank"
                      >
                        {`https://gateway.pinata.cloud/ipfs/${url}`}
                      </a>
                      {index < certificateDetails[7].length - 1 ? ", " : ""}
                    </React.Fragment>
                  ))}
                </p>

                <p>
                  <span className="fw-bold">Holder Address: </span>
                  {certificateDetails[7].join(" , ")}
                </p>
                <p>
                  <span className="fw-bold">Issuer Address: </span>
                  {certificateDetails[8].join(" , ")}
                </p>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckUserCert;
