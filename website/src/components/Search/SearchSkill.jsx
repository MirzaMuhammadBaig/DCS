import React, { useState } from "react";
import { ethers } from "ethers";
 

function SearchSkill() {
  const [skillDetails, setSkillDetails] = useState(null);

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
    const skill = formData.get("skill");

    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("User denied account access.");
        }

        const signer = provider.getSigner();

        const skillData = await contract.connect(signer).find_skills(skill);

        const nextAaray = [...new Set(skillData)];
        setSkillDetails(nextAaray);

      } else {
        alert("Please connect to a wallet.");
      }
    } catch (error) {
      alert(`Something went wrong.\n${error}`);
    }
  };

  return (
    <>
      <div id="search">
        <div className="pt-5">
          <div class="card text-center" style={{ background: "#ffffff" }}>
            <div class="card-body">
              <h3 class="card-title mb-3">Skills</h3>
              <p class="card-text">You can find skills.</p>
              <form onSubmit={handleFormSubmit}>
                <div className="row g-3">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <div class="input-group mt-3">
                      <input
                        type="text"
                        name="skill"
                        class="form-control"
                        placeholder="skill name"
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
            {skillDetails ? (
              <div class="card-footer pt-4">
                <p>
                  <span className="fw-bold">Skills: </span>
                  {skillDetails.map((skill) => skill).join(", ")}
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

export default SearchSkill;
