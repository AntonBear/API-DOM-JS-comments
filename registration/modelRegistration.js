import { addFormElement } from '../addFormElement/addCommentForm.js'
import { fetchRegUser, fetchCommentsAuth } from '../fetch.js'
import { listWrapper } from '../ListWrapper.js'

export async function regUser(name, login, password) {
  try {
    const commentsEl = document.querySelector('.comments')
    const user = await fetchRegUser(name, login, password)
    const comments = await fetchCommentsAuth(user)
    commentsEl.remove()
    listWrapper({ comments, user })
    addFormElement({ user })
    registration.remove()
  } catch (error) {
    console.error(error)
  }
}

export function getSafeLogin() {
  const loginInput = document.getElementById('input-login-registration')
  if (loginInput) {
    return loginInput.value.replaceAll('<', '&lt').replaceAll('>', '&gt')
  } else {
    console.error('Элемент input-login-registration не найден!')
    return '' // Или бросить исключение: throw new Error(...)
  }
}

export function getSafePassword() {
  const passwordInput = document.getElementById('input-password-registration')
  if (passwordInput) {
    return passwordInput.value.replaceAll('<', '&lt').replaceAll('>', '&gt')
  } else {
    console.error('Элемент input-password-registration не найден!')
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
