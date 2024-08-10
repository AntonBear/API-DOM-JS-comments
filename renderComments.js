export const renderComments = ({ comments }) => {
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

  const listWrapper = document.querySelector('.comments')

  if (listWrapper) {
    listWrapper.innerHTML = commentsHTML
  }
  return commentsHTML
}
