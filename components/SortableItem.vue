<template>
  <div class="block">
    <slot />
  </div>
</template>

<script>
import { ElementMixin } from 'vue-slicksort'

const SortableItem = {
  mixins: [ElementMixin],
}

export default SortableItem
</script>
