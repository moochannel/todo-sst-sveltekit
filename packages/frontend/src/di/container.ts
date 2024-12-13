import { Container } from 'inversify'

import type { ITodoRepository } from '../domain/todo/models/iTodoRepository'
import { DynamoDbTodoRepository } from '../infrastructure/dynamodb/todo/todoRepository'
import { TYPES } from './types'

const container = new Container()

container
  .bind<ITodoRepository>(TYPES.ITodoRepository)
  .toDynamicValue(() => new DynamoDbTodoRepository())

export { container }
