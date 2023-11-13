import React from "react";
import {
  Link,
  Outlet,
} from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
