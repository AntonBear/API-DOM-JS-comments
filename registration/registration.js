import { authorization } from '../authorization/authorization.js'
import { addFormElement } from '../addFormElement/addCommentForm.js'
import { fetchRegUser, fetchCommentsAuth } from '../fetch.js'
import { listWrapper } from '../ListWrapper.js'

async function regUser(name, login, password) {
  try {
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

export const registration = () => {
  const appElement = document.querySelector('.appElement')
  const commentsEl = document.querySelector('.comments')
  const registration = document.createElement('div')
  registration.id = 'registration'

  registration.innerHTML = `<div class="add-form-registration" >
    <p class="registration-text">Форма регистрации</p>
    <div>Имя</div>
    <input
    id="input-name-registration"
    type="text"
    class="add-form-name-registration"
    placeholder="Введите имя"
    value=""
  />
  <div>Логин</div>
    <input
      id="input-login-registration"
      type="text"
      class="add-form-name-registration"
      placeholder="Введите логин"
      value=""
    />
    <div>Пароль</div>
    <input
    id="input-password-registration"
    type="password"
    class="add-form-password-registration"
    value=""
    placeholder="Введите пароль"
  />
    <div class="add-form-row_registration">
      <button id="button-registration" class="registration-button">Зарегистрироваться</button>
    </div>
    <p id='authorization-span' class="registration-text registration-text_center">Авторизироваться</p>
    
  </div>
  `
  appElement.appendChild(registration)

  const buttonRegistrationEl = document.getElementById('button-registration')

  buttonRegistrationEl.addEventListener('click', function () {
    const name = document
      .getElementById('input-name-registration')
      .value.replaceAll('<', '&lt')
      .replaceAll('>', '&gt')
    const login = document
      .getElementById('input-login-registration')
      .value.replaceAll('<', '&lt')
      .replaceAll('>', '&gt')
    const password = document
      .getElementById('input-password-registration')
      .value.replaceAll('<', '&lt')
      .replaceAll('>', '&gt')

    regUser(name, login, password)
  })

  const autoSpan = document.getElementById('authorization-span')
  autoSpan.addEventListener('click', function () {
    registration.remove()
    authorization()
  })
}
