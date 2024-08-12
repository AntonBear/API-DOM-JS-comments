import { addFormElement } from '../addFormElement/addCommentForm.js'
import { fetchAuthorizationUser, fetchCommentsAuth } from '../utils/fetch.js'
import { listWrapper } from '../renderComments/listWrapper.js'
import { updateAllCommentsArray } from '../appendComment/comment.js'
import { fetchComments } from '../utils/fetch.js'
import { findObjectsWithDifferentProperties } from '../appendComment/modelComment.js'
import { updateCommentsInDOM } from '../appendComment/modelComment.js'

export async function loginUser(login, password) {
  try {
    const buttonAuthorizationEl = document.getElementById(
      'button-authorization'
    )
    const authorization = document.getElementById('authorization')
    const user = await fetchAuthorizationUser(login, password)
    const comments = await fetchCommentsAuth(user)
    const oldComments = await fetchComments()
    updateAllCommentsArray(comments)
    const newCommenteAfterLogin = findObjectsWithDifferentProperties(
      oldComments,
      comments
    )
    updateCommentsInDOM(newCommenteAfterLogin)
    const commentsEl = document.querySelector('.comments')
    commentsEl.remove()
    listWrapper({ comments, user })
    addFormElement({ user })
    authorization.remove()
    buttonAuthorizationEl.disabled = false
  } catch (e) {
    console.error(e)
  }
}

export function getSafeLogin() {
  const loginInput = document.getElementById('input-login-authorization')
  if (loginInput) {
    return loginInput.value.replaceAll('<', '&lt').replaceAll('>', '&gt')
  } else {
    console.error('Элемент input-login-authorization не найден!')
    return '' 
  }
}

export function getSafePassword() {
  const passwordInput = document.getElementById('input-password-authorization')
  if (passwordInput) {
    return passwordInput.value.replaceAll('<', '&lt').replaceAll('>', '&gt')
  } else {
    console.error('Элемент input-password-authorization не найден!')
    return '' 
  }
}

export function getSafeName() {
  const nameInput = document.getElementById('input-name-registration')
  if (nameInput) {
    return nameInput.value.replaceAll('<', '&lt').replaceAll('>', '&gt')
  } else {
    console.error('Элемент input-name -registration не найден!')
    return '' 
  }
}
