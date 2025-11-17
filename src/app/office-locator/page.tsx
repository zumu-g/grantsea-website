'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OfficeLocator() {
  const router = useRouter()

  useEffect(() => {
    router.push('/offices')
  }, [router])

  return null
}