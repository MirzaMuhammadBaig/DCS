import React from "react";
import icon from "../../assets/nav/Logo-PNG.webp";
import bell from "../../assets/nav/bell.png";
import { Link } from "react-router-dom";
import Hero from "../Hero";
import Search from "../Search/Search";
import About from "../About";
import Invite from "../Invite";
import Footer from "../Footer/Footer";
import Wallet from "../../wallet/Wallet"

import "./navbar.css"; // Make sure to import the CSS file for custom styles

function Navbar() {
  return (
    <>
      <div style={{background:"#e6e6e6"}}>
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
                <Wallet/>
            </div>
          </div>
        </nav>
      </div>
      <Hero/>
      <About/>
      <Search/>
      <Invite/>
      <Footer/>
    </>
  );
}

export default Navbar;

{
  /* <li class="nav-item dropdown ms-3">
                  <a
                    class="nav-link dropdown-toggle"
                    href="/provider"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Provider
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="/">
                        Become Provider
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="/">
                        Create Certificate
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/">
                        Issue Certificate
                      </a>
                    </li>
                  </ul>
                </li> */
}
{
  /* <li class="nav-item dropdown ms-3">
                  <a
                    class="nav-link dropdown-toggle"
                    href="/certificates"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Certificate
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="/">
                        Check Certificate
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="/">
                        Send Certificate
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="/">
                        Receive Certificate
                      </a>
                    </li>
                  </ul>
                </li> */
}

{
  /* <div class="dropdown" style={{width:"30%"}}>
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Certificates & Skills
                </button>
                <ul class="dropdown-menu" style={{width:"100%"}}>
                  <li className="dropdown-item" style={{width:"100%"}}>
                    <form class="d-flex" role="search">
                      <input
                        class="form-control me-2"
                        type="certificates"
                        placeholder="certificates"
                        aria-label="certificates"
                      />

                      <button class="btn btn-outline-primary" type="submit">
                        Search
                      </button>
                    </form>
                  </li>
                  <li><hr class="dropdown-divider"/></li>
                  <li className="dropdown-item" >
                    <form class="d-flex" role="search">
                      <input
                        class="form-control me-2"
                        type="skills"
                        placeholder="skills"
                        aria-label="skills"
                      />

                      <button class="btn btn-outline-primary" type="submit">
                        Search
                      </button>
                    </form>
                  </li>
                </ul>
              </div> */
}
