import { ForecastWeather } from '@/types/forcastWeather'
import { WEATHER_API_KEY } from './apiKey'

export async function getForcastWeather(
  city: string,
): Promise<ForecastWeather> {
  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`,
  )

  if (!res.ok) {
    throw new Error('에러 발생! 3일간 날씨를 가져오지 못했습니다.')
  }

  return res.json()
}
