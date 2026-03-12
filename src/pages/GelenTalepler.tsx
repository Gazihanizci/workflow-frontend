import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import TaskTable from '../components/TaskTable'
import { getGelenTalepler, onaylaTask, reddetTask } from '../api/workflowApi'
import type { Task } from '../types/workflow'
import './PageStyles.css'

function getValue(row: Task, keys: Array<keyof Task>, fallback = '-') {
  for (const key of keys) {
    const value = row[key]
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      return String(value)
    }
  }
  return fallback
}

function getStatus(row: Task) {
  return getValue(row, ['taskDurum', 'durum', 'surecDurum'])
}

function getTaskId(row: Task) {
  const raw = getValue(row, ['taskId', 'id'])
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : null
}

function GelenTalepler() {
  const [items, setItems] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)

  const loadItems = async () => {
    setLoading(true)
    try {
      const data = await getGelenTalepler()
      setItems(Array.isArray(data) ? (data as Task[]) : [])
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

  const handleApprove = async (taskId: number | null) => {
    if (!taskId) return
    try {
      await onaylaTask(taskId)
      await loadItems()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed'
      alert(message)
    }
  }

  const handleReject = async (taskId: number | null) => {
    if (!taskId) return
    const yorum = window.prompt('Red nedeni girin')
    if (!yorum) return

    try {
      await reddetTask(taskId, yorum)
      await loadItems()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed'
      alert(message)
    }
  }

  const columns = useMemo(
    () => [
      {
        key: 'taskId',
        header: 'Task ID',
        render: (row: Task) => getValue(row, ['taskId', 'id']),
      },
      {
        key: 'isTuruAdi',
        header: 'Talep',
        render: (row: Task) => getValue(row, ['isTuruAdi', 'surecId']),
      },
      {
        key: 'durum',
        header: 'Durum',
        render: (row: Task) => getStatus(row),
      },
      {
        key: 'actions',
        header: 'Actions',
        render: (row: Task) => {
          const taskId = getTaskId(row)
          return (
            <div className="inline-actions">
              <button type="button" onClick={() => handleApprove(taskId)}>
                ONAYLA
              </button>
              <button type="button" className="danger" onClick={() => handleReject(taskId)}>
                REDDET
              </button>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <div className="page-shell">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1>Gelen Talepler</h1>
            <p>Size atanan görevleri yönetin.</p>
          </div>
          <button type="button" onClick={loadItems}>
            Yenile
          </button>
        </div>

        {loading ? <p>Yükleniyor...</p> : null}

        <TaskTable rows={items} columns={columns} emptyMessage="Gelen görev bulunamadı." />
      </div>
    </div>
  )
}

export default GelenTalepler
