import { registration } from './registration.js'
import { addFormElement } from './addFormElement/addCommentForm.js'
import { fetchAuthorizationUser, fetchCommentsAuth } from './fetch.js'
import { listWrapper } from './ListWrapper.js'

export const authorization = () => {
  const appElement = document.querySelector('.appElement')
  const commentsEl = document.querySelector('.comments')
  const authorization = document.createElement('div')
  authorization.id = 'authorization'

  authorization.innerHTML = `<div class="add-form-authorization" >
  <p class="authorization-text">Форма входа</p>
  <input
    id="input-login-authorization"
    type="text"
    class="add-form-name-authorization"
    placeholder="Введите логин"
    value='<script>alert()</script>'
  />
  <input
  id="input-password-authorization"
  type="password"
  class="add-form-password-authorization"
  placeholder="Введите пароль"
  value='123'
/>
  <div class="add-form-row_authorization">
    <button id="button-authorization" class="authorization-button">Войти</button>
  </div>
  <p id='registration-span' class="authorization-text authorization-text_center">Зарегистрироваться</p>
</div>
`

  appElement.appendChild(authorization)

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
      const user = await fetchAuthorizationUser(login, password)
      const comments = await fetchCommentsAuth(user)
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
    authorization.remove()
    registration()
  })
}
