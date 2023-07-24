import React from "react";
import useSWR, { SWRConfig } from "swr";
import axios from "axios";

export default function Fetcher() {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => axios.get(...args).then((res) => res.data),
      }}
    >
      <Page />
    </SWRConfig>
  );
}

function Page() {
  const { data, error } = useSWR("/api/user/123", {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // 404에서 재시도 안함
      if (error.message.includes(404)) {
        alert(404);
        return;
      }

      // 특정 키에 대해 재시도 안함
      //   if (key === "/api/user") return;

      // 10번까지만 재시도함
      if (retryCount >= 10) return;

      // 0.1초 후에 재시도
      setTimeout(() => revalidate({ retryCount }), 100);
    },
  });
  if (error) {
    return <div>error....</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }

  return <div>{data.name}</div>;
}
