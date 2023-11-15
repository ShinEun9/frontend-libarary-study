'use client'
import revalidateTagAction from '@/app/actions'
import React from 'react'

export default function RevalidationButton() {
  const handleClick = () => {
    revalidateTagAction('time')
  }
  return <button onClick={handleClick}>캐시 비우기</button>
}
