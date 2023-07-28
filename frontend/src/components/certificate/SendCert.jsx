import React from "react";
import Navbar2 from "../navbar/Navbar2";
import Footer2 from "../Footer/Footer2";
import CheckUserCert from "./CheckUserCert";
import ReceiveCert from "./ReceiveCert";
import IsUserCertified from "./IsUserCertified"

function SendCert() {
  return (
    <>
      <Navbar2 />
      <CheckUserCert/>
      <IsUserCertified/>
      <div className="p-5" style={{background: "#6548bc"}}>
        <div class="card text-center" style={{background: "#27bee3"}}>
          {/* <div class="card-header">Become Provider</div> */}
          <div class="card-body">
            <h3 class="card-title">Send Certificate</h3>
            <p class="card-text mt-4">
              If you have any certificate, you can send to any registered user.
            </p>
            <form class="row g-3">
              <div className="col-2"></div>
              <div className="col-8">
                <div class="input-group mt-3">
                  <input
                    type="text"
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
              <button type="button" class="btn btn-primary mt-3 col-2">
                Send Certificate
              </button>
              <div className="col-5"></div>
            </form>
          </div>
          <div class="card-footer text-muted"></div>
        </div>
      </div>
      <ReceiveCert/>
      <Footer2 />
    </>
  );
}

export default SendCert;
