import type { ReactNode } from 'react'
import './TaskTable.css'

type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
}

type TaskTableProps<T> = {
  rows: T[]
  columns: Column<T>[]
  emptyMessage?: string
}

function TaskTable<T>({ rows, columns, emptyMessage }: TaskTableProps<T>) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty">
                {emptyMessage ?? 'Kayıt bulunamadı.'}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render(row)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TaskTable
