import React from "react";

function CheckUserCert() {
  return (
    <>
      <div>
        <div className="p-5" style={{background: "#6548bc"}}>
          <div class="card text-center" style={{background: "#27bee3"}}>
            {/* <div class="card-header">Become Provider</div> */}
            <div class="card-body">
              <h3 class="card-title">Get Certificate Details</h3>
              <p class="card-text mt-4">
                You can get detailsof certificate of any certified user from his
                address.
              </p>
              <form class="row g-3">
                <div className="col-2"></div>
                <div className="col-8">
                  <div class="input-group mt-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter wallet address of user"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>
                </div>
                <div className="col-2"></div>
                <div className="col-5"></div>
                <button type="button" class="btn btn-primary mt-3 col-2">
                  Get Details
                </button>
                <div className="col-5"></div>
              </form>
            </div>
            <div class="card-footer text-muted"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckUserCert;
