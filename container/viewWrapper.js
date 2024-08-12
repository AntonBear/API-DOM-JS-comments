export const viewWrapper = () => {
  const appElement = document.querySelector('.appElement')
  const unorderedListWrapper = document.createElement('ul')
  unorderedListWrapper.classList.add('comments')
  unorderedListWrapper.id = 'comments'
  appElement.appendChild(unorderedListWrapper)
}
