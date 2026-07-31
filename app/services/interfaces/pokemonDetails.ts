export interface PokemonDetails {
  id: number
  name: string
  sprites: PokemonSprite
  types: PokemonType[]
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
