import React from "react";
import { SWRConfig, useSWRConfig } from "swr";
import { Avatar } from "./Profile";

export default function Cache() {
  return (
    <SWRConfig
      value={{ refreshInterval: 1000, provider: localStorageProvider }}
    >
      <Page />
    </SWRConfig>
  );
}

const Page = () => {
  const { cache, mutate } = useSWRConfig();
  return (
    <div>
      <Avatar id={1212} />
      <button
        onClick={() => {
          mutate("/api/user/1212"); // mutate는 다시 fetch하고 싶을 때, 이 키로부터 데이터를 꺼내온 모든 컴포넌트에게 데이터 다시 한번 fetch해 명령!
          //   console.log(`check: ${JSON.stringify(cache.get("/api/user/1212"))}`);
        }}
      >
        check
      </button>
    </div>
  );
};

// ! LocalStorage 기반 영구 캐시 캐시를 localStorage와 동기화하길 원할 수도 있다.
// https://swr.vercel.app/ko/docs/advanced/cache#cache-provider
function localStorageProvider() {
  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  return map;
}
