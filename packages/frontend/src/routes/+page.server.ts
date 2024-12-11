import { container } from '../di/container'
import { ListTodosUsecase } from '../domain/todo/usecases/listTodos'
import type { PageServerLoad } from './$types'

export const load = (async () => {
  const todos = await container
    .resolve(ListTodosUsecase)
    .execute()
    .match(
      (todos) => todos,
      (error) => {
        console.error('Error occured on fetch list of todo', error)
        return []
      },
    )
  return {
    todos,
  }
}) satisfies PageServerLoad
