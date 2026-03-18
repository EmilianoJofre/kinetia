import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  color?: string
}

export default function MetricCard({ title, value, icon: Icon, trend, trendUp, color = 'accent' }: MetricCardProps) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-text-primary mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-accent/10`}>
          <Icon size={22} className="text-accent" />
        </div>
      </div>
    </div>
  )
}
