'use client'

import { useState } from 'react'
import { useCookieConsent, type CookieConsent } from '@/hooks/useCookieConsent'

export default function CookieConsentBanner() {
  const { showBanner, consent, saveConsent, acceptAll, rejectAll } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [customConsent, setCustomConsent] = useState<CookieConsent>({
    analytics: false,
    marketing: false,
    functional: true, // 필수 쿠키는 항상 활성화
  })

  if (!showBanner) return null

  const handleCustomSave = () => {
    saveConsent(customConsent)
  }

  const toggleCustomConsent = (type: keyof CookieConsent) => {
    if (type === 'functional') return // 필수 쿠키는 변경 불가
    
    setCustomConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <>
      {/* 오버레이 */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      
      {/* 배너 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-ivory border-t border-ink/10 shadow-lg">
        <div className="container mx-auto p-4 max-w-4xl">
          {!showDetails ? (
            // 기본 배너
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-ink mb-2">🍪 쿠키 사용 동의</h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  저희 웹사이트는 사용자 경험 개선을 위해 쿠키를 사용합니다. 
                  웹사이트 분석, 개인화된 콘텐츠 제공을 위해 Google Analytics 등의 서비스를 이용하고 있습니다.
                  계속 이용하시면 쿠키 사용에 동의하시는 것으로 간주됩니다.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2 text-sm border border-ink/30 rounded-lg hover:bg-ink/5 transition-colors"
                >
                  설정하기
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-sm border border-ink/30 rounded-lg hover:bg-ink/5 transition-colors"
                >
                  최소한만 허용
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 text-sm bg-ink text-ivory rounded-lg hover:bg-ink/90 transition-colors font-medium"
                >
                  모두 허용
                </button>
              </div>
            </div>
          ) : (
            // 상세 설정
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-ink">쿠키 설정</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-ink/60 hover:text-ink"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {/* 필수 쿠키 */}
                <div className="p-4 bg-ink/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-ink">필수 쿠키</h4>
                    <div className="w-10 h-6 bg-ink rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-ivory rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm text-ink/70">
                    웹사이트 기본 기능 작동에 필요한 쿠키입니다. 이 쿠키는 비활성화할 수 없습니다.
                  </p>
                </div>

                {/* 분석 쿠키 */}
                <div className="p-4 border border-ink/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-ink">분석 쿠키</h4>
                    <button
                      onClick={() => toggleCustomConsent('analytics')}
                      className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                        customConsent.analytics 
                          ? 'bg-ink justify-end' 
                          : 'bg-ink/20 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-ivory rounded-full mx-1"></div>
                    </button>
                  </div>
                  <p className="text-sm text-ink/70">
                    Google Analytics를 통해 웹사이트 이용 통계를 수집합니다. 
                    방문자 수, 인기 페이지, 사용자 행동 패턴 등을 분석하여 서비스를 개선합니다.
                  </p>
                </div>

                {/* 마케팅 쿠키 */}
                <div className="p-4 border border-ink/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-ink">마케팅 쿠키</h4>
                    <button
                      onClick={() => toggleCustomConsent('marketing')}
                      className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                        customConsent.marketing 
                          ? 'bg-ink justify-end' 
                          : 'bg-ink/20 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-ivory rounded-full mx-1"></div>
                    </button>
                  </div>
                  <p className="text-sm text-ink/70">
                    개인화된 광고 및 콘텐츠 제공을 위한 쿠키입니다. 
                    현재는 사용하지 않지만 향후 서비스 확장 시 활용될 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-ink/10">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 text-sm border border-ink/30 rounded-lg hover:bg-ink/5 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-sm border border-ink/30 rounded-lg hover:bg-ink/5 transition-colors"
                >
                  최소한만 허용
                </button>
                <button
                  onClick={handleCustomSave}
                  className="px-6 py-2 text-sm bg-ink text-ivory rounded-lg hover:bg-ink/90 transition-colors font-medium flex-1 sm:flex-none"
                >
                  설정 저장
                </button>
              </div>

              <div className="text-xs text-ink/50 pt-2">
                <p>
                  쿠키 정책에 대한 자세한 내용은{' '}
                  <a href="/privacy" className="underline hover:text-ink/70">
                    개인정보처리방침
                  </a>을 참조하세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 