interface ChartCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div className={`card ${className}`}>
      <h3 className="text-base font-semibold text-text-primary mb-4">{title}</h3>
      {children}
    </div>
  )
}
