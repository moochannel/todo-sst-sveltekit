import { ulid } from 'ulid'

type TodoBase = {
  id: string // ULID
  description: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export type CreatingTodo = {
  _kind: 'creating'
  description: string
}

export const CreatingTodo = {
  persist(params: CreatingTodo): ActiveTodo {
    console.log('save as active todo', this)
    return {
      ...params,
      _kind: 'active',
      id: ulid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  },
}

export type ActiveTodo = TodoBase & {
  _kind: 'active'
}

export const ActiveTodo = {
  done(todo: ActiveTodo): CompletedTodo {
    console.log('set todo to done', this)
    return {
      ...todo,
      _kind: 'completed',
      doneAt: new Date(),
      updatedAt: new Date(),
    }
  },
}

export type CompletedTodo = TodoBase & {
  _kind: 'completed'
  doneAt: Date
}

export const CompletedTodo = {
  undone(todo: CompletedTodo): ActiveTodo {
    console.log('set todo to undone', this)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { doneAt, ...rest } = todo
    return {
      ...rest,
      _kind: 'active',
      updatedAt: new Date(),
    }
  },
}

export type Todo = ActiveTodo | CompletedTodo

export const Todo = {}
