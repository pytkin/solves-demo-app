<template>
  <div>
    <img v-if="block.image" :src="block.image" alt="" />
    <div class="block-actions">
      <b-button
        variant="light"
        size="sm"
        @click="handleEdit"
        ><b-icon icon="pencil"
      /></b-button>
      <b-button
        v-if="blocksNumber"
        v-handle
        variant="light"
        size="sm"
        ><b-icon icon="arrows-move"
      /></b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { ImageBlock } from '@/types/blocks';

export default defineComponent({
  props: {
    block: {
      type: Object as PropType<ImageBlock>,
      required: true,
    },
    blocksNumber: {
      type: Number,
      default: 0,
    }
  },
  setup(_props, { emit }) {
    function handleEdit(): void {
      emit('edit')
    }
    return { handleEdit }
  }
})
</script>
