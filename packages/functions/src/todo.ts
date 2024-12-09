import { Todo } from '@todo-sstv2-sveltekit/core/todo'
import { ApiHandler } from 'sst/node/api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const create = ApiHandler(async (_evt) => {
  await Todo.create()

  return {
    statusCode: 200,
    body: 'Todo created',
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
export const list = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: JSON.stringify(Todo.list()),
  }
})
