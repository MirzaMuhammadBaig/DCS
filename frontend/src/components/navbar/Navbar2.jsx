import React from "react";
import { Link } from "react-router-dom";

import icon from "../../assets/nav/Logo-PNG.webp";
import bell from "../../assets/nav/bell.png";

import Wallet from "../../wallet/Wallet";

import "./navbar.css";

function Navbar2() {
  return (
    <>
      <div style={{ background: "#e6e6e6" }}>
        <nav class="navbar navbar-expand-lg ps-3 pe-3">
          <div class="container-fluid">
            <Link class="navbar-brand" to="/">
              <img
                src={icon}
                alt=""
                style={{ height: "72px", width: "144px" }}
              />
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="/navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
                <li class="nav-item ">
                  <Link class="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li class="nav-item ms-3">
                  <Link class="nav-link" to="/provider">
                    Provider
                  </Link>
                </li>
                <li class="nav-item ms-3">
                  <Link class="nav-link nav-item" to="/certificate">
                    Certificate
                  </Link>
                </li>
              </ul>

              <Link class="navbar-brand" to="/notifications">
                <img
                  src={bell}
                  alt=""
                  style={{ height: "36px", width: "36px" }}
                />
              </Link>
              <Wallet />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar2;
