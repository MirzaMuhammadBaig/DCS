import React from "react";
import { ethers } from "ethers";
import Navbar2 from "../navbar/Navbar2";
import Footer2 from "../Footer/Footer2";
import CreateCert from "./CreateCert";
// import GiveCert from "./GiveCert";

function BecomeProvider() {
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
    const institute_name = formData.get("name");

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
          .become_provider(institute_name);

        await tx.wait();

        alert("Successfully become provider");
      } else {
        alert("Please connect to a wallet.");
      }
    } catch (error) {
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
            "execution reverted: You are already provider"
          )
        ) {
          alert("You are already provider");
        } else {
          alert("'Something went wrong'");
        }
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="pt-5 pb-5 ps-1 pe-1" style={{ background: "#6548bc" }}>
        <div class="card text-center" style={{ background: "#27bee3" }}>
          <div class="card-body">
            <h3 class="card-title">Become Provider</h3>
            <p class="card-text mt-4">
              First you will have to connect with wallet then register yourself
              then you can become provider.
            </p>
            <form class="" onSubmit={handleFormSubmit}>
              <div className="row g-3">
                <div className="col-2"></div>
                <div className="col-8">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your institute name"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                      required
                      name="name"
                    />
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
              <button type="submit" class="btn btn-primary mt-3">
                Become Provider
              </button>
            </form>
          </div>
        </div>
      </div>
      <CreateCert />
      {/* <GiveCert /> */}
      <Footer2 />
    </>
  );
}

export default BecomeProvider;
