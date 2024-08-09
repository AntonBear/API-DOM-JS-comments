import { authorization } from './authorization.js'
import { BASE_USER_URL } from './const.js'

export const registration = ({
  user,
  addFormElement,
  renderComments,
  BASE_URL,
  comments,
}) => {
  const oldRegistration = document.getElementById('registration')
  const appElement = document.querySelector('.appElement')
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

  if (oldRegistration) {
    appElement.replaceChild(registration, oldRegistration)
  }

  appElement.appendChild(registration)

  const buttonRegistrationEl = document.getElementById('button-registration')
  const inputLoginEl = document.getElementById('input-login-registration')
  const inputPasswordEl = document.getElementById('input-password-registration')

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

    if (name.length > 20) {
      alert('Имя слишком длинное больше 20 символов')
      return
    }

    if (login === '' || password === '' || name === '') {
      alert('Логин имя пароль должны содержать не менее трех символов')
      return
    }
    if (login === password) {
      alert('Логин и пароль не должны совпадать')
      return
    }

    fetch(BASE_USER_URL, {
      method: 'POST',
      body: JSON.stringify({ name: name, login: login, password: password }),
    })
      .then((res) => {
        console.log(res.ok)
        if (!res.ok) {
          return res.json().then((dataError) => {
            console.log(dataError.error)
            if (dataError.error === 'name должен содержать хотя бы 3 символа')
              throw new Error('name должен содержать хотя бы 3 символа')

            if (dataError.error === 'login должен содержать хотя бы 3 символа')
              throw new Error('login должен содержать хотя бы 3 символа')

            if (
              dataError.error === 'password должен содержать хотя бы 3 символа'
            )
              throw new Error('password должен содержать хотя бы 3 символа')
            if (
              dataError.error === 'Пользователь с таким логином уже существует'
            ) {
              throw new Error('Пользователь с таким логином уже существует')
            }
          })
        }

        return res.json()
      })
      .then((data) => {
        console.log(data)
        user = data.user
      })
      .then(() => {
        renderComments({ comments, BASE_URL, user })
        addFormElement({ renderComments, comments, user, BASE_URL })
        console.log(`registration: ${user.token}`)
        registration.style.display = 'none'
        inputLoginEl.value = ''
        inputPasswordEl = ''
      })
      .catch((error) => {
        if (error.message === 'Пользователь с таким логином уже существует') {
          alert('Пользователь с таким логином уже существует')
        }
        if (error.message === 'login должен содержать хотя бы 3 символа') {
          alert('login должен содержать хотя бы 3 символа')
        }
        if (error.message === 'name должен содержать хотя бы 3 символа') {
          alert('Имя должно содержать хотя бы 3 символа')
        }
        if (error.message === 'password должен содержать хотя бы 3 символа') {
          alert('password должен содержать хотя бы 3 символа')
        }
      })

      .finally(() => {})
  })

  const autoSpan = document.getElementById('authorization-span')
  autoSpan.addEventListener('click', function () {
    registration.remove()
    authorization({
      user,
      addFormElement,
      renderComments,
      BASE_URL,
      comments,
    })
  })
}
