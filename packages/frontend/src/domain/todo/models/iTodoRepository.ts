import type { ResultAsync } from 'neverthrow'

import type { Todo } from './todo'

export interface ITodoRepository {
  list(): ResultAsync<Todo[], Error>

  one(id: Todo['id']): ResultAsync<Todo, Error>

  save(todo: Todo): ResultAsync<Todo, Error>

  delete(todo: Todo): ResultAsync<null, Error>
}
