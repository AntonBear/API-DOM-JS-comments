import { renderComments } from './renderComments.js'
export const viewWrapper = ({comments}) => {
  const appElement = document.querySelector('.appElement')
  const unorderedListWrapper = document.createElement('ul')
  unorderedListWrapper.classList.add('comments')
  unorderedListWrapper.id = 'comments'
  unorderedListWrapper.innerHTML = renderComments({ comments })
  appElement.appendChild(unorderedListWrapper)
}
