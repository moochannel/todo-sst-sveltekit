import { Container } from 'inversify'

import type { ITodoRepository } from '../domain/todo/models/iTodoRepository'
import { StubTodoRepository } from '../infrastructure/stub/todo/todoRepository'
import { TYPES } from './types'

const container = new Container()

container
  .bind<ITodoRepository>(TYPES.ITodoRepository)
  .toDynamicValue(() => new StubTodoRepository())

export { container }
