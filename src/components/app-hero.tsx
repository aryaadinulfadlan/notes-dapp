import React from 'react'

export function AppHero({
  children,
  subtitle,
  title,
}: {
  children?: React.ReactNode
  subtitle?: React.ReactNode
  title?: React.ReactNode
}) {
  return (
    <div className="flex flex-row justify-center py-[16px] md:py-[24px]">
      <div className="text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-2xl md:text-3xl font-bold">{title}</h1> : title}
          {typeof subtitle === 'string' ? <p className="text-sm md:text-base pt-4 md:py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
    </div>
  )
}
