import { inject, injectable } from 'inversify'
import { type ResultAsync } from 'neverthrow'

import { TYPES } from '../../../di/types'
import type { ITodoRepository } from '../models/iTodoRepository'
import { type Todo } from '../models/todo'

@injectable()
export class DeleteTodoUsecase {
  constructor(@inject(TYPES.ITodoRepository) private todoRepository: ITodoRepository) {}

  public execute(todoId: Todo['id']): ResultAsync<null, Error> {
    return this.todoRepository.one(todoId).andThen((todo) => this.todoRepository.delete(todo))
  }
}
