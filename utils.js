
export function generateLoader() {
  const appElement = document.querySelector('.appElement')
  const loader = document.createElement('img')
  loader.id = 'loader'
  loader.src = './13.gif'
  loader.style.display = 'none'
  appElement.appendChild(loader)
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


