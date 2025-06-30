'use client'

import { useState, useEffect } from 'react'

export type CookieConsent = {
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_CONSENT_VERSION = '1.0'

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // 브라우저에서만 실행
    if (typeof window === 'undefined') return

    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (savedConsent) {
        const parsed = JSON.parse(savedConsent)
        // 버전 확인 - 버전이 다르면 재동의 필요
        if (parsed.version === COOKIE_CONSENT_VERSION) {
          setConsent(parsed.consent)
          setShowBanner(false)
        } else {
          setShowBanner(true)
        }
      } else {
        setShowBanner(true)
      }
    } catch (error) {
      console.error('쿠키 동의 설정 로드 중 오류:', error)
      setShowBanner(true)
    }
  }, [])

  const saveConsent = (newConsent: CookieConsent) => {
    const consentData = {
      consent: newConsent,
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    }

    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
      setConsent(newConsent)
      setShowBanner(false)
    } catch (error) {
      console.error('쿠키 동의 설정 저장 중 오류:', error)
    }
  }

  const acceptAll = () => {
    const allAccepted: CookieConsent = {
      analytics: true,
      marketing: true,
      functional: true,
    }
    saveConsent(allAccepted)
  }

  const rejectAll = () => {
    const allRejected: CookieConsent = {
      analytics: false,
      marketing: false,
      functional: true, // 필수 기능 쿠키는 항상 허용
    }
    saveConsent(allRejected)
  }

  const resetConsent = () => {
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
      setConsent(null)
      setShowBanner(true)
    } catch (error) {
      console.error('쿠키 동의 설정 초기화 중 오류:', error)
    }
  }

  return {
    consent,
    showBanner,
    saveConsent,
    acceptAll,
    rejectAll,
    resetConsent,
  }
} 