import logo from "./draw-logo.png";
import "./Nav.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [active, setActive] = useState("");
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/draw" className="navbar-item" id="nav-logo">
          <img src={logo} alt="draw logo" />
        </Link>
        <div
          className="navbar-burger"
          id="burger"
          onClick={() => setActive((prev) => (prev === "" ? "is-active" : ""))}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`navbar-menu ${active}`}>
        <div className="navbar-start"></div>
        <div className="navbar-end">
          <Link to="/" className="navbar-item">
            About
          </Link>
          <Link to="/gallery" className="navbar-item">
            Gallery
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
