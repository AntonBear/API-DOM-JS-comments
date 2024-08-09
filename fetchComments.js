import { showLoader, hideLoader } from './utils.js'
import { renderComments } from './renderComments.js'

export const fetchComments = ({
  comments,
  BASE_URL,
  addFormElement,
  user,
  notion,
}) => {
  showLoader()
  fetch(BASE_URL, {
    method: 'GET',
  }).then((res) => {
    res
      .json()
      .then((responseData) => {
        comments = responseData.comments
        renderComments({ comments, BASE_URL, user })
      })
      .catch((error) => {
        console.log(`fetchComments: ${error.message}`)
      })
      .finally(() => {
        hideLoader()
        if (!JSON.stringify(user) === '{}') {
          addFormElement({ renderComments, comments, user, BASE_URL })
        } else {
          notion({ user, addFormElement, renderComments, BASE_URL, comments })
        }
      })
  })
}
