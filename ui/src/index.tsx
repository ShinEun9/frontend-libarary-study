import React from "react";
import ReactDOM from "react-dom/client";
// import SkeletonApp from "./Skeleton/SkeletonApp";
import ModalApp from "./Modal/ModalApp";
// import InfiniteScrollApp from "./InfiniteScroll/InfiniteScrollApp";
import IntersectionObserverApp from "./IntersectionObserver/IntersectionObserverApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    {/* <SkeletonApp /> */}
    <ModalApp />
    {/* <InfiniteScrollApp /> */}
    {/* <IntersectionObserverApp /> */}
  </>
);
