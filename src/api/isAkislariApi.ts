import { http } from './http'

export type IsAkisi = {
  isTuruId: number
  isAkisiAdi: string
}

export function getIsAkislari() {
  return http<IsAkisi[]>('/api/is-akislari')
}
