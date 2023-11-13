// https://timeapi.io/api/Time/current/zone?timeZone=Asia/Seoul

export const getTime = async (timeZone) => {
  return fetch(`/api/Time/current/zone?timeZone=Asia/Seoul`)
    .then((res) => res.json())
    .catch((err) => {
      new Error("시간을 가져오는데 실패했습니다.");
    });
};
