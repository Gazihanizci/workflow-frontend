export type LoginResponse = {
  accessToken: string
  refreshToken: string
  message: string
  success: boolean
}

const API_URL = "http://localhost:8080"

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Giriş başarısız")
  }

  return data
}