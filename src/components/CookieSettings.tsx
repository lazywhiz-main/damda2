'use client'

import { useState } from 'react'
import { useCookieConsent, type CookieConsent } from '@/hooks/useCookieConsent'

export default function CookieSettings() {
  const { consent, saveConsent, resetConsent } = useCookieConsent()
  const [localConsent, setLocalConsent] = useState<CookieConsent>(
    consent || {
      analytics: false,
      marketing: false,
      functional: true,
    }
  )

  const handleToggle = (type: keyof CookieConsent) => {
    if (type === 'functional') return // 필수 쿠키는 변경 불가
    
    setLocalConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const handleSave = () => {
    saveConsent(localConsent)
    alert('쿠키 설정이 저장되었습니다.')
  }

  const handleReset = () => {
    if (confirm('쿠키 설정을 초기화하시겠습니까? 페이지가 새로고침됩니다.')) {
      resetConsent()
      window.location.reload()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-ivory border border-ink/10 rounded-lg">
      <h2 className="text-2xl font-bold text-ink mb-6">쿠키 설정</h2>
      
      <div className="space-y-6">
        {/* 필수 쿠키 */}
        <div className="p-4 bg-ink/5 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium text-ink">필수 쿠키</h3>
              <p className="text-sm text-ink/60">항상 활성화됨</p>
            </div>
            <div className="w-12 h-6 bg-ink rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-ivory rounded-full"></div>
            </div>
          </div>
          <p className="text-sm text-ink/70">
            웹사이트 기본 기능 작동에 필요한 쿠키입니다. 
            네비게이션, 로그인 상태 유지 등 필수 기능을 위해 사용됩니다.
          </p>
        </div>

        {/* 분석 쿠키 */}
        <div className="p-4 border border-ink/10 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium text-ink">분석 쿠키</h3>
              <p className="text-sm text-ink/60">선택사항</p>
            </div>
            <button
              onClick={() => handleToggle('analytics')}
              className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                localConsent.analytics 
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
            개인을 식별할 수 있는 정보는 수집하지 않습니다.
          </p>
        </div>

        {/* 마케팅 쿠키 */}
        <div className="p-4 border border-ink/10 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium text-ink">마케팅 쿠키</h3>
              <p className="text-sm text-ink/60">선택사항</p>
            </div>
            <button
              onClick={() => handleToggle('marketing')}
              className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                localConsent.marketing 
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

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-ink text-ivory rounded-lg hover:bg-ink/90 transition-colors font-medium"
        >
          설정 저장
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 border border-ink/30 rounded-lg hover:bg-ink/5 transition-colors"
        >
          설정 초기화
        </button>
      </div>

      <div className="mt-6 p-4 bg-accent-1/10 rounded-lg">
        <h4 className="font-medium text-ink mb-2">현재 설정 상태</h4>
        <div className="text-sm text-ink/70 space-y-1">
          <div>• 필수 쿠키: <span className="font-medium text-green-600">활성화</span></div>
          <div>• 분석 쿠키: <span className={`font-medium ${localConsent.analytics ? 'text-green-600' : 'text-red-500'}`}>
            {localConsent.analytics ? '활성화' : '비활성화'}
          </span></div>
          <div>• 마케팅 쿠키: <span className={`font-medium ${localConsent.marketing ? 'text-green-600' : 'text-red-500'}`}>
            {localConsent.marketing ? '활성화' : '비활성화'}
          </span></div>
        </div>
      </div>

      <div className="mt-6 text-xs text-ink/50">
        <p>
          쿠키 설정은 언제든지 변경할 수 있습니다. 
          변경 사항은 즉시 적용되며, 일부 변경사항은 페이지 새로고침 후 적용됩니다.
        </p>
      </div>
    </div>
  )
} 