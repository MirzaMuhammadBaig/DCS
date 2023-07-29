import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import inviteImage from "../assets/search/5.png";

function Invite() {
  const [invite, setInvite] = useState(null);
  const [latestInvitation, setLatestInvitation] = useState(null);

  const contractAddress = "0xac427e8155a8c24112f62b9e69d7a21efa734af9";
  const contractABI = require("../contract/abi.json");
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
        setInvite(tx);

        await tx.wait();
        setInvite(tx);
        // console.log(invite);
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

    // Clean up the event listener when the component unmounts
    return () => {
      contract.off(eventFilter, handleInvitationSent);
    };
  }, [contract]);

  return (
    <>
      <div className="p-5" style={{ background: "#6548bc" }} id="invite">
        <h2 class="pb-3 pt-3 fw-bold text-center">Invite Others To Join This Platform</h2>
        <div class="card text-center rounded" style={{ background: "#27bee3" }}>
          <div class="card-body">
            <div class="image-container">
              <img
                src={inviteImage}
                class="card-img"
                alt="inviteImage"
                style={{ height: "50%", width: "12%" }}
              />
            </div>
            <form class="row g-3" onSubmit={handleFormSubmit}>
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
              <div className="col-5"></div>
              <button type="submit" class="btn btn-primary mt-3 col-2">
                Create Certificate
              </button>
              <div className="col-5"></div>
            </form>
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

// import React from "react";
// import invite from "../assets/search/5.png";
// import "../App.css";

// function Invite() {
//   return (
//     <>
//       <div className="p-5" id="invite" style={{background: "#6548bc"}}>
//         <h2 class="pb-3 pt-3 fw-bold">Invite Others To Join This Platform</h2>
//         <div class="card text-center" style={{background: "#27bee3"}}>
//           <div class="card-body">
//             <div class="image-container">
//               <img
//                 src={invite}
//                 class="card-img"
//                 alt="..."
//                 style={{ height: "100%", width: "25%" }}
//               />
//             </div>
//             <form class="row g-3">
//               <div className="col-3"></div>
//               <div className="col-6">
//                 <div class="input-group">
//                   <input
//                     type="text"
//                     class="form-control"
//                     placeholder="Enter invitee address"
//                     id="validationDefaultUsername"
//                     aria-describedby="inputGroupPrepend2"
//                     required
//                   />
//                 </div>
//                 <div class="input-group mt-3">
//                   <textarea
//                     class="form-control"
//                     placeholder="Enter message"
//                     aria-label="With textarea"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="col-3"></div>
//               <div className="col-5" style={{ marginLeft: "50px" }}></div>
//               <button type="button" class="btn btn-primary mt-3 col-1">
//                 Invite
//               </button>
//               <div className="col-5" style={{ marginRight: "50px" }}></div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//     // <div>
//     //   <div className="p-5 bg-light" id="invite">
//     //     <h2 class="pb-3 pt-3 fw-bold">Invite Others To Join This Platform</h2>

//     //     <div class="card pb-5">
//     //       <div class="image-container">
//     //         <img
//     //           src={invite}
//     //           class="card-img"
//     //           alt="..."
//     //           style={{ height: "100%", width: "25%" }}
//     //         />
//     //       </div>

//     //       <div class="card-img-overlay">
//     //         {/* <h3 class="card-title text-center pt-5">Certificates & Skills</h3> */}
//     //         <div class="card-text pt-5">
//     //           <div class="container text-center" style={{ marginTop: "23vh" }}>
//     //             <div class="row">
//     //               <div className="col-2"></div>
//     //               <form class="d-flex" role="search">
//     //                 <input
//     //                   class="form-control me-2"
//     //                   type="text"
//     //                   placeholder="invitee address"
//     //                   aria-label="invitee address"
//     //                 />
//     //                 <input
//     //                   class="form-control me-2"
//     //                   type="text"
//     //                   placeholder="invite message"
//     //                   aria-label="invitee address"
//     //                 />
//     //                 <button class="btn btn-outline-primary" type="submit">
//     //                   Invite
//     //                 </button>
//     //               </form>
//     //               <div className="col-2"></div>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }

// export default Invite;
