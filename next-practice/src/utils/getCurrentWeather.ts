import { CurrentWeather } from '@/types/currentWeather'
import { WEATHER_API_KEY } from './apiKey'
export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`,
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('에러 발생! 현재 날씨를 가져오지 못했습니다.')
  }

  return res.json()
}
