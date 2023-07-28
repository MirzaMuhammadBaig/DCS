import React from "react";
import invite from "../assets/search/5.png";
import "../App.css";

function Invite() {
  return (
    <>
      <div className="p-5" id="invite" style={{background: "#6548bc"}}>
        <h2 class="pb-3 pt-3 fw-bold">Invite Others To Join This Platform</h2>
        <div class="card text-center" style={{background: "#27bee3"}}>
          {/* <div class="card-header">Become Provider</div> */}
          <div class="card-body">
            {/* <h3 class="card-title">Create Certificate</h3> */}
            <div class="image-container">
              <img
                src={invite}
                class="card-img"
                alt="..."
                style={{ height: "100%", width: "25%" }}
              />
            </div>
            <form class="row g-3">
              <div className="col-3"></div>
              <div className="col-6">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter invitee address"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
                <div class="input-group mt-3">
                  <textarea
                    class="form-control"
                    placeholder="Enter message"
                    aria-label="With textarea"
                  ></textarea>
                </div>
              </div>
              <div className="col-3"></div>
              <div className="col-5" style={{ marginLeft: "50px" }}></div>
              <button type="button" class="btn btn-primary mt-3 col-1">
                Invite
              </button>
              <div className="col-5" style={{ marginRight: "50px" }}></div>
            </form>
          </div>
        </div>
      </div>
    </>
    // <div>
    //   <div className="p-5 bg-light" id="invite">
    //     <h2 class="pb-3 pt-3 fw-bold">Invite Others To Join This Platform</h2>

    //     <div class="card pb-5">
    //       <div class="image-container">
    //         <img
    //           src={invite}
    //           class="card-img"
    //           alt="..."
    //           style={{ height: "100%", width: "25%" }}
    //         />
    //       </div>

    //       <div class="card-img-overlay">
    //         {/* <h3 class="card-title text-center pt-5">Certificates & Skills</h3> */}
    //         <div class="card-text pt-5">
    //           <div class="container text-center" style={{ marginTop: "23vh" }}>
    //             <div class="row">
    //               <div className="col-2"></div>
    //               <form class="d-flex" role="search">
    //                 <input
    //                   class="form-control me-2"
    //                   type="text"
    //                   placeholder="invitee address"
    //                   aria-label="invitee address"
    //                 />
    //                 <input
    //                   class="form-control me-2"
    //                   type="text"
    //                   placeholder="invite message"
    //                   aria-label="invitee address"
    //                 />
    //                 <button class="btn btn-outline-primary" type="submit">
    //                   Invite
    //                 </button>
    //               </form>
    //               <div className="col-2"></div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Invite;
