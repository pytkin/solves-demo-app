<template>
  <div class="constructor-screen">
    <slot />
  </div>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort'

const SortableList = {
  mixins: [ContainerMixin],
}

export default SortableList
</script>
