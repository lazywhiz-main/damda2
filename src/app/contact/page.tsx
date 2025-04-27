'use client'

import { Suspense } from 'react'
import ContactForm from './ContactForm'

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  )
} 