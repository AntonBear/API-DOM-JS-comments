import { addFormElement } from '../addFormElement/addCommentForm.js'
import { fetchAuthorizationUser, fetchCommentsAuth } from '../fetch.js'
import { listWrapper } from '../ListWrapper.js'

export async function loginUser(login, password) {
  try {
    const authorization = document.getElementById('authorization')
    const user = await fetchAuthorizationUser(login, password)
    const comments = await fetchCommentsAuth(user)
    const commentsEl = document.querySelector('.comments')
    commentsEl.remove()
    listWrapper({ comments, user })
    addFormElement({ user })
    authorization.remove()
    if (user) {
      console.log('Авторизация прошла успешно:', user)
    } else {
      console.log('Не удалось авторизоваться')
    }
    buttonAuthorizationEl.disabled = false
  } catch (e) {}
}
