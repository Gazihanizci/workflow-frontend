import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './PageStyles.css'

function Dashboard() {
  return (
    <div className="page-shell">
      <Navbar />
      <div className="page-content">
        <section className="dashboard-hero">
          <div>
            <span className="pill">Merkez Panel</span>
            <h1 className="hero-title">Workflow Engine Dashboard</h1>
            <p className="hero-subtitle">
              Süreçlerinizi yönetin, gelen işleri hızla kararlandırın ve ekibinize
              görünürlük kazandırın.
            </p>
          </div>
          <div className="hero-stats">
            <div>
              <strong>24</strong>
              <span>Bekleyen görev</span>
            </div>
            <div>
              <strong>8</strong>
              <span>Bugün onay</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Red gerekçesi</span>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>Hızlı erişim</h2>
              <p>Öncelikli ekranlara tek tıkla gidin.</p>
            </div>
            <div className="card-grid">
              <Link to="/gelen" className="card-link">
                <h3>Gelen Talepler</h3>
                <p>Bekleyen görevleri görüntüleyin ve aksiyon alın.</p>
                <span className="card-cta">Görevleri yönet</span>
              </Link>
              <Link to="/taleplerim" className="card-link">
                <h3>Taleplerim</h3>
                <p>Kendi taleplerinizin durumunu ve red nedenlerini takip edin.</p>
                <span className="card-cta">Süreçleri izle</span>
              </Link>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Bugünün özeti</h2>
              <p>Performans görünümü ve süreç yoğunluğu.</p>
            </div>
            <div className="summary-grid">
              <div>
                <span>Ortalama süre</span>
                <strong>1.6 gün</strong>
              </div>
              <div>
                <span>Aktif süreç</span>
                <strong>12</strong>
              </div>
              <div>
                <span>Riskli bekleyen</span>
                <strong>2</strong>
              </div>
              <div>
                <span>Toplam talep</span>
                <strong>148</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
