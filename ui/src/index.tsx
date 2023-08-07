import React from "react";
import ReactDOM from "react-dom/client";
import SkeletonApp from "./SkeletonApp";
import ModalApp from "./ModalApp";
import InfiniteScrollApp from "./InfiniteScrollApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    {/* <SkeletonApp /> */}
    {/* <ModalApp /> */}
    <InfiniteScrollApp />
  </>
);
