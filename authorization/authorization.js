import { registration } from '../registration/registration.js'
import { addFormElement } from '../addFormElement/addCommentForm.js'
import { fetchAuthorizationUser, fetchCommentsAuth } from '../fetch.js'
import { listWrapper } from '../ListWrapper.js'
import { viewAuthorization } from './viewAuthorization.js'

export const authorization = () => {
  viewAuthorization()

  const buttonAuthorizationEl = document.getElementById('button-authorization')
  buttonAuthorizationEl.addEventListener('click', function () {
    const login = document
      .getElementById('input-login-authorization')
      .value.replaceAll('<', '&lt')
      .replaceAll('>', '&gt')
    const password = document
      .getElementById('input-password-authorization')
      .value.replaceAll('<', '&lt')
      .replaceAll('>', '&gt')

    async function loginUser(login, password) {
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
    }
    loginUser(login, password)
  })

  const regSpan = document.getElementById('registration-span')
  regSpan.addEventListener('click', function () {
    const authorization = document.getElementById('authorization')
    authorization.remove()

    registration()
  })
}
