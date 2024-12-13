import { inject, injectable } from 'inversify'
import { okAsync, type ResultAsync } from 'neverthrow'

import { TYPES } from '../../../di/types'
import type { ITodoRepository } from '../models/iTodoRepository'
import { CreatingTodo, type Todo } from '../models/todo'

@injectable()
export class CreateTodosUsecase {
  constructor(@inject(TYPES.ITodoRepository) private todoRepository: ITodoRepository) {}

  public execute(newTodo: CreatingTodo): ResultAsync<Todo, Error> {
    return okAsync(newTodo)
      .map((todo) => CreatingTodo.persist(todo))
      .andThen((todo) => this.todoRepository.save(todo))
  }
}
