export const viewRegistration = () => {
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
  appElement.appendChild(registration)
}
