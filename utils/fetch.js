import { LOGIN_URL } from './const.js'
import { BASE_URL } from './const.js'
import { BASE_USER_URL } from './const.js'
import _ from 'lodash'

export async function fetchAuthorizationUser(login, password) {
  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
    })
    const user = await response.json()
    return user.user
  } catch (error) {
    if (response.status === 400) {
      throw Error('Неверный логин или пароль')
    } else {
      throw Error(`Ошибка сервера: ${response.status}`)
    }
  }
}

export async function fetchRegUser(name, login, password) {
  try {
    const response = await fetch(BASE_USER_URL, {
      method: 'POST',
      body: JSON.stringify({
        name: _.capitalize(name),
        login: login,
        password: password,
      }),
    })
    const regUser = await response.json()
    return regUser.user
  } catch (error) {
    throw error
  }
}

export async function fetchPostCommentsAuth(user, text) {
  try {
    const commentsResponse = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({ text: text }),
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const commentData = await commentsResponse.json()
    return commentData
  } catch (error) {
    if (error.status === 500) {
      throw Error('Сервер сломался')
    }
    if (error.status === 400) {
      throw Error('Плохой запрос')
    }
  }
}

export async function fetchCommentsAuth(user) {
  try {
    const commentsResponse = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const commentsData = await commentsResponse.json()
    return commentsData.comments
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchComments() {
  try {
    const res = await fetch(BASE_URL, { method: 'GET' })
    const responseData = await res.json()
    return responseData.comments
  } catch (error) {
    console.error(`fetchComments: ${error.message}`)
    throw error
  }
}
