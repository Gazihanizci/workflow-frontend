import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TaskTable from '../components/TaskTable'
import { getTaleplerim } from '../api/workflowApi'
import type { WorkflowTalep } from '../types/workflow'
import './PageStyles.css'

function isRejected(status: string) {
  return status.toUpperCase().includes('RED')
}

function Taleplerim() {
  const [items, setItems] = useState<WorkflowTalep[]>([])
  const [loading, setLoading] = useState(false)

  const totalCount = items.length
  const rejectedCount = items.filter((item) =>
    isRejected(item.taskDurum) || isRejected(item.surecDurum)
  ).length
  const pendingCount = items.filter((item) =>
    `${item.taskDurum} ${item.surecDurum}`.toUpperCase().includes('BEK')
  ).length

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
      render: (row: WorkflowTalep) => row.surecId,
    },
    {
      key: 'isTuruAdi',
      header: 'İş Türü',
      render: (row: WorkflowTalep) => row.isTuruAdi,
    },
    {
      key: 'surecDurum',
      header: 'Süreç Durum',
      render: (row: WorkflowTalep) => row.surecDurum,
    },
    {
      key: 'taskDurum',
      header: 'Task Durum',
      render: (row: WorkflowTalep) => row.taskDurum,
    },
    {
      key: 'yorum',
      header: 'Red Nedeni',
      render: (row: WorkflowTalep) =>
        isRejected(row.taskDurum) || isRejected(row.surecDurum) ? row.yorum ?? '-' : '-',
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

        <div className="summary-cards">
          <div className="summary-card">
            <span>Toplam Talep</span>
            <strong>{totalCount}</strong>
          </div>
          <div className="summary-card">
            <span>Bekleyen</span>
            <strong>{pendingCount}</strong>
          </div>
          <div className="summary-card">
            <span>Reddedilen</span>
            <strong>{rejectedCount}</strong>
          </div>
        </div>

        {loading ? <p>Yükleniyor...</p> : null}

        <TaskTable rows={items} columns={columns} emptyMessage="Henüz talebiniz yok." />
      </div>
    </div>
  )
}

export default Taleplerim
