import React from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

function useUser(id) {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export default function Page() {
  return (
    <div>
      <Profile id={123} />
      <Avatar id={123} />
    </div>
  );
}

function Profile({ id }) {
  const { user, isLoading, isError } = useUser(id);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div>hello {user.name}!</div>
    </>
  );
}

export function Avatar({ id }) {
  const { user, isLoading, isError } = useUser(id);

  if (isError) return <div>failed to load Avatar</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>hello {user.name} Avatar!</div>;
}

// 각각의 컴포넌트에서 훅을 썼음에도 api 호출을 두번하지 않고, api key이름만 동일하다면 응답은 캐쉬한 값을 내려준다. = 한번만 호출한다.
// 자동갱신 & 자동갱신을 안할 수 있게 할 수도있다. disable automatic revalidation
// 1. 사용자의 포커스 시 데이터를 갱신할 수 있음
// 2. 인터벌시 데이터를 갱신할 수 있음(폴링) => 실시간

// 훅을 쓸 때 마다 option들을 넣어야하는 것 대신에 전역으로 설정할 수 있다. https://swr.vercel.app/ko/docs/global-configuration
// option을 오버라이드 할 수도 있음.
