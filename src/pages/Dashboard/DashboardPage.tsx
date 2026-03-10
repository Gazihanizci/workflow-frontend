import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../api/users'
import { getWorkTypesByUnit } from '../../api/workTypes'
import MessageBox from '../../components/MessageBox'
import './DashboardPage.css'

type RequestItem = {
  id: string
  title: string
  requester: string
  department: string
  createdAt: string
  status: string
  priority: string
}

type WorkType = {
  isTuruId: number
  isTuruAdi: string
  kategoriId: number
  kategoriAdi: string
}

const requests: RequestItem[] = []

const statusClassMap: Record<string, string> = {
  Bekliyor: 'status waiting',
  İncelemede: 'status review',
  Onaylandı: 'status approved',
  Reddedildi: 'status rejected',
}

function DashboardPage() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Merhaba')
  const [userMeta, setUserMeta] = useState('Yükleniyor...')
  const [userError, setUserError] = useState('')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [workTypes, setWorkTypes] = useState<WorkType[]>([])
  const [workTypeError, setWorkTypeError] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/', { replace: true })
  }

  useEffect(() => {
    let isMounted = true

    async function loadUser() {
      try {
        const profile = await getCurrentUser()
        if (!isMounted) return
        setUserName(`Merhaba, ${profile.adSoyad}`)
        setUserMeta(`${profile.birim} • ${profile.rol}`)
      } catch (error) {
        if (!isMounted) return
        const message =
          error instanceof Error
            ? error.message
            : 'Kullanıcı bilgisi alınamadı'
        setUserError(message)
        setUserMeta('Kullanıcı bilgisi alınamadı')
      }
    }

    loadUser()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadWorkTypes() {
      try {
        const data = await getWorkTypesByUnit()
        if (!isMounted) return
        setWorkTypes(data)
      } catch (error) {
        if (!isMounted) return
        const message =
          error instanceof Error
            ? error.message
            : 'İş türleri alınamadı'
        setWorkTypeError(message)
      }
    }

    loadWorkTypes()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-kicker">Şirket Talep Merkezi</p>
          <h1>{userName}</h1>
          <p className="dashboard-subtitle">{userMeta}</p>
          {userError ? (
            <MessageBox
              title="Bilgi alınamadı"
              message={userError}
              variant="warning"
              onClose={() => setUserError('')}
            />
          ) : null}
        </div>
        <div className="dashboard-actions">
          <button className="ghost-button" type="button">
            Raporu indir
          </button>
          <button className="primary-button" type="button">
            Yeni talep oluştur
          </button>
          <button
            className="ghost-button logout"
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
          >
            Çıkış yap
          </button>
        </div>
      </header>

      <section className="dashboard-metrics">
        <div className="metric-card">
          <p>Bekleyen talepler</p>
          <h3>28</h3>
          <span>+6 bu hafta</span>
        </div>
        <div className="metric-card">
          <p>İncelemede</p>
          <h3>12</h3>
          <span>Ortalama 1.8 gün</span>
        </div>
        <div className="metric-card">
          <p>Onaylanan</p>
          <h3>74</h3>
          <span>Şubat raporu</span>
        </div>
        <div className="metric-card">
          <p>Reddedilen</p>
          <h3>5</h3>
          <span>Son 30 gün</span>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="request-list">
          <div className="request-list-header">
            <div>
              <h2>Çalışan talepleri</h2>
              <p>Güncel talepler burada listelenecek.</p>
            </div>
            <div className="request-filters">
              <button className="filter-chip active" type="button">
                Tümü
              </button>
              <button className="filter-chip" type="button">
                Bekleyen
              </button>
              <button className="filter-chip" type="button">
                İncelemede
              </button>
              <button className="filter-chip" type="button">
                Onaylanan
              </button>
            </div>
          </div>

          <div className="request-grid">
            {requests.length === 0 ? (
              <MessageBox
                title="Henüz talep yok"
                message="Çalışan talepleri API üzerinden yüklendiğinde burada görünecek."
                variant="info"
              />
            ) : (
              requests.map((request) => (
                <article className="request-card" key={request.id}>
                  <div className="request-card-top">
                    <div>
                      <p className="request-id">{request.id}</p>
                      <h3>{request.title}</h3>
                    </div>
                    <span className={statusClassMap[request.status]}>
                      {request.status}
                    </span>
                  </div>
                  <div className="request-meta">
                    <div>
                      <span>Talep eden</span>
                      <strong>{request.requester}</strong>
                    </div>
                    <div>
                      <span>Departman</span>
                      <strong>{request.department}</strong>
                    </div>
                    <div>
                      <span>Öncelik</span>
                      <strong>{request.priority}</strong>
                    </div>
                    <div>
                      <span>Tarih</span>
                      <strong>{request.createdAt}</strong>
                    </div>
                  </div>
                  <div className="request-actions">
                    <button className="ghost-button" type="button">
                      Detay
                    </button>
                    <button className="primary-button" type="button">
                      İşleme al
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="dashboard-side">
          <div className="side-card">
            <h3>Yetkili iş türleri</h3>
            {workTypeError ? (
              <MessageBox
                title="İş türleri alınamadı"
                message={workTypeError}
                variant="warning"
              />
            ) : workTypes.length === 0 ? (
              <p className="muted">İş türleri yükleniyor...</p>
            ) : (
              <div className="worktype-list">
                {workTypes.map((workType) => (
                  <div className="worktype-chip" key={workType.isTuruId}>
                    <span>{workType.kategoriAdi}</span>
                    <strong>{workType.isTuruAdi}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="side-card">
            <h3>Bugünkü özet</h3>
            <p>
              Satış ve Operasyon ekiplerinden yüksek öncelikli 3 yeni talep
              geldi. Finans ekibi iki masraf formunu onayladı.
            </p>
            <div className="side-list">
              <div>
                <span>En yoğun ekip</span>
                <strong>Satış</strong>
              </div>
              <div>
                <span>Ortalama çözüm süresi</span>
                <strong>2.4 gün</strong>
              </div>
              <div>
                <span>Bekleyen onay</span>
                <strong>6 kişi</strong>
              </div>
            </div>
          </div>

          <div className="side-card highlight">
            <h3>Öncelikli aksiyon</h3>
            <p>
              “Yeni dizüstü talebi” için Satın Alma’dan teklif bekleniyor.
            </p>
            <button className="primary-button" type="button">
              Teklifleri gör
            </button>
          </div>
        </aside>
      </section>

      {showLogoutConfirm ? (
        <MessageBox
          title="Çıkış onayı"
          message="Oturumu kapatmak istediğinizden emin misiniz?"
          variant="warning"
          layout="modal"
          primaryAction={{
            label: 'Çıkış yap',
            onClick: handleLogout,
            variant: 'primary',
          }}
          secondaryAction={{
            label: 'Vazgeç',
            onClick: () => setShowLogoutConfirm(false),
            variant: 'ghost',
          }}
        />
      ) : null}
    </div>
  )
}

export default DashboardPage
