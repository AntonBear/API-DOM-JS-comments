// import { fetchCommentsAuth } from '../fetch.js'
// import {getAllComments} from './modelComment.js'

const commentsContainer = document.getElementById('comments') // ULLLLL
export let allComments = [] // Массив для хранения всех комментариев

export function updateAllCommentsArray(newArray) {
  allComments = newArray
}

// Функция для добавления комментариев в массив
function addCommentsToArray(newComments) {
  allComments = [...allComments, ...newComments]
}

// Функция для обновления DOM с новыми комментариями
function updateCommentsDOM(newComments) {
  function formatDate(dateString) {
    const date = new Date(dateString)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }
  console.log(newComments)
  newComments.forEach((comment) => {
    const commentElement = document.createElement('li')
    commentElement.classList.add('comments')
    commentElement.id = 'comments'
    commentElement.setAttribute('data-index', `${comment.id}`)
    commentElement.innerHTML = `
    <div class="comment-header">
      <div data-comment-header-index='${comment.id}'>${
      comment.author.name
    }</div>
      <div>${formatDate(comment.date)}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text" data-index="${comment.id}" >
        ${comment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter" data-counter-index="${comment.id}">${
      comment.likes
    }</span>
        <button class='${
          comment.isLiked ? 'like-button -active-like' : 'like-button'
        }' data-like-index="${comment.id}"></button>
      </div>
    </div>
  </li>`

    commentsContainer.appendChild(commentElement)
  })
}

// Функция для проверки новых комментариев
export async function checkForNewComments(comments) {
  // const comments = await fetchCommentsAuth(user) // Получаем комментарии из API
  const newCommentIds = comments.map((comment) => comment.id) // Получаем ID новых комментариев
  // console.log(comments)
  const existingCommentIds = allComments.map((comment) => comment.id) // Получаем ID существующих комментариев
  // console.log(allComments)
  // Фильтруем новые комментарии, которых еще нет в массиве
  const trulyNewComments = newCommentIds.filter(
    (comment) => !existingCommentIds.includes(comment.id)
  )
  console.log(trulyNewComments)

  if (trulyNewComments.length > 0) {
    addCommentsToArray(trulyNewComments) // Добавляем новые комментарии в массив
    console.log(trulyNewComments)
    updateCommentsDOM(trulyNewComments) // Обновляем DOM с новыми комментариями
  }
}
