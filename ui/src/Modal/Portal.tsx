import React from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  selector?: string;
}
const Portal: React.FC<Props> = ({ children, selector }) => {
  const rootElement = selector && document.querySelector(selector);

  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
};

export default Portal;
// Portal은 외부 DOM에 렌더링하는 역할
// <div id="modal-root"></div>
// createPortal은 첫번째 인자로 렌더링할 children을 받고, 두번째 인자로 렌더링 될 컨테이너 엘리먼트를 받는다.
