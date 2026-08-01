<script setup lang="ts">
import FallbackDisplay from '~/components/common/FallbackDisplay.vue'
import PokemonCardsContainer from '~/components/PokemonCardsContainer.vue'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div>
    <div v-if="favoritesStore.favoritePokemons.length">
      <PokemonCardsContainer :pokemons="favoritesStore.favoritePokemons" />
    </div>
    <FallbackDisplay
      v-else
      image="images/magikarp.png"
      title="No has marcado ningún Pokémon como favorito"
      subtitle="Haz clic en el icono de corazón de tus Pokémon favoritos y aparecerán aquí."
    />
  </div>
</template>
