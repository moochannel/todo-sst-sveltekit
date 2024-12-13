import { fail, message, superValidate, type Infer } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

import { container } from '../di/container'
import type { CreatingTodo } from '../domain/todo/models/todo'
import { CreateTodosUsecase } from '../domain/todo/usecases/createTodo'
import { ListTodosUsecase } from '../domain/todo/usecases/listTodos'
import type { Actions, PageServerLoad } from './$types'
import { addTodoSchema } from './form'

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

  const form = await superValidate<Infer<typeof addTodoSchema>>(zod(addTodoSchema))

  return {
    todos,
    form,
  }
}) satisfies PageServerLoad

export const actions = {
  add: async ({ request }) => {
    const form = await superValidate<Infer<typeof addTodoSchema>>(request, zod(addTodoSchema))
    if (!form.valid) {
      return fail(400, { form })
    }

    const newTodo = {
      _kind: 'creating',
      description: form.data.description,
    } satisfies CreatingTodo

    await container
      .resolve(CreateTodosUsecase)
      .execute(newTodo)
      .match(
        (_todo) => _todo,
        (error) => {
          console.error('Error occured on creating todo', error)
          return []
        },
      )

    return message(form, 'Form posted successfully.')
  },
} satisfies Actions
