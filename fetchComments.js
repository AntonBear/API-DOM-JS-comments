import { BASE_URL } from './const.js'

export async function fetchComments() {
  try {
    const res = await fetch(BASE_URL, { method: 'GET' })
    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`)
    }
    const responseData = await res.json()
    return responseData.comments
  } catch (error) {
    console.error(`fetchComments: ${error.message}`)
    throw error // Пробрасываем ошибку дальше, чтобы обработать её на уровне приложения
  }
}

