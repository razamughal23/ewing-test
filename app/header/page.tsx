"use client";
import React, { useState } from "react";
import { Header_Data } from "../static-data";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Home
          </a>
          <div className="navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <ul className="dropdown-menu show position-static">
                  {Header_Data.map((item) => (
                    <NestedDropdown key={item.id} item={item} />
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const NestedDropdown = ({ item }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={`dropdown-submenu position-relative ${open ? "show" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="dropdown-item dropdown-toggle">{item.name}</div>
      {item.children && (
        <ul
          className={`dropdown-menu ${
            open ? "show" : ""
          } position-absolute start-100 top-0`}
        >
          {item.children.map((child: any) => (
            <NestedDropdown key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Header;
