import React from "react";
import { Link } from "react-router-dom";

import Navbar2 from "../navbar/Navbar2";
import Footer2 from "../Footer/Footer2";

function Notification() {
  return (
    <>
      <Navbar2 />
      <div className="pt-5 pb-5 ps-1 pe-1" style={{ background: "#6548bc" }}>
        <div class="card" style={{ background: "#27bee3" }}>
          <div class="card-header">Invitation</div>
          <div class="card-body">
            <h5 class="card-title">This {`0x`} address invited you</h5>
            <p class="card-text mt-4 mb-4">
              <span className="fw-bold">Message: </span>
              {``}
            </p>
            <Link to="/" class="btn btn-primary">
              Join this platform
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-5 pb-5 ps-1 pe-1" style={{ background: "#6548bc" }}>
        <div class="card" style={{ background: "#27bee3" }}>
          <div class="card-header">Send Certificate To Visualization</div>
          <div class="card-body">
            <h5 class="card-title mb-3">
              This {`0x`} address sended our certificate to you
            </h5>
            <p class="card-text">
              <span className="fw-bold mt-2">Address: </span>
              {``}
            </p>
            <p class="card-text">
              <span className="fw-bold mt-2">Certificate Name: </span>
              {``}
            </p>
            <Link to="/certificate" class="btn btn-primary mt-2">
              Check his certificate
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-5 pb-5 ps-1 pe-1" style={{ background: "#6548bc" }}>
        <div class="card" style={{ background: "#27bee3" }}>
          <div class="card-header">Provider Issued The Certificate</div>
          <div class="card-body">
            <h5 class="card-title mb-3">
              This {`0x`} provider issued the certificate to you. <br /> Now,
              you can check from your address{}
            </h5>
            <p class="card-text">
              <span className="fw-bold mt-2">Provider address: </span>
              {``}
            </p>
            <p class="card-text">
              <span className="fw-bold mt-2">Provider Name: </span>
              {``}
            </p>
            <p class="card-text">
              <span className="fw-bold mt-2">Institute Name: </span>
              {``}
            </p>
            <Link to="/certificate" class="btn btn-primary mt-2">
              Check certificate
            </Link>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default Notification;
