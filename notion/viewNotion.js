export const viewNotion = () => {
  const notionElement = document.createElement("div");
  notionElement.classList.add("registration-notion");
  notionElement.innerHTML = `
    Чтобы добавить комментарий,
    <span class="span-authorization">авторизуйтесь</span>
  `;
  const appElement = document.querySelector(".appElement");
  appElement.appendChild(notionElement);
};
