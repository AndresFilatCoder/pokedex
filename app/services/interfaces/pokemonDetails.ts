export interface PokemonDetails {
  id: number
  name: string
  sprites: PokemonSprite
  types: PokemonType[]
  height: number
  weight: number
  abilities: Ability[]
  cries: Cries
}

export interface Cries {
  latest: string
}

export interface Ability {
  ability: NamedApiResource
}

export interface PokemonType {
  slot: number
  type: NamedApiResource
}

export interface NamedApiResource {
  name: string
  url: string
}

export interface PokemonSprite {
  front_default: string
}
