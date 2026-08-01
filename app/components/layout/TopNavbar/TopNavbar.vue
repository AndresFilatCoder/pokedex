<script setup lang="ts">
import SearchInput from '~/components/common/SearchInput.vue'
import type { NavigationItem } from './interfaces/navigationItem'
import PokemonFilters from '~/components/PokemonFilters.vue'

const navbarStore = useNavbarStore()

const route = useRoute()

const items = ref<NavigationItem[]>([
  {
    label: 'Pokédex',
    icon: 'mdi:pokeball',
    to: '/',
    selected: route.path === '/'
  },
  {
    label: 'Regiones',
    icon: 'mdi:earth',
    to: '/regions',
    selected: route.path === '/regions'
  },
  {
    label: 'Favoritos',
    icon: 'mdi:heart',
    to: '/favorites',
    selected: route.path === '/favorites'
  },
  {
    label: 'Perfil',
    icon: 'mdi:account',
    to: '/profile',
    selected: route.path === '/profile'
  }
])

const onSelectItem = (item: NavigationItem) => {
  item.selected = true
  items.value.forEach(i => (i.selected = i === item))
}
</script>

<template>
  <div :class="navbarStore.filtersApplied ? 'mt-30' : 'mt-20'">
    <nav class="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div
        class="mx-auto flex h-20 w-full items-center justify-between px-4 border-b border-slate-200"
      >
        <div class="flex items-center gap-8">
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="flex w-20 flex-col items-center justify-center gap-1 transition-colors"
            @click="onSelectItem(item)"
          >
            <Icon
              :name="item.icon"
              class="text-2xl"
              :class="item.selected ? 'text-blue-600' : 'text-gray-500'"
            />

            <span
              class="text-xs font-medium"
              :class="item.selected ? 'text-blue-600' : 'text-gray-700'"
            >
              {{ item.label }}
            </span>
          </NuxtLink>
        </div>

        <div class="w-80 mr-4 flex items-center gap-2">
          <SearchInput
            v-model="navbarStore.filters.searchText"
            show-clear-button
            icon="i-lucide-search"
            :debounce="600"
            :input-attributes="{ placeholder: 'Busca un Pokémon...' }"
          />
          <PokemonFilters @apply="navbarStore.setTypes($event)" />
        </div>
      </div>
      <div v-if="navbarStore.filtersApplied" class="text-muted ml-5 pt-4">
        Se han econtrado
        <span class="font-bold">{{ navbarStore.resultsCount }}</span>
        <span> resultados </span>
        <button
          class="text-sm font-medium text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-700 cursor-pointer"
          @click="navbarStore.clearAllFilters()"
        >
          Borrar filtros
        </button>
      </div>
    </nav>
  </div>
</template>
