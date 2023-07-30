import React from "react";
import { Link } from "react-router-dom";

import icon from "../../assets/nav/Logo-PNG.webp";

import { FaTwitterSquare } from "react-icons/fa";
import { FaRedditSquare } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaReact } from "react-icons/fa";

import "./footer.css";

const Footer = () => {
  return (
    <div className="footer pt-1">
      <Link to="/">
        <img src={icon} alt="" style={{ height: "90px", width: "180px" }} />
      </Link>
      <br />
      <a
        href="#"
        className="fw-bold"
        style={{ textDecoration: "none", color: "#352072", fontSize: "20px" }}
      >
        FUTURE OF LAB WORK
      </a>
      <ul className="permalinks pt-4" style={{ listStyle: "none" }}>
        <li>
          <a href="#" style={{ textDecoration: "none" }}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" style={{ textDecoration: "none" }}>
            About
          </a>
        </li>
        <li>
          <a href="#search" style={{ textDecoration: "none" }}>
            Searches
          </a>
        </li>
        <li>
          <a href="#invite" style={{ textDecoration: "none" }}>
            Invite
          </a>
        </li>
        <li>
          <a href="#contact" style={{ textDecoration: "none" }}>
            Contact
          </a>
        </li>
        <li>
          <Link to="/provider" style={{ textDecoration: "none" }}>
            Provider
          </Link>
        </li>
        <li>
          <Link to="/certificate" style={{ textDecoration: "none" }}>
            Certificate
          </Link>
        </li>
      </ul>

      <div className="footer__socials">
        <a href="/" target="_blank" rel="noreferrer">
          <AiFillFacebook />
        </a>
        <a href="/" target="_blank" rel="noreferrer">
          <FaTwitterSquare />
        </a>
        <a href="/" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
        <a href="/" target="_blank" rel="noreferrer">
          <FaRedditSquare />
        </a>
      </div>

      <div className="footer__copyright">
        <small>
          Website Made With React <FaReact className="reaction" /> &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &copy; 2023. All rights reserved.
        </small>
      </div>
    </div>
  );
};

export default Footer;
