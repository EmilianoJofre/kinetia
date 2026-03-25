import { useNavigate } from 'react-router-dom'
import { Plus, ArrowLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actionLabel?: string
  actionPath?: string
  showBack?: boolean
}

export default function PageHeader({ title, subtitle, actionLabel, actionPath, showBack }: PageHeaderProps) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-surface border border-border transition-colors text-text-primary">
            <ArrowLeft size={16} />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
          {subtitle && <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actionLabel && actionPath && (
        <button
          onClick={() => navigate(actionPath)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  )
}
