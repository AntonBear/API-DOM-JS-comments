import { fetchComments } from './fetchComments.js'
import { addFormElement } from './addFormElement.js'
import { user } from './user.js'
import { showAuthorizationNotice } from './notion.js'
import { renderComments } from './renderComments.js'

export async function fetchAndRenderData() {
  try {
    const comments = await fetchComments()
    renderComments({ user, comments })
  } catch (error) {
    console.error('Ошибка при инициализации:', error)
  } finally {
    if (Object.keys(user).length !== 0) {
      addFormElement({ user, comments })
    } else {
      showAuthorizationNotice({ user, comments })
    }
  }
}
