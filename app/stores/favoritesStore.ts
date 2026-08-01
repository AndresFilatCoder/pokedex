import type { Pokemon } from '~/services/interfaces/pokemon'

export interface Filters {
  searchText: string
  types: string[]
}

export const useFavoritesStore = defineStore(
  'favoritesStore',
  () => {
    const favoritePokemons = ref<Pokemon[]>([])

    const toggleFavorite = (pokemon: Pokemon) => {
      if (favoritePokemons.value.some(favorite => favorite.name === pokemon.name)) {
        favoritePokemons.value = favoritePokemons.value.filter(p => p.name !== pokemon.name)
      } else {
        favoritePokemons.value.push(pokemon)
      }
    }

    return {
      toggleFavorite,
      favoritePokemons
    }
  },
  {
    persist: {
      key: 'favorites-store',
      storage: localStorage
    }
  }
)
