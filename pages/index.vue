<template>
  <div class="page-wrapper">
    <HelloScreen :show-hello-screen="state.showHelloScreen" @start-journey="startJourney"/>

    <b-modal id="actions-modal" hide-header hide-footer>
      <b-button
        variant="light"
        size="lg"
        @click="handleActionClick('text', 'actions-modal')"
      >
        <b-icon icon="cursor-text" /> Текст
      </b-button>
      <b-button
        variant="light"
        size="lg"
        @click="handleActionClick('image', 'actions-modal')"
      >
        <b-icon icon="images" /> Изображение
      </b-button>
    </b-modal>

    <b-modal id="images-modal" @hidden="handleImagesModalHidden">
      <template #modal-title> Выберите изображение </template>
      <div class="image-group">
        <template v-for="(image, index) in state.images">
          <div
            :key="`images-${index}`"
            class="image-wrap"
            :class="{ 'is-selected': state.selectedImage === image }"
          >
            <img :src="image" alt="" @click="state.selectedImage = image" />
          </div>
        </template>
      </div>
      <template #modal-footer>
        <b-button variant="success" size="sm" @click="handleAddImageBlockClick"
          >Соханить</b-button
        >
        <b-button size="sm" @click="handleCancelAddImageBlockClick"
          >Закрыть</b-button
        >
      </template>
    </b-modal>

    <SortableList
      v-if="state.showConstructorScreen"
      v-model="state.blocks"
      :lock-axis="'y'"
      :use-drag-handle="true"
    >
      <template v-for="(block, index) in state.blocks">
        <SortableItem
          :key="index"
          :class="[
            `block-${getBlockType(block)}`,
            block.editing ? 'block-editing' : null,
          ]"
          :index="index"
        >
          <template v-if="getBlockType(block) === 'text'">
            <TextBlock :block="block" :blocks-number="state.blocks.length" @save="handleTextBlockSaveClick(block)" @cancel="handleTextBlockCancelClick(block, index)" @edit="handleTextBlockEditClick(block)" />
          </template>
          <template v-else-if="getBlockType(block) === 'image'">
            <ImageBlock :block="block" :blocks-number="state.blocks.length" @edit="handleImageBlockEditClick(block)" />
          </template>
        </SortableItem>
      </template>
      <div v-if="state.blocks.length > 0" class="add-block-holder">
        <b-button
          variant="outline-primary"
          size="lg"
          :disabled="state.anyOfBlockIsEditable"
          @click="startJourney"
          ><b-icon icon="plus" aria-hidden="true" /> Добавить новый блок</b-button
        >
      </div>
    </SortableList>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
} from '@vue/composition-api'

import { ImageBlock, TextBlock } from '@/types/blocks'

const images = [
  require('../assets/images/demo-image-01.jpg'),
  require('../assets/images/demo-image-02.jpg'),
  require('../assets/images/demo-image-03.jpg'),
  require('../assets/images/demo-image-04.jpg'),
]

interface State {
  showHelloScreen: boolean
  showConstructorScreen: boolean
  blocks: Array<TextBlock | ImageBlock>
  anyOfBlockIsEditable: boolean
  editableImageBlocks: ImageBlock[]
  selectedImage: any
  images: string[]
}

export default defineComponent({
  setup(_props, context) {
    const state: State = reactive({
      showHelloScreen: true,
      showConstructorScreen: false,
      blocks: [],
      anyOfBlockIsEditable: computed(() =>
        state.blocks.some((item: TextBlock | ImageBlock) => item.editing)
      ),
      editableImageBlocks: computed(() =>
        state.blocks.filter(
          (item: TextBlock | ImageBlock) =>
            item instanceof ImageBlock && item.editing
        )
      ),
      selectedImage: null,
      images,
    })

    function startJourney() {
      state.showHelloScreen = false
      state.showConstructorScreen = true

      setTimeout(() => {
        context.root.$bvModal.show('actions-modal')
      }, 300)
    }

    function handleActionClick(blockType: string, modalId: string) {
      addBlock(blockType)

      if (modalId) {
        context.root.$bvModal.hide(modalId)
      }
    }

    function addBlock(blockType: string) {
      switch (blockType) {
        case 'text': {
          state.blocks.push(new TextBlock({ editing: true }))
          break
        }
        case 'image': {
          context.root.$bvModal.show('images-modal')
          break
        }
        default: {
          break
        }
      }
    }

    function handleTextBlockSaveClick(block: TextBlock) {
      if (block.text && block.text.length > 0) {
        block.prevText = block.text
        block.editing = false
      }
    }

    function handleTextBlockCancelClick(block: TextBlock, blockIndex: number) {
      if (
        block.text &&
        block.text.length > 0 &&
        block.prevText &&
        block.prevText.length > 0
      ) {
        if (block.prevText !== block.text) {
          block.text = block.prevText
        }
        block.editing = false
      } else {
        if (state.blocks.length - 1 <= 0) {
          state.showHelloScreen = true
        }

        setTimeout(() => {
          state.blocks = [
            ...state.blocks.slice(0, blockIndex),
            ...state.blocks.slice(blockIndex + 1),
          ]
        }, 300)
      }
    }

    function handleTextBlockEditClick(block: TextBlock) {
      block.editing = true
    }

    function handleAddBlockOnConstructorClick() {
      context.root.$bvModal.show('actions-modal')
    }

    function handleAddImageBlockClick() {
      const { selectedImage: image, editableImageBlocks } = state

      if (image !== null) {
        context.root.$on(
          'bv::modal::hide',
          (_bvEvent: any, modalId: string) => {
            if (modalId === 'images-modal') {
              if (editableImageBlocks[0]) {
                editableImageBlocks[0].image = image
                editableImageBlocks[0].editing = false
              } else {
                state.blocks.push(new ImageBlock({ image }))
              }
              state.selectedImage = null
              context.root.$off('bv::modal::hide')
            }
          }
        )

        context.root.$bvModal.hide('images-modal')
      }
    }

    function handleCancelAddImageBlockClick() {
      context.root.$on('bv::modal::hide', (_bvEvent: any, modalId: string) => {
        if (modalId === 'images-modal') {
          state.selectedImage = null
          context.root.$off('bv::modal::hide')
        }
      })

      context.root.$bvModal.hide('images-modal')
    }

    function handleImageBlockEditClick(block: ImageBlock) {
      block.editing = true
      state.selectedImage = block.image
      context.root.$bvModal.show('images-modal')
    }

    function handleImagesModalHidden() {
      const { editableImageBlocks } = state

      if (editableImageBlocks[0]) {
        editableImageBlocks[0].editing = false
      }

      if (state.blocks.length === 0) {
        state.showHelloScreen = true
      }
    }

    function getBlockType(block: TextBlock | ImageBlock) {
      if (block instanceof ImageBlock) return 'image'
      else if (block instanceof TextBlock) return 'text'
    }

    return {
      state,
      startJourney,
      addBlock,
      handleActionClick,
      handleTextBlockSaveClick,
      handleTextBlockCancelClick,
      handleTextBlockEditClick,
      handleAddBlockOnConstructorClick,
      handleAddImageBlockClick,
      handleCancelAddImageBlockClick,
      handleImageBlockEditClick,
      handleImagesModalHidden,
      getBlockType,
    }
  },
})
</script>
