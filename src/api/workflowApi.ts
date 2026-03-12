import { http } from './http'

const WORKFLOW_BASE = '/api/workflow'

export function getTaleplerim() {
  return http(`${WORKFLOW_BASE}/taleplerim`)
}

export function getGelenTalepler() {
  return http(`${WORKFLOW_BASE}/gelen`)
}

export function baslatWorkflow(isTuruId: number) {
  const params = new URLSearchParams({ isTuruId: String(isTuruId) })
  return http(`${WORKFLOW_BASE}/baslat?${params.toString()}`, {
    method: 'POST',
  })
}

export function onaylaTask(taskId: number) {
  const params = new URLSearchParams({ taskId: String(taskId) })
  return http(`${WORKFLOW_BASE}/onayla?${params.toString()}`, {
    method: 'POST',
  })
}

export function reddetTask(taskId: number, yorum: string) {
  const params = new URLSearchParams({
    taskId: String(taskId),
    yorum,
  })
  return http(`${WORKFLOW_BASE}/reddet?${params.toString()}`, {
    method: 'POST',
  })
}
