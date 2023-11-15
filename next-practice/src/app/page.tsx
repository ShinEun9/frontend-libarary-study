import RevalidationButton from '@/components/RevalidationButton'
import { getCurrentWeather } from '@/utils/getCurrentWeather'
import { getTime } from '@/utils/getTime'
import Link from 'next/link'
import React from 'react'

export default async function Home() {
  // 지역별 날씨 데이터
  // current.condition.text 홍콩과 서울
  const cities = [
    { name: '서울', code: 'seoul' },
    { name: '홍콩', code: 'hongkong' },
  ]
  const currentSeoul = await getCurrentWeather('seoul')
  const currentHongkong = await getCurrentWeather('hongkong')
  const currentTime = await getTime('Asia/Seoul')

  return (
    <div>
      <h1>날씨앱 만들기 🌈</h1>
      <p>현재 시각은 {currentTime.dateTime}</p>
      <RevalidationButton />
      <ul>
        {cities.map((city) => {
          return (
            <li key={city.code}>
              <Link href={`/${city.code}`}>
                {city.name}의 날씨는 {currentSeoul.current.condition.text}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
