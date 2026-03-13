import { http } from './http'

export type CurrentUser = {
  id: number
  adSoyad: string
  email: string
  rol: string
  birim: string
}

export function getCurrentUser() {
  return http<CurrentUser>('/api/kullanicilar/me')
}
