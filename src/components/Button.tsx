import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  style,
  ...props
}: ButtonProps) {
  const base =
    'w-full py-4 font-bold rounded-lg border transition-colors duration-200';
  const primary =
    'bg-ink text-ivory border-ink hover:bg-ink/90';
  const secondary =
    'text-ink border-ink hover:bg-ink/10';
  return (
    <button
      className={
        `${base} ${variant === 'primary' ? primary : secondary}`
      }
      style={
        variant === 'secondary'
          ? { backgroundColor: 'rgba(44,44,44,0.05)', ...style }
          : style
      }
      {...props}
    >
      {children}
    </button>
  );
} 