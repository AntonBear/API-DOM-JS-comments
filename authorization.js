import { registration } from './registration.js'
import { LOGIN_URL, BASE_URL } from './const.js'
import { addFormElement } from './addFormElement.js'
import { renderComments } from './renderComments.js'

export const authorization = ({ user, comments }) => {
  const appElement = document.querySelector('.appElement')
  const authorization = document.createElement('div')
  authorization.id = 'authorization'

  authorization.innerHTML = `<div class="add-form-authorization" >
  <p class="authorization-text">Форма входа</p>
  <input
    id="input-login-authorization"
    type="text"
    class="add-form-name-authorization"
    placeholder="Введите логин"
  />
  <input
  id="input-password-authorization"
  type="password"
  class="add-form-password-authorization"
  placeholder="Введите пароль"
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
    const loginInput = document.getElementById('input-login-authorization')
    const passwordInput = document.getElementById(
      'input-password-authorization'
    )
    const login = loginInput.value.replaceAll('<', '&lt').replaceAll('>', '&gt')
    const password = passwordInput.value
      .replaceAll('<', '&lt')
      .replaceAll('>', '&gt')
    if (!login) {
      alert('Пожалуйста, введите логин')
      loginInput.focus()
      return
    }

    const handleLogin = async (login, password) => {
      try {
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          body: JSON.stringify({ login, password }),
        })

        if (!response.ok) {
          if (response.status === 400) {
            throw new Error('Неверный логин или пароль')
          } else {
            throw new Error(`Ошибка сервера: ${response.status}`)
          }
        }

        const data = await response.json()
        user = data.user

        // Второй запрос (получение комментариев)
        const commentsResponse = await fetch(BASE_URL, {
          method: 'GET',
          headers: {
            // Используем обратные кавычки:
            Authorization: `Bearer ${user.token}`,
          },
        })

        if (!commentsResponse.ok) {
          throw new Error(
            `Ошибка получения комментариев: ${commentsResponse.status}`
          )
        }

        const commentsData = await commentsResponse.json()
        comments = commentsData.comments

        renderComments({ comments, user })
        addFormElement({ comments, user })
        authorization.remove()
      } catch (error) {
        if (error.message === 'Неверный логин или пароль') {
          alert('Неверный логин или пароль')
        } else {
          console.error('Произошла ошибка при авторизации:', error)
        }
      }
    }
    handleLogin(login, password)

    // fetch(LOGIN_URL, {
    //   method: 'POST',
    //   body: JSON.stringify({ login: login, password: password }),
    // })
    //   .then((res) => {
    //     if (res.status === '400') {
    //       throw new Error('Bad Request')
    //     }
    //     return res.json()
    //   })
    //   .then((data) => {
    //     user = data.user
    //   })
    //   .then(() => {
    //     console.log(`authorization: 1Bearer ${user.token}`)
    //     return fetch(BASE_URL, {
    //       method: 'GET',
    //       headers: {
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //     })
    //   })
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((res) => {
    //     comments = res.comments
    //   })
    //   .then(() => {
    //     renderComments({ comments, user })
    //     addFormElement({ comments, user })
    //     authorization.remove()
    //   })
    //   .catch((error) => {
    //     if (error.message === 'Bad Request') {
    //       alert('Неверный логин или пароль')
    //     }
    //   })
  })

  const regSpan = document.getElementById('registration-span')
  regSpan.addEventListener('click', function () {
    authorization.remove()
    registration({ user, comments })
  })
}
