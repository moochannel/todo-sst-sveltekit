import type { Infer } from 'sveltekit-superforms'
import { z } from 'zod'

export const addTodoSchema = z.object({
  description: z.string().min(1),
})

export type AddTodoSchema = Infer<typeof addTodoSchema>
