const AUTH_URL = 'http://localhost:8080/api/auth/login'

export type LoginResponse = {
  success: boolean
  message: string
  accessToken: string
  refreshToken: string
}

export async function login(email: string, password: string) {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = (await response.json()) as LoginResponse

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Giriş başarısız')
  }

  saveAccessToken(data.accessToken)
  saveRefreshToken(data.refreshToken)

  return data
}

export function saveAccessToken(token: string) {
  localStorage.setItem('accessToken', token)
}

export function saveRefreshToken(token: string) {
  localStorage.setItem('refreshToken', token)
}

export function getToken() {
  return localStorage.getItem('accessToken')
}

export function clearToken() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
