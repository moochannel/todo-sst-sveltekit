import { inject, injectable } from 'inversify'
import type { ResultAsync } from 'neverthrow'

import { TYPES } from '../../../di/types'
import type { ITodoRepository } from '../models/iTodoRepository'
import type { Todo } from '../models/todo'

@injectable()
export class ListTodosUsecase {
  constructor(@inject(TYPES.ITodoRepository) private todoRepository: ITodoRepository) {}

  public execute(): ResultAsync<Todo[], Error> {
    return this.todoRepository.list()
  }
}
