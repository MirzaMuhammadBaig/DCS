import React from "react";

function ReceiveCert() {
  return (
    <div>
      <div className="p-5" style={{background: "#6548bc"}}>
        <div class="card text-center" style={{background: "#27bee3"}}>
          {/* <div class="card-header">Become Provider</div> */}
          <div class="card-body">
            <h3 class="card-title">Check Received Certificate</h3>
            <p class="card-text mt-4">
              Certified user can send their certificate to anyone for
              visualization.
              <br />
              So, if you have received any certificate you can see.
            </p>
            <form class="row g-3">
              <div className="col-4"></div>
              <button type="button" class="btn btn-primary mt-4 col-4">
                Check Received Certificates
              </button>
              <div className="col-4"></div>
            </form>
          </div>
          <div class="card-footer text-muted"></div>
        </div>
      </div>
    </div>
  );
}

export default ReceiveCert;
