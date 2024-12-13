import { DynamoDBClient, GetItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb'
import { errAsync, fromPromise, okAsync, type ResultAsync } from 'neverthrow'
import { Table } from 'sst/node/table'

import type { ITodoRepository } from '../../../domain/todo/models/iTodoRepository'
import { ActiveTodo, CompletedTodo, Todo } from '../../../domain/todo/models/todo'

export class DynamoDbTodoRepository implements ITodoRepository {
  public list(): ResultAsync<Todo[], Error> {
    const dbClient = new DynamoDBClient({ region: 'ap-northeast-1' })
    const result = fromPromise(
      dbClient.send(new ScanCommand({ TableName: Table.todo.tableName })),
      (error) => new Error('Failed to fetch from DynamoDB', { cause: error }),
    ).andThen((command) => {
      if (command.Items == null) {
        return errAsync(new Error('Items are undefined'))
      }
      return okAsync(
        command.Items.map((todo) => {
          if (todo.doneAt == null || todo.doneAt.S === '') {
            return {
              _kind: 'active',
              id: todo.id.S ?? '',
              description: todo.description.S ?? '',
              createdAt: new Date(todo.createdAt.S!),
              updatedAt: new Date(todo.updatedAt.S!),
            } satisfies ActiveTodo
          } else {
            return {
              _kind: 'completed',
              id: todo.id.S ?? '',
              description: todo.description.S ?? '',
              doneAt: new Date(todo.doneAt.S!),
              createdAt: new Date(todo.createdAt.S!),
              updatedAt: new Date(todo.updatedAt.S!),
            } satisfies CompletedTodo
          }
        }),
      )
    })
    return result
  }

  public one(todoId: Todo['id']): ResultAsync<Todo, Error> {
    const dbClient = new DynamoDBClient({ region: 'ap-northeast-1' })
    const result = fromPromise(
      dbClient.send(
        new GetItemCommand({ TableName: Table.todo.tableName, Key: { id: { N: `${todoId}` } } }),
      ),
      (error) => new Error('Failed to fetch from DynamoDB', { cause: error }),
    ).andThen((command) => {
      if (command.Item == null) {
        return errAsync(new Error('Items are undefined'))
      }
      if (command.Item.doneAt == null || command.Item.doneAt.S === '') {
        return okAsync({
          _kind: 'active',
          id: command.Item.id.S ?? '',
          description: command.Item.description.S ?? '',
          createdAt: new Date(command.Item.createdAt.S!),
          updatedAt: new Date(command.Item.updatedAt.S!),
        } satisfies ActiveTodo)
      } else {
        return okAsync({
          _kind: 'completed',
          id: command.Item.id.S ?? '',
          description: command.Item.description.S ?? '',
          doneAt: new Date(command.Item.doneAt.S!),
          createdAt: new Date(command.Item.createdAt.S!),
          updatedAt: new Date(command.Item.updatedAt.S!),
        } satisfies CompletedTodo)
      }
    })
    return result
  }
}
