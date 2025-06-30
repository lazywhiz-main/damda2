'use client'

import { GoogleAnalytics as GA } from '@next/third-parties/google'
import { useEffect } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const { consent } = useCookieConsent()

  useEffect(() => {
    // 개발 환경에서는 GA 비활성화
    if (process.env.NODE_ENV === 'development') {
      console.log('Google Analytics disabled in development mode')
      return
    }

    // GA ID가 설정되지 않은 경우 경고
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics Measurement ID not found')
      return
    }

    // 쿠키 동의 확인
    if (consent?.analytics) {
      console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID)
    } else {
      console.log('Google Analytics disabled - user did not consent to analytics cookies')
    }
  }, [GA_MEASUREMENT_ID, consent])

  // 다음 조건 중 하나라도 해당하면 GA 비활성화
  const shouldDisableGA = 
    process.env.NODE_ENV === 'development' ||
    !GA_MEASUREMENT_ID ||
    !consent?.analytics

  if (shouldDisableGA) {
    return null
  }

  return <GA gaId={GA_MEASUREMENT_ID} />
} 