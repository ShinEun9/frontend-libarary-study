import React from "react";
import useSWR, { SWRConfig, useSWRConfig } from "swr";
import axios from "axios";

export default function Mutate() {
  return (
    <SWRConfig>
      <Page />
    </SWRConfig>
  );
}

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

function Page() {
  const { data } = useSWR("/api/user/123", fetcher);
  const { mutate } = useSWRConfig();

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h1>My name is {data.name}.</h1>
      <button
        onClick={async () => {
          const newName = data.name.toUpperCase();
          // API에 대한 요청을 종료하여 데이터를 업데이트 합니다.
          //   await requestUpdateUsername(newName);

          // 로컬데이터를 즉시 업데이트 하지만, 갱신은 비활성화
          mutate("/api/user/123", { ...data, name: newName }, false);

          // 로컬 데이터가 올바른지 확인하기위해 갱신(refetch) 트리거
          //   mutate("/api/user/123");
        }}
      >
        Uppercase my name!
      </button>
    </div>
  );
}
