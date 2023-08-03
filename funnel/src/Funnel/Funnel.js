import React, { Children, isValidElement, useEffect } from "react";

const Funnel = ({ steps, step, children }) => {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((i) => steps.includes(i.props.name) || "");

  const targetStep = validChildren.find((child) => child.props.name === step);

  if (!targetStep) {
    throw new Error(step + " 스텝 컴포넌트를 찾지 못했습니다.");
  }

  return <>{targetStep}</>;
};

const Step = ({ onEnter, children }) => {
  useEffect(() => {
    onEnter?.();
  }, [onEnter]);

  return <>{children}</>;
};

export { Funnel, Step };
