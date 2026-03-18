interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
}

export default function DataTable<T extends { id: number }>({ columns, data, onRowClick }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-background border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`${onRowClick ? 'cursor-pointer hover:bg-background' : ''} transition-colors`}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-text-primary">
                    {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
