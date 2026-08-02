<script setup lang="ts">
import PokemonCard from '~/components/PokemonCard.vue'
import type { Pokemon } from '~/services/interfaces/pokemon'
import FallbackDisplay from './common/FallbackDisplay.vue'

const props = defineProps<{
  pokemons: Pokemon[]
}>()

useSeoMeta({
  title: 'Inicio',
  ogTitle: 'Selecciona o Busca un Pokémon'
})

const navbarStore = useNavbarStore()
const favoritesStore = useFavoritesStore()

const setIsFavorite = () => {
  props.pokemons.forEach(pokemon => {
    pokemon.isFavorite = favoritesStore.favoritePokemons.some(
      favorite => favorite.name === pokemon.name
    )
  })
}

const onToggleFavorite = (pokemon: Pokemon) => {
  favoritesStore.toggleFavorite(pokemon)
  pokemon.isFavorite = !pokemon.isFavorite
}

const filterPokemons = (filters: Filters) => {
  let filteredPokemons = props.pokemons

  if (!navbarStore.filtersApplied) {
    filteredPokemons = props.pokemons
    return filteredPokemons || []
  }

  if (filters.searchText.length) {
    filteredPokemons = filteredPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(filters.searchText.toLowerCase())
    )
  }

  if (filters.types.length) {
    filteredPokemons = filteredPokemons.filter(pokemon =>
      filters.types.every(type => pokemon.details?.types.some(t => t.type.name === type))
    )
  }

  navbarStore.resultsCount = filteredPokemons.length
  return filteredPokemons || []
}

const filteredPokemons = computed(() => filterPokemons(navbarStore.filters))

watch(
  () => navbarStore.filters,
  newFilters => {
    filterPokemons(newFilters)
    setIsFavorite()
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => setIsFavorite())
</script>

<template>
  <div
    v-if="filteredPokemons.length"
    class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-5"
  >
    <PokemonCard
      v-for="(pokemon, index) in filteredPokemons"
      :key="index"
      :index="index"
      :pokemon="pokemon"
      @toggle-favorite="onToggleFavorite(pokemon)"
    />
  </div>
  <FallbackDisplay
    v-else
    title="Sin resultados"
    subtitle="No se han encontrado resultados de acuerdo a los filtros aplicados."
  />
</template>
