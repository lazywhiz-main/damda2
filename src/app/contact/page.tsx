'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    purpose: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 폼 제출 처리
    console.log(formData)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-ink/90" />
        <div className="relative z-10 text-center text-ivory">
          <h1 className="handwriting text-4xl sm:text-6xl mb-8">
            문의하기
          </h1>
          <p className="text-lg">작가와 함께 특별한 순간을 만들어보세요</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="prose prose-lg mb-12">
              <h2 className="text-3xl font-serif mb-6">작가의 말</h2>
              <p className="mb-4">
                특별한 순간을 위한 맞춤 글씨 작업을 진행하고 있습니다.
                결혼식, 기념일, 선물 등 다양한 목적으로 문의해주세요.
              </p>
              <p>
                최대한 빠른 시일 내에 답변 드리도록 하겠습니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-ink/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ink/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-ink/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ink/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium mb-2">
                  사용 목적
                </label>
                <select
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-2 border border-ink/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ink/20"
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="wedding">결혼식</option>
                  <option value="anniversary">기념일</option>
                  <option value="gift">선물</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  요청 문구
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-ink/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ink/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-ink text-ivory py-3 rounded-md hover:bg-ink/90 transition-colors"
              >
                문의하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
} 