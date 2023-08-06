import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import inviteImage from "../../assets/search/5.png";
import "./invite.css";

function Invite() {
  const [latestInvitation, setLatestInvitation] = useState(null);

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
    const message = formData.get("message");

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
          .invite_others(address, message);

        await tx.wait();

        alert("Invitation Successfully Sent");
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
            "execution reverted: You can't invite yourself."
          )
        ) {
          alert("You can't invite yourself");
        } else if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: This is already a registered user."
          )
        ) {
          alert("This invitee is already a registered user");
        } else {
          alert("'Something went wrong'");
        }
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };

  const handleInvitationSent = (inviter, invitee, message) => {
    setLatestInvitation({
      inviter: inviter,
      invitee: invitee,
      message: message,
    });
  };

  useEffect(() => {
    const eventFilter = contract.filters.InvitationSent();
    contract.on(eventFilter, handleInvitationSent);

    return () => {
      contract.off(eventFilter, handleInvitationSent);
    };
  }, [contract]);

  return (
    <>
      <div
        className="ps-1 pe-1 pt-5 pb-5 "
        id="invite"
        style={{ background: "#6548bc" }}
      >
        <h2 class="pb-3 pt-3 fw-bold text-center">
          Invite Others To Join This Platform
        </h2>

        <div class="pb-5 rounded" style={{ background: "#ffffff" }}>
          <div class="image-container">
            <img
              src={inviteImage}
              class="card-img"
              alt="inviteImage"
              style={{ height: "50%", width: "12%" }}
            />
          </div>
          <div class="card text-center" style={{ background: "#ffffff" }}>
            <div class="card-body">
              <h3 class="card-title mb-3"></h3>
              <p class="card-text"></p>
              <form onSubmit={handleFormSubmit}>
                <div className="row g-3">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <div class="input-group">
                      <input
                        type="text"
                        name="address"
                        class="form-control"
                        placeholder="address of invitee"
                        id="validationDefaultUsername"
                        aria-describedby="inputGroupPrepend2"
                        required
                      />
                    </div>
                    <div class="input-group mt-3">
                      <textarea
                        type="text"
                        name="message"
                        class="form-control"
                        placeholder="message"
                        aria-label="With textarea"
                        id="validationDefaultUsername"
                        aria-describedby="inputGroupPrepend2"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-2"></div>
                </div>

                <div class="button-container">
                  <button type="submit" class="btn btn-primary mt-3">
                    Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
          {latestInvitation && (
            <div class="card-footer mt-3">
              <p>
                <span className="fw-bold">Message:</span>{" "}
                {latestInvitation.message}
              </p>
              <p>
                <span className="fw-bold">Inviter:</span>{" "}
                {latestInvitation.inviter}
              </p>
              <p>
                <span className="fw-bold">Invitee:</span>{" "}
                {latestInvitation.invitee}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Invite;
