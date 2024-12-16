import { json } from '@sveltejs/kit'

import { container } from '../../../../../di/container'
import { ToggleDoneUsecase } from '../../../../../domain/todo/usecases/toggleDone'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = ({ params }) => {
  return container
    .resolve(ToggleDoneUsecase)
    .execute(params.todoId)
    .match(
      (todo) => json(todo),
      (error) => new Response(`Error occured ${error}`),
    )
}
