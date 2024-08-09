import { BASE_URL } from './const'

export const fetchComments = async () => {
  try {
        const res = await fetch(BASE_URL, {
            method: 'GET',
        })
        return await res.json()
    } catch (error) {
        throw error
    }
}
