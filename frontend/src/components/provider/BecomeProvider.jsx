import React from "react";
import Navbar2 from "../navbar/Navbar2";
import Footer2 from "../Footer/Footer2";
import CreateCert from "./CreateCert";
import GiveCert from "./GiveCert";

function BecomeProvider() {
  return (
    <>
      <Navbar2 />
      <div className="p-5" style={{background: "#6548bc"}}>
        <div class="card text-center" style={{background: "#27bee3"}}>
          {/* <div class="card-header">Become Provider</div> */}
          <div class="card-body">
            <h3 class="card-title">Become Provider</h3>
            <p class="card-text mt-4">
              First you will have to connect with wallet then register yourself
              then you can become provider.
            </p>
            <form class="row g-3">
              <div className="col-2"></div>
              <div className="col-8">
                <div class="input-group ">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your institute name"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                  {/* <span class="input-group-text">
                      <button type="button" class="btn btn-primary">
                        Register
                      </button>
                    </span> */}
                </div>
              </div>
              <div className="col-2"></div>
              <div className="col-5"></div>
              <button type="button" class="btn btn-primary mt-3 col-2">
                Become Provider
              </button>
              <div className="col-5"></div>
            </form>
          </div>
          <div class="card-footer text-muted"></div>
        </div>
      </div>
      <CreateCert/>
      <GiveCert/>
      <Footer2 />
    </>
  );
}

export default BecomeProvider;
