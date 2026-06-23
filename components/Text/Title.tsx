
interface TitleProps {
  children: React.ReactNode,
  className?: string
}

export default function Title({children, className}:TitleProps) {
  return (
  <h2 className={`lg:text-4xl ${className ?? ''}`}>
    {children}
  </h2>
  )
}
