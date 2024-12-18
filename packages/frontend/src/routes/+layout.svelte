<script lang="ts">
  import { Toaster } from '$lib/components/ui/sonner'

  import '../app.css'

  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<Toaster />

{@render children()}
