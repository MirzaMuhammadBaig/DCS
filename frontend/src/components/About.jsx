import React from "react";
import abt from "../assets/Hero/4.jpg";

function About() {
  return (
    <div style={{background: "#6548bc"}}>
      <div className="p-5" id="about" >
        <h2 class="pt-3 fw-bold">About</h2>
        <div class="card mb-3" style={{ width: "100%" , background: "#1cbde0"}}>
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src={abt}
                class="img-fluid rounded-start"
                alt="..."
                style={{ width: "100%" }}
              />
            </div>
            <div class="col-md-8">
              <div class="card-body" style={{ textAlign: "start" , fontSize:"18px"}}>
                {/* <h4 class="card-title fw-bold pt-3">About</h4> */}
                <p class="card-text pt-1">
                  Our smart contract is a cutting-edge solution that empowers
                  education providers to issue certifications to users for
                  specific courses, all within a secure and transparent
                  environment. Whether you are an educational institution, a
                  training center, or an individual educator, our platform
                  streamlines the certification process and ensures the
                  authenticity of qualifications.
                </p>
                <h5 class="card-title fw-bold pt-4">How it Works</h5>
                <ul class="card-text">
                  <li>
                    <span className="fw-bold">Issuance of Certifications:</span>{" "}
                    Education providers can create certificates for their
                    courses, specifying essential details like the course name
                    and associated skills.
                  </li>
                  <li>
                    <span className="fw-bold">Certification Delivery:</span>{" "}
                    Once a user successfully completes a course, the provider
                    can issue a certification to the user, verifying their
                    accomplishments.
                  </li>
                  <li>
                    <span className="fw-bold">Certification Verification:</span>{" "}
                    Users can access and share their verified certifications
                    with potential employers or institutions, showcasing their
                    expertise in specific fields.
                  </li>
                </ul>
                <h5 class="card-title fw-bold pt-4">Benefits</h5>
                <ul class="card-text">
                  <li>
                    <span className="fw-bold">Trustworthy Credentials:</span>{" "}
                    Our blockchain-based solution guarantees the authenticity
                    and immutability of certifications, preventing any tampering
                    or fraud.
                  </li>
                  <li>
                    <span className="fw-bold">
                      Efficient Certification Process:
                    </span>{" "}
                    With automated issuance and verification, the certification
                    process becomes quicker and more convenient for both
                    providers and users.
                  </li>
                  <li>
                    <span className="fw-bold">Enhanced Job Opportunities:</span>{" "}
                    Certified users can stand out from the crowd and increase
                    their job prospects, thanks to their verified skills and
                    qualifications.
                  </li>
                  <li>
                    <span className="fw-bold">User Privacy:</span> Certified
                    users can stand out from the crowd and increase their job
                    prospects, thanks to their verified skills and
                    qualifications.
                  </li>
                </ul>
                {/* <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
