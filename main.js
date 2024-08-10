'use strict'
import { showLoader, hideLoader } from './utils.js'
import { listWrapper } from './ListWrapper.js'
import { fetchComments } from './config.js'
import { showAuthorizationNotice } from './notion.js'

async function initApp() {
  try {
    showLoader()
    const comments = await fetchComments()
    const user = {}
    listWrapper({ user, comments })
    if (Object.keys(user).length !== 0) {
      addFormElement({ user })
    } else {
      showAuthorizationNotice()
    }
  } catch (error) {
    console.error('Ошибка приложения:', error)
  } finally {
    hideLoader()
  }
}

initApp()
