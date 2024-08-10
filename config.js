import { BASE_URL } from './const'

export function postComment() {
  return fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ text: text }),
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then((res) => {
    if (res.status === 500) {
      throw new Error('Сервер сломался')
    }
    if (res.status === 400) {
      throw new Error('Плохой запрос')
    }
    return res.json()
  })
}


export function getComments() {
    return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
}





export async function authorizeAndFetchComments() {
    try {
      // 1. Авторизация
      const authResponse = await fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
      });
  
      if (!authResponse.ok) {
        if (authResponse.status === 400) {
          throw new Error('Неверный логин или пароль');
        } else {
          throw new Error(`Ошибка авторизации: ${authResponse.status}`);
        }
      }
  
      const authData = await authResponse.json();
      user = authData.user; 
  
      // 2. Получение комментариев
      const commentsResponse = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      if (!commentsResponse.ok) {
        throw new Error(`Ошибка получения комментариев: ${commentsResponse.status}`);
      }
  
      const commentsData = await commentsResponse.json();
      comments = commentsData.comments;
  
      // 3. Рендеринг и обновление UI
      renderComments({ comments, user });
      addFormElement({ comments, user });
      authorization.remove();
  
    } catch (error) {
      console.error('Ошибка:', error); 
      if (error.message.includes('Неверный логин')) {
        alert('Неверный логин или пароль');
      } else {
        // Общее сообщение об ошибке
        alert('Произошла ошибка. Пожалуйста, попробуйте позже.'); 
      }
    }
  }
  