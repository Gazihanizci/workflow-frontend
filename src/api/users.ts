export type CurrentUser = {
  adSoyad: string
  email: string
  rol: string
  birim: string
}

const API_URL = 'http://localhost:8080'

export async function getCurrentUser(): Promise<CurrentUser> {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new Error('Oturum bulunamadı')
  }

  const response = await fetch(`${API_URL}/api/kullanicilar/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Kullanıcı bilgisi alınamadı')
  }

  return data
}
