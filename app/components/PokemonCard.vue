<script setup lang="ts">
import type { Pokemon } from '~/services/interfaces/pokemon'

const props = defineProps<{
  pokemon: Pokemon
  index: number
}>()
</script>

<template>
  <div class="flex h-36 w-full max-w-md overflow-hidden rounded-3xl bg-[#CFEBA7] shadow-md">
    <div class="flex flex-1 flex-col justify-between p-5">
      <span class="text-sm font-semibold text-gray-700"> N°{{ index + 1 }} </span>

      <h2 class="text-3xl font-extrabold text-gray-900">{{ pokemon.name }}</h2>

      <div class="flex gap-2">
        <span
          v-for="type in props.pokemon.details?.types"
          :key="type.slot"
          class="rounded-full bg-[#78C850] px-3 py-1 text-xs font-semibold text-white"
        >
          {{ type.type.name }}
        </span>
      </div>
    </div>

    <div class="relative w-36 overflow-hidden bg-[#9ED63A]">
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
        class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white/20 text-white"
      >
        ♡
      </button>
    </div>
  </div>
</template>
