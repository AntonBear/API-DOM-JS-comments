import { fetchComments } from './fetch'
import { showLoader, hideLoader } from './utils.js'
import { renderComments } from './renderComments.js'

export const initProjectjs = async ({
  comments,
  BASE_URL,
  addFormElement,
  user,
  notion,
}) => {
  if (!JSON.stringify(user) === '{}') {
    addFormElement({ renderComments, comments, user, BASE_URL })
  } else {
    notion({ user, addFormElement, renderComments, BASE_URL, comments })
  }

  showLoader()
  try {
    const comments = await fetchComments()
    console.log(fetchComments())
    renderComments({ comments, BASE_URL, user })
  } catch (error) {
    console.error(error)
  } finally {
    hideLoader()
  }
}
