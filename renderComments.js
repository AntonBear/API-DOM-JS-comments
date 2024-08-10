import { BASE_URL } from './const.js'

export const renderComments = ({ comments, user }) => {
  const appElement = document.querySelector('.appElement')
  const oldComments = document.querySelector('.comments')

  const commentsHTML = comments
    .map((comment) => {
      const inputDate = comment.date
      const date = new Date(inputDate.substring(0, 19))
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}.${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

      return `<li class="comment" data-idex="${comment.id}">
            <div class="comment-header">
              <div data-comment-header-index='${comment.id}'>${
        comment.author.name
      }</div>
              <div>${formattedDate}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text" data-index="${comment.id}" >
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter" data-counter-index="${
                  comment.id
                }">${comment.likes}</span>
  
                <button class='${
                  comment.isLiked ? 'like-button -active-like' : 'like-button'
                }' data-like-index="${comment.id}"></button>
  
              </div>
            </div>
          </li>`
    })
    .join('')

  const newComments = document.createElement('div')
  newComments.classList.add('comments')

  newComments.innerHTML = `
    <ul id="comments" class="comments">${commentsHTML}</ul>
    `

  if (oldComments) {
    appElement.replaceChild(newComments, oldComments)
  }

  appElement.prepend(newComments)






  const listComments = document.getElementById('comments')
  listComments.addEventListener('click', function (event) {
    if (Object.keys(user).length === 0) {
      return
    }
    if (!event.target.classList.contains('comment-text')) {
      return
    }
    const header = document.querySelector(
      `[data-comment-header-index='${event.target.dataset.index}']`
    )
    const addFormText = document.querySelector('.add-form-text')
    addFormText.value = `>${event.target.textContent
      .replace(/\s/g, ' ')
      .trim()}\n${header.textContent}`
  })









  listComments.addEventListener('click', function (event) {
    if (JSON.stringify(user) === '{}') {
      alert('Необходимо все еще авторизоваться или пройти регистрацию')
      return
    }
    if (event.target.classList.contains('like-button')) {
      fetch(`${BASE_URL}/${event.target.dataset.likeIndex}/toggle-like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          if (res.status === '401') {
            console.log('Отсутствие авторизации')
            throw new Error('Отсутствие авторизации')
          }
          return res.json()
        })
        .then((resData) => {
          console.log(resData.result.isLiked)
          const counter = document.querySelector(
            `[data-counter-index="${event.target.dataset.likeIndex}"]`
          )
          counter.innerHTML = resData.result.likes
          event.target.classList.toggle('-active-like')
        })
        .catch((error) => {
          if (error.message === 'Отсутствие авторизации') {
            alert('Необходимо авторизироваться')
          }
        })
    }
  })
}
