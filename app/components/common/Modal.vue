<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const isModalOpen = defineModel<boolean>({ default: false })
const modalRef = ref<HTMLElement | null>(null)

watch(isModalOpen, async isOpen => {
  if (isOpen) {
    await nextTick()
    modalRef.value?.focus()
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isModalOpen"
        ref="modalRef"
        tabindex="0"
        class="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 outline-none"
        @click.self="isModalOpen = false"
        @keydown.esc="isModalOpen = false"
      >
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>
