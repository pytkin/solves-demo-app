<template>
  <div>
    <h3 :class="{ 'with-placeholder': !block.text }">
      {{ block.text ? block.text : 'Введите текст' }}
    </h3>
    <template v-if="block.editing">
      <b-form-input ref="blockTextInput" v-model="block.text" />
      <div class="block-edit-actions">
        <b-button
          variant="success"
          size="sm"
          @click="handleSave"
          >Соханить</b-button
        >
        <b-button
          size="sm"
          @click="handleCancel"
          >Отменить</b-button
        >
      </div>
    </template>
    <template v-else>
      <div class="block-actions">
        <b-button
          variant="light"
          size="sm"
          @click="handleEdit"
          ><b-icon icon="pencil"
        /></b-button>
        <b-button
          v-if="blocksNumber > 1"
          v-handle
          variant="light"
          size="sm"
          ><b-icon icon="arrows-move"
        /></b-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api";
import { TextBlock } from '@/types/blocks';

export default defineComponent({
  props: {
    block: {
      type: Object,
      required: true,
    },
    blocksNumber: {
      type: Number,
      default: 0,
    }
  },
  setup(props, context) {
    function handleSave(): void {
      context.emit('save')
    }

    function handleCancel(): void {
      context.emit('cancel')
    }

    function handleEdit(): void {
      context.emit('edit')
    }

    onMounted(() => {
      const ref: any = context.refs.blockTextInput
      if (ref?.$el) {
        ref.$el.focus()
      }
    })

    return { handleSave, handleCancel, handleEdit }
  }
})
</script>
