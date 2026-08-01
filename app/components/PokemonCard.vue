<script setup lang="ts">
import type { Pokemon } from '~/services/interfaces/pokemon'
import Badge from './common/Badge.vue'

const props = defineProps<{
  pokemon: Pokemon
  index: number
}>()

const iconName = computed(() =>
  props.pokemon.isFavorite ? 'i-heroicons-heart-20-solid' : 'i-heroicons-heart'
)

const isFavoriteClass = computed(() => (props.pokemon.isFavorite ? 'text-red-500' : 'text-white'))

defineEmits(['toggle-favorite'])
</script>

<template>
  <NuxtLink
    :to="`/details/${props.pokemon.name.toLowerCase()}`"
    class="flex h-36 w-full max-w-md overflow-hidden rounded-3xl bg-pokemon-light-green shadow-md transition-transform duration-200 hover:scale-105"
  >
    <div class="flex flex-1 flex-col justify-between p-5">
      <span class="text-sm font-semibold text-gray-700">
        N°{{ String(props.pokemon.details?.id).padStart(3, '0') }}
      </span>

      <h2 class="text-3xl font-extrabold text-gray-900 capitalize">{{ props.pokemon.name }}</h2>

      <div class="flex gap-2">
        <Badge
          v-for="type in props.pokemon.details?.types"
          :key="type.slot"
          class="bg-pokemon-green"
        >
          {{ type.type.name }}
        </Badge>
      </div>
    </div>

    <div class="relative w-36 overflow-hidden bg-pokemon-dark-green">
      <div
        class="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20"
      >
        <img
          :src="props.pokemon.details?.sprites?.front_default"
          :alt="pokemon.name"
          class="absolute bottom-0 left-1/2 z-10 h-28 -translate-x-1/2 object-contain"
        />
      </div>

      <div
        class="absolute left-1/2 top-1/2 h-4 w-52 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white/15"
      ></div>

      <button
        class="absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-[2.5px] border-white bg-black/20 shadow-md backdrop-blur-[1px] transition"
        @click.prevent="$emit('toggle-favorite')"
      >
        <UIcon :name="iconName" class="h-4 w-4" :class="isFavoriteClass" />
      </button>
    </div>
  </NuxtLink>
</template>
