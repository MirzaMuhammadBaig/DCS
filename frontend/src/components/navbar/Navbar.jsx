import React from "react";
import { Link } from "react-router-dom";

import icon from "../../assets/nav/Logo-PNG.webp";
import bell from "../../assets/nav/bell.png";

import Hero from "../Hero";
import About from "../About";
import Search from "../Search/Search";
import Invite from "../invite/Invite";
import Footer from "../Footer/Footer";
import Wallet from "../../wallet/Wallet";

import "./navbar.css";

function Navbar() {
  return (
    <>
      <nav
        class="navbar navbar-expand-lg bg-body-tertiary"
        style={{ background: "#e6e6e6" }}
      >
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            <img src={icon} alt="" style={{ height: "72px", width: "144px" }} />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item ms-3">
                <Link class="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item ms-3">
                <a class="nav-link" href="#about">
                  About
                </a>
              </li>
              <li class="nav-item ms-3">
                <a class="nav-link" href="#search">
                  Search
                </a>
              </li>
              <li class="nav-item ms-3">
                <a class="nav-link" href="#invite">
                  Invite
                </a>
              </li>

              <li class="nav-item ms-3">
                <Link class="nav-link" to="/provider">
                Issuer
                </Link>
              </li>
              <li class="nav-item ms-3">
                <Link class="nav-link nav-item" to="/certificate">
                  Holder
                </Link>
              </li>
            </ul>
            <div className="ms-5 me-5"></div>
            <div className="ms-5 me-5"></div>
            <div className="ms-5 me-5"></div>

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
      <Hero />
      <About />
      <Search />
      <Invite />
      <Footer />
    </>
  );
}

export default Navbar;
