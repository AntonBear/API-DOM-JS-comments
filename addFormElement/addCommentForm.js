import { renderComments } from '../renderComments.js'
import { showLoader, hideLoader } from '../utils.js'
import { fetchPostCommentsAuth, fetchCommentsAuth } from '../fetch.js'
import { viewInitAddCommentForm } from './viewАddCommentForm.js'
import { showTextComment, hideTextComment } from '../utils.js'

export const addFormElement = ({ user }) => {
  viewInitAddCommentForm(user)

  const addComButton = document.getElementById('button')
  addComButton.addEventListener('click', function () {
    const text = document
      .getElementById('textarea')
      .value.replaceAll('<', '&lt')
      .replaceAll('>', '&gt')

    async function postComment(user, text) {
      try {
        showLoader()
        showTextComment()
        const postResponse = await fetchPostCommentsAuth(user, text)
        const comments = await fetchCommentsAuth(user)
        renderComments({ comments })
      } catch (error) {
        console.error('Ошибка добавления комментария в форму:', error)
      } finally {
        hideTextComment()
        hideLoader()
      }
    }

    postComment(user, text)
  })
}
