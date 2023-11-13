import React from "react";
import { getTime } from "./api/getTime";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function App() {
  const seoulTimeZone = "Asia/Seoul";
  const { isPending, error, data } = useQuery({
    queryKey: ["api", "time", { tz: seoulTimeZone }],
    queryFn: () => getTime(seoulTimeZone),
    staleTime: 1000 * 5,
  });

  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ["api"] });
  };

  if (isPending)
    return (
      <div>
        <p>로딩중...</p>
      </div>
    );

  if (error) return <div>에러 발생 {error.message}</div>;

  return (
    <div>
      <h1>React Query</h1>
      <p> 지금 시간 : {data.dateTime}</p>
      <button onClick={handleClick}>캐시 무효화</button>
    </div>
  );
}
