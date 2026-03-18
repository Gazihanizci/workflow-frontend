export type WorkflowTalep = {
  surecId: number
  surecDurum: string
  taskId: number
  taskDurum: string
  isTuruAdi: string
  yorum?: string | null
}

export type Task = {
  id?: number
  isTuruAdi?: string
  durum?: string
  baslatanAdSoyad?: string
  birimAdi?: string
  aciklama?: string
  redNedeni?: string | null
  olusturmaTarihi?: string
  surecId?: number
  surecDurum?: string
  taskId?: number
  taskDurum?: string
  redYorum?: string | null
  yorum?: string | null
}
