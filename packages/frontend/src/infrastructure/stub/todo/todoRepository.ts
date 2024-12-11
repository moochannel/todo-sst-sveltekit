import { errAsync, okAsync, type ResultAsync } from 'neverthrow'

import type { ITodoRepository } from '../../../domain/todo/models/iTodoRepository'
import type { Todo } from '../../../domain/todo/models/todo'

const sampleTodos = [
  {
    _kind: 'active',
    id: 1,
    description: 'test1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _kind: 'completed',
    id: 2,
    description: 'test2',
    doneAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _kind: 'active',
    id: 3,
    description: `\
test3-1
test3-2`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] satisfies Todo[]

export class StubTodoRepository implements ITodoRepository {
  public list(): ResultAsync<Todo[], Error> {
    return okAsync(sampleTodos)
  }

  public one(id: Todo['id']): ResultAsync<Todo, Error> {
    const todo = sampleTodos.find((_todo) => _todo.id === id)
    return todo == null ? errAsync(new Error('id not found')) : okAsync(todo)
  }
}
