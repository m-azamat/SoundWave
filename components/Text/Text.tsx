import React from 'react'

interface TextProps {
  children: React.ReactNode,
  className?:string
}

export default function Text({children, className}:TextProps) {
  return ( 
    <p className={`lg:text-2xl ${className ?? ''}`}>
      {children}
    </p>
  )
}
