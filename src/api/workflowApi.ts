import { http } from './http'

export function getTaleplerim() {
  return http('/api/talepler/benim')
}

export function getGelenTalepler() {
  return http('/api/talepler/gelen')
}

export function baslatWorkflow(isTuruId: number, aciklama: string) {
  return http('/api/workflow/baslat', {
    method: 'POST',
    body: JSON.stringify({ isTuruId, aciklama }),
  })
}

export function onaylaTask(taskId: number) {
  return http(`/api/tasks/${taskId}/onayla`, {
    method: 'POST',
  })
}

export function reddetTask(taskId: number, yorum: string) {
  return http(`/api/tasks/${taskId}/reddet`, {
    method: 'POST',
    body: JSON.stringify({ yorum }),
  })
}
