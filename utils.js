export function generateLoader() {
  const appElement = document.querySelector('.appElement')
  const addCommentForm = document.querySelector('.add-form')
  const loader = document.createElement('img')
  loader.id = 'loader'
  loader.src = './13.gif'
  loader.style.display = 'none'
  addCommentForm.parentNode.insertBefore(loader, addCommentForm)
  return loader
}

export function showLoader() {
  let loader = null
  loader = document.getElementById('loader')
  if (!loader) {
    loader = generateLoader()
  }
  loader.style.display = 'block'
}

export function hideLoader() {
  const loader = document.getElementById('loader')
  loader.remove()
}

export function generateTextComment() {
  const addCommentForm = document.querySelector('.add-form')
  const TextCommentLoader = document.createElement('p')
  TextCommentLoader.id = 'textComment'
  TextCommentLoader.textContent = `Комментарий загружается...`
  addCommentForm.parentNode.insertBefore(TextCommentLoader, addCommentForm)
  TextCommentLoader.style.display = 'none'
  return TextCommentLoader
}

export function showTextComment() {
  let TextCommentLoader = null
  TextCommentLoader = document.getElementById('textComment')
  if (!TextCommentLoader) {
    TextCommentLoader = generateTextComment()
  }
  TextCommentLoader.style.display = 'block'
}

export function hideTextComment() {
  const TextCommentLoader = document.getElementById('textComment')
  TextCommentLoader.remove()
}
