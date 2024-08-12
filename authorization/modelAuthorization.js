import { addFormElement } from '../addFormElement/addCommentForm.js'
import { fetchAuthorizationUser, fetchCommentsAuth } from '../fetch.js'
import { listWrapper } from '../ListWrapper.js'
import { updateAllCommentsArray } from '../appendComment/comment.js'
// import { checkForNewComments } from '../appendComment/comment.js'
import { fetchComments } from '../fetch.js'
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
    console.log('старые комментарии', oldComments)
    updateAllCommentsArray(comments)

    const newCommenteAfterLogin = findObjectsWithDifferentProperties(
      oldComments,
      comments
    )
    updateCommentsInDOM(newCommenteAfterLogin)
    // await checkForNewComments(comments)

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
    return '' // Или бросить исключение: throw new Error(...)
  }
}

export function getSafePassword() {
  const passwordInput = document.getElementById('input-password-authorization')
  if (passwordInput) {
    return passwordInput.value.replaceAll('<', '&lt').replaceAll('>', '&gt')
  } else {
    console.error('Элемент input-password-authorization не найден!')
    return '' // Или бросаем исключение: throw new Error(...)
  }
}

export function getSafeName() {
  const nameInput = document.getElementById('input-name-registration')
  if (nameInput) {
    return nameInput.value.replaceAll('<', '&lt').replaceAll('>', '&gt')
  } else {
    console.error('Элемент input-name -registration не найден!')
    return '' // Или бросаем исключение: throw new Error(...)
  }
}
