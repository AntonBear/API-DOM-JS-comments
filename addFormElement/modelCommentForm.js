import { showTextComment, hideTextComment } from '../utils.js'
import { renderComments } from '../renderComments.js'
import { showLoader, hideLoader } from '../utils.js'
import { fetchPostCommentsAuth, fetchCommentsAuth } from '../fetch.js'

export async function postComment(user, text) {
  try {
    showLoader()
    showTextComment()
    await fetchPostCommentsAuth(user, text)
    const comments = await fetchCommentsAuth(user)

    // добавить один комментарий к одновному списку
    // что у меня есть?      новые комменты
    // мне для добавления необходимо достать измененный комментарий 

    renderComments({ comments })
  } catch (error) {
    console.error('Ошибка добавления комментария в форму:', error)
  } finally {
    hideTextComment()
    hideLoader()
  }
}
