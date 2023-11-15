import { currentTime } from '@/types/currentTime'

export async function getTime(tz: string): Promise<currentTime> {
  const res = await fetch(
    `https://timeapi.io/api/Time/current/zone?timeZone=${tz}`,
    { next: { tags: ['time', 'current', 'zone'] } },
  )

  if (!res.ok) {
    throw new Error('에러 발생! 시간을 가져오지 못했습니다')
  }

  return res.json()
}
