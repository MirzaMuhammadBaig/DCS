import React from "react";
import con from "../../assets/contact/6.png";

function Contact() {
  return (
    <div className="p-5" id="contact" style={{  background: "#6548bc"}}>
      <h2 className="pt-3 pb-3 fw-bold">Contact</h2>
      <div className="card mb-3" style={{background: "#27bee3"}}>
        <div className="card-body">
          <img
            src={con}
            className="card-img-top mb-2"
            alt="..."
            style={{ width: "200px", height: "200px" }}
          />
          <div className="row pt-5 pb-3">
            <div className="col-1"></div>

            {/* <!-- Email --> */}
            <div className="col-2">
              <a href="mailto:your_email@example.com" title="Email">
                <i className="fas fa-envelope contact-icon"></i>
              </a>
              <p className="fw-bold">Email</p>
            </div>
            {/* <!-- LinkedIn --> */}
            <div className="col-2">
              <a
                href="https://www.linkedin.com/in/your_linkedin_profile"
                target="_blank"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin contact-icon"></i>
              </a>
              <p className="fw-bold">LinkedIn</p>
            </div>
            {/* <!-- Twitter --> */}
            <div className="col-2">
              <a
                href="https://twitter.com/your_twitter_profile"
                target="_blank"
                title="Twitter"
              >
                <i className="fab fa-twitter contact-icon"></i>
              </a>
              <p className="fw-bold">Twitter</p>
            </div>
            {/* <!-- Reddit --> */}
            <div className="col-2">
              <a
                href="https://www.reddit.com/user/your_reddit_profile"
                target="_blank"
                title="Reddit"
              >
                <i className="fab fa-reddit contact-icon"></i>
              </a>
              <p className="fw-bold">Reddit</p>
            </div>
            {/* <!-- WhatsApp (Replace '1234567890' with your WhatsApp number) --> */}
            <div className="col-2">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp contact-icon"></i>
              </a>
              <p className="fw-bold">WhatsApp</p>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
