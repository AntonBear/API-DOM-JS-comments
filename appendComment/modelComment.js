export function findObjectsWithDifferentProperties(arr1, arr2) {
  const differentObjects = []
  // Проходим по первому массиву
  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i]
    const obj2 = arr2[i]
    // Сравниваем свойства объектов
    if (areObjectsEqualByIsLiked(obj1, obj2)) {
      differentObjects.push(obj2)
    }
  }
  console.log('Измененные комментарии после авторизации ', differentObjects)
  return differentObjects
}

function areObjectsEqualByIsLiked(obj1, obj2) {
  return obj1.isLiked !== obj2.isLiked
}

export function updateCommentsInDOM(changedComments) {
  console.log(changedComments)
  changedComments.forEach((changedComment) => {
    const commentElement = document.querySelector(
      `[data-like-index="${changedComment.id}"]`
    )

    if (commentElement) {
      if (changedComment.isLiked) {
        commentElement.classList.toggle('-active-like')
      } else {
        commentElement.classList.toggle('-active-like')
      }
    } else {
      console.warn(`Комментарий с ID ${changedComment.id} не найден в DOM`)
    }
  })
}

const comments = []

export function getComments() {
  return comments
}

export function addItemToComments(item) {
  comments.push(item)
}

export function shareComments(item) {
  comments = item
}

const authComments = []

export function getAuthComments() {
  return authComments
}

export function addItemToAuthComments(item) {
  authComments.push(item)
}

export function updateItem(index, newItem) {
  if (index >= 0 && index < sharedData.length) {
    authComments[index] = newItem
  }
}
