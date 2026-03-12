export type WorkflowTalep = {
  id?: number
  isTuruAdi?: string
  durum?: string
  redNedeni?: string | null
  olusturmaTarihi?: string
  surecId?: number
  surecDurum?: string
  taskId?: number
  taskDurum?: string
  redYorum?: string | null
}

export type Task = {
  id?: number
  isTuruAdi?: string
  durum?: string
  redNedeni?: string | null
  olusturmaTarihi?: string
  surecId?: number
  surecDurum?: string
  taskId?: number
  taskDurum?: string
  redYorum?: string | null
}
