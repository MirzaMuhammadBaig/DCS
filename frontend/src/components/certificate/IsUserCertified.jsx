import React from 'react'

function IsUserCertified() {
  return (
    <div>
        <div className="p-5" style={{background: "#6548bc"}}>
        <div class="card text-center" style={{background: "#27bee3"}}>
          {/* <div class="card-header">Become Provider</div> */}
          <div class="card-body">
            <h3 class="card-title">User Is Certified</h3>
            <p class="card-text mt-4">
              You can check that is user certified in any specific course from user's address and certificate or course name.
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
                Check User
              </button>
              <div className="col-5"></div>
            </form>
          </div>
          <div class="card-footer text-muted"></div>
        </div>
      </div>
    </div>
  )
}

export default IsUserCertified