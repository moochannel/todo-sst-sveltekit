import { inject, injectable } from 'inversify'
import { type ResultAsync } from 'neverthrow'

import { exhaustive } from '$lib/utils/typing'

import { TYPES } from '../../../di/types'
import type { ITodoRepository } from '../models/iTodoRepository'
import { ActiveTodo, CompletedTodo, type Todo } from '../models/todo'

@injectable()
export class ToggleDoneUsecase {
  constructor(@inject(TYPES.ITodoRepository) private todoRepository: ITodoRepository) {}

  public execute(todoId: Todo['id']): ResultAsync<Todo, Error> {
    return this.todoRepository
      .one(todoId)
      .map((_todo) => {
        switch (_todo._kind) {
          case 'active':
            return ActiveTodo.done(_todo)
          case 'completed':
            return CompletedTodo.undone(_todo)
          default:
            return exhaustive(_todo)
        }
      })
      .andThen((_todo) => this.todoRepository.save(_todo))
  }
}
