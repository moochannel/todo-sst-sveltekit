<script lang="ts">
  import { superForm } from 'sveltekit-superforms'

  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const { form, errors, enhance, constraints, message } = superForm(data.form)
</script>

<h1>Todo</h1>
<ul>
  {#each data.todos as todo}
    <li class="grid grid-cols-[auto_1fr_auto] place-content-center gap-1">
      <input type="checkbox" checked={todo._kind === 'completed'} class="col-span-1" />
      <div class="col-span-1 whitespace-pre-wrap break-words">{todo.description}</div>
      <div class="col-span-1">✕</div>
    </li>
  {/each}
</ul>

<form method="post" action="?/add" class="grid grid-cols-[1fr_auto]" use:enhance>
  <div class="col-span-1">
    <input
      type="text"
      name="description"
      bind:value={$form.description}
      aria-invalid={$errors.description ? 'true' : undefined}
      {...$constraints.description}
      class="border"
    />
    {#if $errors.description}
      <p class="text-red-600">{$errors.description}</p>
    {/if}
  </div>
  <button class="col-span-1">送信</button>
  {#if $message}
    <p class="col-span-2 bg-yellow-200 font-bold text-green-900">{$message}</p>
  {/if}
</form>
