import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TaskTable from '../components/TaskTable'
import { getTaleplerim } from '../api/workflowApi'
import type { WorkflowTalep } from '../types/workflow'
import './PageStyles.css'

function getValue(row: WorkflowTalep, keys: Array<keyof WorkflowTalep>, fallback = '-') {
  for (const key of keys) {
    const value = row[key]
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      return String(value)
    }
  }
  return fallback
}

function getStatus(row: WorkflowTalep) {
  return getValue(row, ['surecDurum', 'durum', 'taskDurum'])
}

function getTaskStatus(row: WorkflowTalep) {
  return getValue(row, ['taskDurum', 'durum'])
}

function getRejectReason(row: WorkflowTalep) {
  return getValue(row, ['redYorum', 'redNedeni'])
}

function isRejected(status: string) {
  return status.toUpperCase().includes('RED')
}

function Taleplerim() {
  const [items, setItems] = useState<WorkflowTalep[]>([])
  const [loading, setLoading] = useState(false)

  const loadItems = async () => {
    setLoading(true)
    try {
      const data = await getTaleplerim()
      setItems(Array.isArray(data) ? (data as WorkflowTalep[]) : [])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed'
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const columns = [
    {
      key: 'surecId',
      header: 'Süreç ID',
      render: (row: WorkflowTalep) => getValue(row, ['surecId', 'id']),
    },
    {
      key: 'surecDurum',
      header: 'Süreç Durum',
      render: (row: WorkflowTalep) => getStatus(row),
    },
    {
      key: 'taskId',
      header: 'Task ID',
      render: (row: WorkflowTalep) => getValue(row, ['taskId']),
    },
    {
      key: 'taskDurum',
      header: 'Task Durum',
      render: (row: WorkflowTalep) => getTaskStatus(row),
    },
    {
      key: 'redNedeni',
      header: 'Red Nedeni',
      render: (row: WorkflowTalep) => {
        const status = getStatus(row)
        return isRejected(status) ? getRejectReason(row) : '-'
      },
    },
  ]

  return (
    <div className="page-shell">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1>Taleplerim</h1>
            <p>Gönderdiğiniz süreçleri takip edin.</p>
          </div>
          <button type="button" onClick={loadItems}>
            Yenile
          </button>
        </div>

        {loading ? <p>Yükleniyor...</p> : null}

        <TaskTable rows={items} columns={columns} emptyMessage="Henüz talebiniz yok." />
      </div>
    </div>
  )
}

export default Taleplerim
