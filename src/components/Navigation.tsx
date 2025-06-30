'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/about', label: '작가 소개' },
    { href: '/gallery', label: '작품 갤러리' },
    { href: '/today', label: '하루 한 문장' },
    { href: '/contact', label: '문의하기' },
    { href: '/shop', label: '스토어' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-ivory/99 shadow-sm' : 'bg-ivory/98'
    } backdrop-blur-md`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center hover:opacity-80 transition-opacity touch-button"
          >
            <Image
              src="/images/logo.png"
              alt="담다 로고"
              width={150}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm touch-button px-3 py-2 rounded-lg transition-all duration-200 ${
                  pathname === item.href 
                    ? 'text-primary font-bold bg-accent-1/30 shadow-sm border border-accent-1' 
                    : 'text-primary/70 hover:text-primary hover:bg-accent-1/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden touch-button text-primary/80 hover:text-primary"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-ivory rounded-lg shadow-lg mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base touch-button ${
                    pathname === item.href
                      ? 'text-primary font-bold bg-accent-1/10 border-l-4 border-accent-1'
                      : 'text-primary/70 hover:text-primary hover:bg-accent-1/5'
                  } transition-all duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 