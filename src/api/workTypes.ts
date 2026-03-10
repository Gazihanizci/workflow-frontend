export type WorkType = {
  isTuruId: number
  isTuruAdi: string
  kategoriId: number
  kategoriAdi: string
}

const API_URL = 'http://localhost:8080'

export async function getWorkTypesByUnit(): Promise<WorkType[]> {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new Error('Oturum bulunamadı')
  }

  const response = await fetch(`${API_URL}/api/is-turleri/benim-birimim`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'İş türleri alınamadı')
  }

  return data
}
