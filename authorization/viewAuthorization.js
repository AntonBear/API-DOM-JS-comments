export const viewAuthorization = () => {
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
}
