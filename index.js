'use strict'
import { listWrapper } from './renderComments/listWrapper.js'
import { fetchComments } from './utils/fetch.js'
import { showAuthorizationNotice } from './notion/notion.js'

async function App() {
  try {
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
  }
}

App()
