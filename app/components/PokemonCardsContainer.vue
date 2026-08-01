<script setup lang="ts">
import PokemonCard from '~/components/PokemonCard.vue'
import type { Pokemon } from '~/services/interfaces/pokemon'

const props = defineProps<{
  pokemons: Pokemon[]
}>()

useSeoMeta({
  title: 'Inicio',
  ogTitle: 'Selecciona o Busca un Pokémon'
})

const navbarStore = useNavbarStore()
const favoritesStore = useFavoritesStore()

const filteredPokemons = ref(props.pokemons)

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
  console.log(navbarStore.filtersApplied)
  if (!navbarStore.filtersApplied) {
    filteredPokemons.value = props.pokemons
    return
  }

  if (filters.searchText.length) {
    filteredPokemons.value = props.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(filters.searchText.toLowerCase())
    )
  }

  if (filters.types.length) {
    filteredPokemons.value = props.pokemons.filter(pokemon =>
      filters.types.every(type => pokemon.details?.types.some(t => t.type.name === type))
    )
  }

  navbarStore.resultsCount = filteredPokemons.value.length
}

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
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-5">
    <PokemonCard
      v-for="(pokemon, index) in filteredPokemons"
      :key="index"
      :index="index"
      :pokemon="pokemon"
      @toggle-favorite="onToggleFavorite(pokemon)"
    />
  </div>
</template>
