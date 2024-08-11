import { BASE_URL } from './const.js'
import { renderComments } from './renderComments.js'

export const listWrapper = ({ comments, user }) => {
  const appElement = document.querySelector('.appElement')
  const unorderedListWrapper = document.createElement('ul')
  unorderedListWrapper.classList.add('comments')
  unorderedListWrapper.id = 'comments'
  const newComments = renderComments({ comments })
  unorderedListWrapper.innerHTML = newComments
  appElement.appendChild(unorderedListWrapper)

  unorderedListWrapper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('comment-text')) {
      return
    }
    const commentIndex = event.target.dataset.index
    const header = document.querySelector(
      `[data-comment-header-index="${commentIndex}"]`
    )
    const addFormText = document.querySelector('.add-form-text')
    addFormText.value = `Ответ на комментарий:\n>${event.target.textContent.trim()}\n${
      header.textContent
    }`
  })
  unorderedListWrapper.addEventListener('click', async (event) => {
    if (JSON.stringify(user) === '{}') {
      alert('Необходимо авторизоваться или пройти регистрацию')
      return
    }

    if (event.target.classList.contains('like-button')) {
      try {
        const response = await fetch(
          `${BASE_URL}/${event.target.dataset.likeIndex}/toggle-like`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Отсутствие авторизации')
          } else {
            throw new Error(`Ошибка сервера: ${response.status}`)
          }
        }
        const resData = await response.json()
        const counter = document.querySelector(
          `[data-counter-index="${event.target.dataset.likeIndex}"]`
        )
        counter.innerHTML = resData.result.likes
        event.target.classList.toggle('-active-like')
      } catch (error) {
        if (error.message === 'Отсутствие авторизации') {
          alert('Необходимо авторизироваться')
        } else {
          console.error('Произошла ошибка:', error)
        }
      }
    }
  })
}
