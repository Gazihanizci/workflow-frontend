import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { baslatWorkflow } from '../api/workflowApi'
import { getIsAkislari, type IsAkisi } from '../api/isAkislariApi'
import './PageStyles.css'

function TalepOlustur() {
  const [items, setItems] = useState<IsAkisi[]>([])
  const [selectedId, setSelectedId] = useState<number>(0)
  const [aciklama, setAciklama] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const loadIsAkislari = async () => {
    setLoading(true)
    setMessage('')
    try {
      const data = await getIsAkislari()
      const list = Array.isArray(data) ? data : []
      setItems(list)
      if (list.length > 0) {
        setSelectedId(list[0].isTuruId)
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Request failed'
      alert(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadIsAkislari()
  }, [])

  const handleSubmit = async () => {
    if (!selectedId) return
    setMessage('')

    try {
      setLoading(true)
      await baslatWorkflow(selectedId, aciklama.trim())
      setMessage('Talep başarıyla oluşturuldu.')
      setAciklama('')
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Request failed'
      alert(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <Navbar />
      <div className="page-content">
        <section className="panel panel-stacked">
          <div className="panel-header">
            <h2>Talep Oluştur</h2>
            <p>Başlatmak istediğiniz iş akışını seçin ve açıklamayı ekleyin.</p>
          </div>

          <div className="form-layout">
            <div className="form card-surface">
              <label>
                İş Akışı
                <select
                  value={selectedId}
                  onChange={(event) => setSelectedId(Number(event.target.value))}
                  disabled={loading || items.length === 0}
                >
                  {items.map((item) => (
                    <option key={item.isTuruId} value={item.isTuruId}>
                      {item.isAkisiAdi}
                    </option>
                  ))}
                </select>
              </label>
              <label className="textarea-field">
                Açıklama
                <textarea
                  value={aciklama}
                  onChange={(event) => setAciklama(event.target.value)}
                  placeholder="Örn: Satın alma için acil onay gerekiyor."
                  rows={6}
                />
                <span className="field-hint">
                  Kısa ve net bir açıklama, onay süresini hızlandırır.
                </span>
              </label>

              <div className="form-actions">
                <button type="button" onClick={handleSubmit} disabled={loading || !selectedId}>
                  {loading ? 'Gönderiliyor...' : 'Talep Oluştur'}
                </button>
                <button type="button" className="ghost-button" onClick={loadIsAkislari}>
                  Listeyi Yenile
                </button>
              </div>

              {message ? <p className="success">{message}</p> : null}
            </div>

            <aside className="info-card">
              <h3>İpucu</h3>
              <p>
                Açıklamada işin kapsamını, zaman planını ve varsa ek gereksinimleri
                yazmanız onay sürecini hızlandırır.
              </p>
              <ul className="info-list">
                <li>Öncelik ve teslim tarihi</li>
                <li>İlgili birim veya kişi</li>
                <li>Gerekirse dosya/bağlantı notu</li>
              </ul>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TalepOlustur
