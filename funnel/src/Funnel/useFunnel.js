// import { assert } from "@toss/assert";
// import { safeSessionStorage } from "@toss/storage";
// import { useQueryParam } from "@toss/use-query-param";
// import { QS } from "@toss/utils";
// import { useRouter } from "next/router";
// import { useCallback, useMemo, useRef, useState } from "react";
// import { useQuery } from "react-query";
// import { Funnel, Step } from "./Funnel";

// const DEFAULT_STEP_QUERY_KEY = "funnel-step";

// export const useFunnel = (steps) => {
//   const router = useRouter();
//   const stepQueryKey = DEFAULT_STEP_QUERY_KEY;

//   assert(steps.length > 0, "steps가 비어있습니다.");

//   const FunnelComponent = () =>
//     Object.assign(
//       function RouteFunnel(props) {
//         const step = useQueryParam(stepQueryKey);

//         return <Funnel steps={steps} step={step} {...props} />;
//       },
//       {
//         Step,
//       }
//     );

//   const setStep = useCallback(
//     (step, setStepOptions) => {
//       const { preserveQuery = true, query = {} } = setStepOptions || {};

//       const url = `${QS.create({
//         ...(preserveQuery ? router.query : undefined),
//         ...query,
//         [stepQueryKey]: step,
//       })}`;

//       options.onStepChange(step);

//       switch (setStepOptions.stepChangeType) {
//         case "replace":
//           router.replace(url, undefined, {
//             shallow: true,
//           });
//           return;
//         case "push":
//         default:
//           router.push(url, undefined, {
//             shallow: true,
//           });
//           return;
//       }
//     },
//     [options, router]
//   );

//   return Object.assign([FunnelComponent, setStep], {
//     withState: (initialState) => {
//       return [FunnelComponent, state, (next) => {}];
//     },
//   });
// };

// const createFunnelStateId = (id) => `use-funnel-state__${id}`;

// function createFunnelStorage(funnelStateId, storageType = "sessionStorage") {
//   switch (storageType) {
//     case "sessionStorage":
//       return {
//         get: async () => {
//           const d = safeSessionStorage.get(funnelStateId);
//           if (d == null) {
//             return null;
//           }
//           return JSON.parse(d);
//         },
//         set: async (value) => {
//           safeSessionStorage.set(funnelStateId, JSON.stringify(value));
//         },
//         clear: async () => {
//           safeSessionStorage.remove(funnelStateId);
//         },
//       };
//     default:
//       throw new Error("정확한 스토리지 타입을 명시해주세요.");
//   }
// }

// function useFunnelState(defaultValue, options) {
//   const { pathname, basePath } = useRouter();

//   const storage =
//     options.storage ||
//     createFunnelStorage(createFunnelStateId(`${basePath}${pathname}`));
//   const persistentStorage = useRef(storage).current;

//   const initialState = useQuery({
//     queryFn: () => {
//       return persistentStorage.get();
//     },
//     suspense: true,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   }).data;

//   const [_state, _setState] = useState(initialState || defaultValue);

//   const setState = useCallback(
//     (state) => {
//       _setState((prev) => {
//         if (typeof state === "function") {
//           const newState = state(prev);
//           persistentStorage.set(newState);
//           return newState;
//         } else {
//           persistentStorage.set(state);
//           return state;
//         }
//       });
//     },
//     [persistentStorage]
//   );

//   const clearState = useCallback(() => {
//     _setState({});
//     persistentStorage.clear();
//   }, [persistentStorage]);

//   return [_state, setState, clearState];
// }

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

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props) {
          return <Funnel step={step} {...props} />;
        },
        {
          Step,
        }
      ),
    [step]
  );

  return [FunnelComponent, setStep];
}
