export const viewInitAddCommentForm = (user) => {
  const appElement = document.querySelector(".appElement");
  const newFormHTML = document.createElement("div");
  newFormHTML.innerHTML = `<div class="add-form" >
      <input
        id="input"
        type="text"
        class="add-form-name"
        value="${user.name}" disabled
      ></input>
      <textarea
        id="textarea"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="button" class="add-form-button">Написать</button>
      </div>
    </div>
    `;
  appElement.appendChild(newFormHTML);
};
