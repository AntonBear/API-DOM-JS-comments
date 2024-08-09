'use strict'
import { fetchComments } from './fetchComments.js'
import { BASE_URL } from './const.js'
import { comments } from './comments.js'
import { addFormElement } from './addFormElement.js'
import { user } from './user.js'
import { notion } from './notion.js'
import { registration } from './registration.js'


fetchComments({
  addFormElement,
  notion,
  registration,
  comments,
  BASE_URL,
  user,
})
