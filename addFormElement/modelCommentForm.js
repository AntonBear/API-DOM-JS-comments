import { showTextComment, hideTextComment } from '../utils/utils.js'
import { renderComments } from '../comment/viewComments.js'
import { showLoader, hideLoader } from '../utils/utils.js'
import { fetchPostCommentsAuth, fetchCommentsAuth } from '../utils/fetch.js'

export async function postComment(user, text) {
  try {
    showLoader()
    showTextComment()
    await fetchPostCommentsAuth(user, text)
    const comments = await fetchCommentsAuth(user)
    renderComments({ comments })
  } catch (error) {
    console.error('Ошибка добавления комментария в форму:', error)
  } finally {
    hideTextComment()
    hideLoader()
  }
}
