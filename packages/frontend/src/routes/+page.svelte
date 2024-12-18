<script lang="ts">
  import { tick } from 'svelte'

  import { toast } from 'svelte-sonner'
  import { superForm } from 'sveltekit-superforms'

  import { invalidateAll } from '$app/navigation'
  import Button from '$lib/components/ui/button/button.svelte'
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte'
  import Textarea from '$lib/components/ui/textarea/textarea.svelte'

  import type { Todo } from '../domain/todo/models/todo'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const { form, errors, enhance, constraints } = superForm(data.form, {
    onUpdated: ({ form }) => {
      if (form.valid) {
        const message = typeof form.message === 'string' ? form.message : '送信しました'
        toast.success(message)
      }
    },
  })

  const toggleDone = async (todo: Todo) => {
    await fetch(`/api/todo/${todo.id}/toggleDone`, { method: 'POST' })
  }

  const deleteTodo = async (todo: Todo) => {
    await fetch(`/api/todo/${todo.id}`, { method: 'DELETE' })
    await invalidateAll()
    await tick()
    toast.success(`The todo ${todo.description} has been deleted.`)
  }
</script>

<section class="mx-auto mt-4 w-11/12 sm:w-3/5">
  <h1 class="text-xl font-bold">Todo</h1>
  <div class="mt-2 grid grid-cols-[auto_1fr_auto] items-center gap-1">
    {#each data.todos as todo}
      <Checkbox
        checked={todo._kind === 'completed'}
        class="col-span-1"
        onchange={() => toggleDone(todo)}
      />
      <div class="col-span-1 whitespace-pre-wrap break-words">
        {todo.description}
      </div>
      <div class="col-span-1">
        <Button variant="destructive" onclick={() => deleteTodo(todo)}>
          <span class="material-symbols-outlined">delete</span>
        </Button>
      </div>
    {/each}
  </div>
</section>

<form
  method="post"
  action="?/add"
  class="mx-auto mt-4 grid w-11/12 grid-cols-[1fr_auto] content-center gap-x-2 sm:w-3/5"
  use:enhance
>
  <div class="col-span-1">
    <Textarea
      placeholder="Type your task here."
      name="description"
      bind:value={$form.description}
      aria-invalid={$errors.description ? 'true' : undefined}
      {...$constraints.description}
      class="w-full border"
    />
    {#if $errors.description}
      <p class="text-red-600">{$errors.description}</p>
    {/if}
  </div>
  <Button type="submit" class="col-span-1 place-self-center">
    <span class="material-symbols-outlined">add_box</span>
  </Button>
</form>
