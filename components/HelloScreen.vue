<template>
  <transition name="hello-screen">
    <div v-if="showHelloScreen" class="hello-screen">
      <h3>Создайте свой уникальный шаблон из блоков</h3>
      <b-button variant="outline-primary" size="lg" @click="handleClick">
        <b-icon icon="plus" aria-hidden="true" /> Добавить новый блок
      </b-button>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    showHelloScreen: {
      type: Boolean,
      default: false,
    }
  },
  setup(_props, { emit }) {
    function handleClick(): void {
      emit('start-journey')
    }
    return { handleClick }
  }
});
</script>
