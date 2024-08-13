import { authorization } from "../authorization/authorization.js";
import { viewNotion } from "./viewNotion.js";

export const showAuthorizationNotice = () => {
  viewNotion();
  const notionElement = document.querySelector(".registration-notion");
  notionElement.addEventListener("click", function () {
    notionElement.remove();
    authorization();
  });
};
