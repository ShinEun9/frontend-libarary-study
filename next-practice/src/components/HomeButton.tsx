'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HomeButton() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/')
  }
  return <button onClick={handleClick}>홈으로</button>
}
