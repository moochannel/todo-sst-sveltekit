<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
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
