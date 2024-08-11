import { registration } from '../registration/registration.js'
import { viewAuthorization } from './viewAuthorization.js'
import { loginUser } from './modelAuthorization.js'

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
    loginUser(login, password)
  })

  const regSpan = document.getElementById('registration-span')
  regSpan.addEventListener('click', function () {
    const authorization = document.getElementById('authorization')
    authorization.remove()
    registration()
  })
}
