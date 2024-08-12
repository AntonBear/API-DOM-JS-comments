import { registration } from '../registration/registration.js'
import { viewAuthorization } from './viewAuthorization.js'
import {
  loginUser,
  getSafePassword,
  getSafeLogin,
} from './modelAuthorization.js'

export const authorization = () => {
  viewAuthorization()

  const buttonAuthorizationEl = document.getElementById('button-authorization')
  buttonAuthorizationEl.addEventListener('click', function () {
    const login = getSafeLogin()
    const password = getSafePassword()
    loginUser(login, password)
    
  })


  const signupSpan = document.getElementById('registration-span')
  signupSpan.addEventListener('click', function () {
    const authorization = document.getElementById('authorization')
    authorization.remove()
    registration()
  })
}
