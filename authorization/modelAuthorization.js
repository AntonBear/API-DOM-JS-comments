import { addFormElement } from "../addFormElement/addCommentForm.js";
import { fetchAuthorizationUser, fetchCommentsAuth } from "../utils/fetch.js";
import { listWrapper } from "../container/listWrapper.js";
import { fetchComments } from "../utils/fetch.js";
import { findObjectsWithDifferentProperties } from "../comment/modelComment.js";
import { updateCommentsInDOM } from "../comment/modelComment.js";

export async function loginUser(login, password) {
  try {
    const buttonAuthorizationEl = document.getElementById(
      "button-authorization",
    );
    const authorization = document.getElementById("authorization");
    const user = await fetchAuthorizationUser(login, password); // регистрируем пользователя
    const comments = await fetchCommentsAuth(user); // получаем комментарии пользователя
    const prewComments = await fetchComments(); // получаем комментарии без авторизации
    const newCommenteAfterLogin = findObjectsWithDifferentProperties(
      prewComments,
      comments,
    );
    updateCommentsInDOM(newCommenteAfterLogin);
    const commentsEl = document.querySelector(".comments");
    commentsEl.remove();
    listWrapper({ comments, user });
    addFormElement({ user });
    authorization.remove();
    buttonAuthorizationEl.disabled = false;
  } catch (e) {
    console.error(e);
  }
}

export function getSafeLogin() {
  const loginInput = document.getElementById("input-login-authorization");
  if (loginInput) {
    return loginInput.value.replaceAll("<", "&lt").replaceAll(">", "&gt");
  } else {
    console.error("Элемент input-login-authorization не найден!");
    return "";
  }
}

export function getSafePassword() {
  const passwordInput = document.getElementById("input-password-authorization");
  if (passwordInput) {
    return passwordInput.value.replaceAll("<", "&lt").replaceAll(">", "&gt");
  } else {
    console.error("Элемент input-password-authorization не найден!");
    return "";
  }
}

export function getSafeName() {
  const nameInput = document.getElementById("input-name-registration");
  if (nameInput) {
    return nameInput.value.replaceAll("<", "&lt").replaceAll(">", "&gt");
  } else {
    console.error("Элемент input-name -registration не найден!");
    return "";
  }
}
