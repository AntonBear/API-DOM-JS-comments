const comments = []

export function getComments() {
  return comments
}

export function addItemToComments(item) {
  comments.push(item)
}

export function shareComments(item) {
    comments = item
  }



const authComments = []

export function getAuthComments() {
  return authComments
}

export function addItemToAuthComments(item) {
  authComments.push(item)
}

export function updateItem(index, newItem) {
  if (index >= 0 && index < sharedData.length) {
    authComments[index] = newItem
  }
}

// module1.js
//  import { getData, addItem } from './store.js';
//  const data = getData();
//  addItem({ id: 1, name: 'Первый элемент' });

// module2.js
//  import { getData, updateItem } from './store.js';
//  const data = getData();
//  updateItem(0, { id: 1, name: 'Обновленный элемент' });
