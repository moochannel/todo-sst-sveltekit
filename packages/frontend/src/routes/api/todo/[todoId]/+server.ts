import { json } from '@sveltejs/kit'

import { container } from '../../../../di/container'
import { DeleteTodoUsecase } from '../../../../domain/todo/usecases/deleteTodo'
import type { RequestHandler } from './$types'

export const DELETE: RequestHandler = ({ params }) => {
  return container
    .resolve(DeleteTodoUsecase)
    .execute(params.todoId)
    .match(
      () => json({}),
      (error) => new Response(`Error occured ${error}`),
    )
}
