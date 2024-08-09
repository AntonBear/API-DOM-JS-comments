'use strict'
import { fetchComments } from './fetchComments.js'
import { addFormElement } from './addFormElement.js'
import { user } from './user.js'
import { notion } from './notion.js'
import { showLoader, hideLoader } from './utils.js'
import { renderComments } from './renderComments.js'

async function initApp() {
  try {
    showLoader()
    const comments = await fetchComments()
    renderComments({ user, comments })
  } catch (error) {
    console.error('Ошибка при инициализации:', error)
  } finally {
    hideLoader()
    if (Object.keys(user).length !== 0) {
      addFormElement({ user, comments })
    } else {
      notion({ user, comments })
    }
  }
}

initApp()
