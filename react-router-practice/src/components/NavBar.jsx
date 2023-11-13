import React from "react";
import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive
              ? "red"
              : "black",
          };
        }}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive
              ? "red"
              : "black",
          };
        }}
        to="/about"
      >
        About
      </NavLink>
    </nav>
  );
}
