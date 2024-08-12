import { viewInitAddCommentForm } from './viewАddCommentForm.js'
import { postComment } from './modelCommentForm.js'

export const addFormElement = ({ user }) => {
  viewInitAddCommentForm(user)
  const addComButton = document.getElementById('button')
  addComButton.addEventListener('click', function () {
    const text = document
      .getElementById('textarea')
      .value.replaceAll('<', '&lt')
      .replaceAll('>', '&gt')
    postComment(user, text)
  })
}
