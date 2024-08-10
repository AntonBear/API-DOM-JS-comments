import { BASE_URL } from './const.js'
import { renderComments } from './renderComments.js'
import { showLoader, hideLoader } from './utils.js'

export const addFormElement = ({ user }) => {
  const appElement = document.querySelector('.appElement')
  const newFormHTML = document.createElement('div')

  newFormHTML.innerHTML = `<div class="add-form" >
    <p class="text-comment-loading">Комментарий загружается...</p>
    <input
      id="input"
      type="text"
      class="add-form-name"
      value="${user.name}" disabled
    ></input>
    <textarea
      id="textarea"
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий 
"
      rows="4"
    ></textarea>
    <div class="add-form-row">
      <button id="button" class="add-form-button">Написать</button>
    </div>
  </div>
  `
  appElement.appendChild(newFormHTML)

  const addFormText = document.querySelector('.add-form-text')
  const addFormButton = document.getElementById('button')
  const addForm = document.querySelector('.add-form')
  addFormButton.disabled = true

  addForm.addEventListener('input', function checkInputsLength(event) {
    if (event.target.classList.contains('add-form-text')) {
      if (event.target.value.length > 3) {
        addFormButton.disabled = false
      } else {
        addFormButton.disabled = true
      }
    }
  })

  addFormButton.addEventListener('click', function () {
    const text = document
      .getElementById('textarea')
      .value.replaceAll('<', '&lt')
      .replaceAll('>', '&gt')
    if (text === '') {
      alert('Введите пожалуйста хоть что-нибудь')
      return
    }
    const textCommentLoading = document.querySelector('.text-comment-loading')
    document.querySelector('.add-form').style.display = 'none'
    textCommentLoading.style.display = 'flex'

    document
      .querySelector('.add-form')
      .parentNode.insertBefore(
        textCommentLoading,
        document.querySelector('.add-form')
      )

    showLoader()

    fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({ text: text }),
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        if (res.status === 500) {
          throw new Error('Сервер сломался')
        }
        if (res.status === 400) {
          throw new Error('Плохой запрос')
        }
        return res.json()
      })
      .then(() => {
        console.log(`addFormElement: 1Bearer ${user.token}`)
        return fetch(BASE_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        const comments = res.comments
        console.log(comments)
        console.log(`addFormElement: 2Bearer ${user.token}`)
        // authorization.remove()
        renderComments({ comments })
      })
      .then(() => {
        document.querySelector('.add-form').style.display = 'flex'
        document.querySelector('.text-comment-loading').style.display = 'none'
        addFormText.value = ''
      })
      .catch((error) => {
        console.log(error.message)
        if (error.message === 'Сервер сломался') {
          alert(
            'Сервер сломался (плановое поведение для отработки .catch) попробуйте отправить еще раз'
          )
        }
        if (error.message === 'Failed to fetch') {
          alert('У вас отсутствует интернет соединение')
        }

        document.querySelector('.text-comment-loading').style.display = 'none'
        document.querySelector('.add-form').style.display = 'flex'
      })
      .finally(() => {
        hideLoader()
      })
  })
}
