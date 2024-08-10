import { LOGIN_URL } from './const.js'
import { BASE_URL } from './const.js'
import { BASE_USER_URL } from './const.js'

export async function fetchAuthorizationUser(login, password) {
  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
    })

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Неверный логин или пароль')
      } else {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }
    }

    const user = await response.json()
    return user.user
  } catch (error) {
    if (error.message === 'Неверный логин или пароль') {
      alert('Неверный логин или пароль')
    } else {
      console.error('Произошла ошибка при авторизации:', error)
    }
  }
}


export async function fetchRegUser(name, login, password) {
  try {
    const response = await fetch(BASE_USER_URL, {
      method: 'POST',
      body: JSON.stringify({ name: name, login: login, password: password }),
    })
    if (!response.ok) {
      console.log(error.message)
      if (response.status === '400') {
        throw Error('400')
      }
      // if (response.error === 'name должен содержать хотя бы 3 символа')
      //   throw Error('name должен содержать хотя бы 3 символа')
      // if (response.error === 'login должен содержать хотя бы 3 символа')
      //   throw Error('login должен содержать хотя бы 3 символа')
      // if (response.error === 'password должен содержать хотя бы 3 символа')
      //   throw Error('password должен содержать хотя бы 3 символа')
      // if (response.error === 'Пользователь с таким логином уже существует') {
      //   throw Error('Пользователь с таким логином уже существует')
      // }
    }
    const regUser = await response.json()
    return regUser.user
  } catch (error) {
    if ((error.message = '400')) {
      alert('Данный логин уже существует')
    } else {
      alert('Некорректные данные')
    }
    // if (error.message === 'Пользователь с таким логином уже существует') {
    //   alert('Пользователь с таким логином уже существует')
    // }
    // if (error.message === 'login должен содержать хотя бы 3 символа') {
    //   alert('login должен содержать хотя бы 3 символа')
    // }
    // if (error.message === 'name должен содержать хотя бы 3 символа') {
    //   alert('Имя должно содержать хотя бы 3 символа')
    // }
    // if (error.message === 'password должен содержать хотя бы 3 символа') {
    //   alert('password должен содержать хотя бы 3 символа')
    // }
    // console.error('Произошла ошибка при регистрации:', error)
  }
}

export async function fetchCommentsAuth(user) {
  // Второй запрос (получение комментариев)
  const commentsResponse = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      // Используем обратные кавычки:
      Authorization: `Bearer ${user.token}`,
    },
  })
  if (!commentsResponse.ok) {
    throw new Error(`Ошибка получения комментариев: ${commentsResponse.status}`)
  }
  const commentsData = await commentsResponse.json()
  return commentsData.comments
}

export async function fetchComments() {
  try {
    const res = await fetch(BASE_URL, { method: 'GET' })
    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`)
    }
    const responseData = await res.json()
    return responseData.comments
  } catch (error) {
    console.error(`fetchComments: ${error.message}`)
    throw error // Пробрасываем ошибку дальше, чтобы обработать её на уровне приложения
  }
}
