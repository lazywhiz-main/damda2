'use client'

export const dynamic = "force-dynamic";

import { useState } from 'react'
import Button from '@/components/Button'
import { useSearchParams, useRouter } from 'next/navigation'

const PRODUCT_LIST = [
  '엽서 세트 - 위로편',
  '엽서 세트 - 사계절',
  '가훈 캘리 주문제작',
  '포스터 캘리 주문제작',
  '디지털 캘리 주문제작',
  '단체/기업 맞춤 주문',
  '기타',
]

export default function ContactPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [file, setFile] = useState<File | null>(null)

  // 스토어에서 상품명 쿼리로 전달 시 자동 선택
  const initialProduct = searchParams.get('product') || ''

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: '주문/견적 문의',
    product: initialProduct,
    quantity: '',
    detail: '',
    agree: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const input = e.target as HTMLInputElement
      setForm(prev => ({
        ...prev,
        [name]: input.checked,
      }))
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setDone(false)
    try {
      // TODO: 실제 문의 전송 API 연동 (이메일/DB 등)
      await new Promise(res => setTimeout(res, 1200))
      setDone(true)
      setForm({
        name: '', phone: '', email: '', type: '주문/견적 문의', product: '', quantity: '', detail: '', agree: false
      })
      setFile(null)
    } catch (err) {
      setError('전송에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (done) {
    return (
      <main className="pt-20 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg p-8 shadow text-center">
          <h1 className="text-2xl font-serif mb-4">문의가 접수되었습니다</h1>
          <p className="mb-6 text-ink/70">입력하신 연락처로 1~2일 내 견적/답변을 안내드리겠습니다.<br/>카카오톡 채널 추가 시 빠른 상담이 가능합니다.</p>
          <Button variant="primary" onClick={() => router.push('/')}>홈으로</Button>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full hero-contact" />
        </div>
        <div className="relative z-10 text-center text-ink">
          <h1 className="handwriting text-4xl sm:text-6xl mb-4">
            문의하기
          </h1>
          <p className="text-lg">원하는 상품이나 서비스에 대해 자세히 알아보세요</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-lg mx-auto bg-white rounded-lg p-8 shadow">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">이름 <span className="text-red-500">*</span></label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">휴대폰 번호 <span className="text-red-500">*</span></label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    type="tel"
                    placeholder="01012345678"
                    pattern="^01[016789][0-9]{7,8}$"
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">이메일 (선택)</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">문의 유형 <span className="text-red-500">*</span></label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  >
                    <option>주문/견적 문의</option>
                    <option>배송 문의</option>
                    <option>기타 문의</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">상품명</label>
                  <select
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  >
                    <option value="">상품 선택</option>
                    {PRODUCT_LIST.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">수량/옵션</label>
                  <input
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="예: 2세트, 5개, A옵션 등"
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">상세 요청/문의 내용 <span className="text-red-500">*</span></label>
                  <textarea
                    name="detail"
                    value={form.detail}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="원하는 문구, 색상, 납기, 참고사항 등"
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">파일 첨부 (선택)</label>
                  <input
                    type="file"
                    accept="image/*,.pdf,.ai,.psd"
                    onChange={handleFile}
                    className="w-full"
                  />
                  {file && <div className="text-xs text-ink/60 mt-1">첨부: {file.name}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    name="agree"
                    type="checkbox"
                    checked={form.agree}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                  <span className="text-sm">개인정보 수집 및 이용에 동의합니다. (필수)</span>
                </div>
              </div>
              <div className="text-xs text-ink/60 bg-ivory/60 rounded p-4">
                맞춤형 상품의 경우, 문의 접수 후 개별적으로 견적을 안내드립니다.<br/>
                예상 가격대: 2만원~5만원 (옵션/문구/수량에 따라 달라질 수 있습니다)<br/>
                견적은 입력하신 연락처(또는 이메일)로 1~2일 내 안내드립니다.
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                >
                  돌아가기
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '전송 중...' : '문의하기'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
} 