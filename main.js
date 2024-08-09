'use strict'
import { fetchComments } from './fetchComments.js'
import { BASE_URL } from './const.js'
import { addFormElement } from './addFormElement.js'
import { user } from './user.js'
import { notion } from './notion.js'
import { showLoader, hideLoader } from './utils.js'
import { renderComments } from './renderComments.js'

async function initApp() {
  try {
    showLoader()
    const comments = await fetchComments()
    renderComments({ comments, BASE_URL, user })
  } catch (error) {
    // Обработка ошибки на уровне приложения
    console.error('Ошибка при инициализации:', error)
  } finally {
    hideLoader()
    if (Object.keys(user).length !== 0) {
      addFormElement({ renderComments, comments, user, BASE_URL })
    } else {
      notion({ user, addFormElement, renderComments, BASE_URL, comments })
    }
  }
}

initApp()

