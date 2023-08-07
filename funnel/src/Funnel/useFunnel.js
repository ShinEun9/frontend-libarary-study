import React, { Children, isValidElement, useMemo, useState } from "react";

export default function useFunnel(params) {
  const [step, setStep] = useState(params);

  const Funnel = ({ step, children }) => {
    const validChildren = Children.toArray(children).filter(isValidElement);

    const targetStep = validChildren.find((child) => child.props.name === step);

    if (!targetStep) {
      throw new Error(step + " 스텝 컴포넌트를 찾지 못했습니다.");
    }

    return <>{targetStep}</>;
  };

  const Step = ({ children }) => {
    return <>{children}</>;
  };

  const RouteFunnel = (props) => {
    return <Funnel step={step} {...props} />;
  };
  const FunnelComponent = useMemo(
    () =>
      Object.assign(RouteFunnel, {
        Step,
      }),
    [step]
  );

  // const FunnelComponent = () => {
  //   return Object.assign(RouteFunnel, {
  //     Step,
  //   });
  // };

  return [FunnelComponent, setStep];
}

// RouteFunnel()
//    -> Step: ({ children }) => {…}

// FunnelComponent는 'return 함수'하는 모양이다. 그 함수는 react component를 반환한다.
// useMemo를 써야 되는 이유는 useMemo를 쓰지 않으면 함수자체를 반환해서 함수를  컴포넌트로 쓰려고 하기 때문이지만, useMemo는 함수 실행값인 리액트 컴포넌트를 컴포넌트로 쓰려고 해서 된다.
// Functions are not valid as a React child

// ! https://github.com/toss/slash/blob/main/packages/react/use-funnel/src/useFunnel.tsx
