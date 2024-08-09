import { authorization } from './authorization.js'

export const notion = ({ user, comments }) => {
  const notionElement = document.createElement('div')
  notionElement.classList.add('registration-notion')
  notionElement.innerHTML = `
  Чтобы добавить комментарий,
  <span class="span-authorization">авторизуйтесь</span>
`
  const appElement = document.querySelector('.appElement')
  appElement.appendChild(notionElement)

  notionElement.addEventListener('click', function () {
    notionElement.remove()
    authorization({ user, comments })
  })
}
