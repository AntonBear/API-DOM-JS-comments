import { authorization } from '../authorization/authorization.js'
import { viewRegistration } from './viewRegistration.js'
import { getSafeName, getSafeLogin, getSafePassword, regUser } from './modelRegistration.js'

export const registration = () => {
  viewRegistration()

  const buttonRegistrationEl = document.getElementById('button-registration')
  buttonRegistrationEl.addEventListener('click', function () {
    const name = getSafeName()
    const login = getSafeLogin()
    const password = getSafePassword()
    regUser(name, login, password)
  })

  const InitAuthorizationSpan = document.getElementById('authorization-span')
  InitAuthorizationSpan.addEventListener('click', function () {
    registration.remove()
    authorization()
  })
}
