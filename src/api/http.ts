const API_BASE = 'http://localhost:8080'

type HttpOptions = RequestInit & {
  parseJson?: boolean
}

export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
  const token = localStorage.getItem('accessToken')
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
      ...(options.headers ?? {}),
    },
  })

  const shouldParse = options.parseJson !== false
  const data = shouldParse ? await response.json().catch(() => null) : null

  if (!response.ok) {
    const message =
      typeof data === 'object' && data && 'message' in data
        ? String((data as { message?: string }).message)
        : 'Request failed'
    throw new Error(message)
  }

  return data as T
}
