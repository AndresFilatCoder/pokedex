import type { PokemonDetails } from './pokemonDetails'

export interface PokemonList {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export interface Pokemon {
  name: string
  url: string
  details: PokemonDetails | null
}
