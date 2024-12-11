import type { ResultAsync } from 'neverthrow'

import type { Todo } from './todo'

export interface ITodoRepository {
  list(): ResultAsync<Todo[], Error>

  one(id: Todo['id']): ResultAsync<Todo, Error>
}
