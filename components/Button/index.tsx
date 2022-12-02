import React, { ReactNode, MouseEvent } from 'react'

interface ButtonProps {
  testId?: string
  className?: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  disabled?: boolean
}

export function Button({
  testId,
  className = '',
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  const buttonStyle = `px-4 py-1 mx-2 rounded text-blue-500 bg-slate-200 hover:bg-slate-800 hover:text-white text-sm`
  return (
    <button
      data-testid={testId}
      className={`${buttonStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
