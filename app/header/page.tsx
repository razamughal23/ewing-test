"use client";
import React from "react";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-red">
        <div className="container-fluid">
          <p className="navbar-nav me-auto mb-2 mb-lg-0">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Header;
