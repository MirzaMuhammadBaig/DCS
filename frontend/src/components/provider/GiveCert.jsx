import React from "react";

function GiveCert() {
  return (
    <>
      <div className="p-5" style={{background: "#6548bc"}}>
        <div class="card text-center" style={{background: "#27bee3"}}>
          {/* <div class="card-header">Become Provider</div> */}
          <div class="card-body">
            <h3 class="card-title">Issue Certificate</h3>
            <p class="card-text mt-4">
              After created the certificate you can issue certificate to the
              registered user.
            </p>
            <form class="row g-3">
              <div className="col-2"></div>
              <div className="col-8">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter name of certificate/course"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
                <div class="input-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter duration of certificate/course"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
                <div class="input-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter certificate url"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
                <div class="input-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter instructor names"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
                <div class="input-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter receiver address"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
              </div>
              <div className="col-2"></div>
              <div className="col-5"></div>
              <button type="button" class="btn btn-primary mt-3 col-2">
                Issue Certificate
              </button>
              <div className="col-5"></div>
            </form>
          </div>
          <div class="card-footer text-muted"></div>
        </div>
      </div>
    </>
  );
}

export default GiveCert;
