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
  damage_relations: DamageRelations
}

export interface DamageRelations {
  double_damage_from: NamedApiResource[]
  half_damage_from: NamedApiResource[]
  no_damage_from: NamedApiResource[]
}

export interface NamedApiResource {
  name: string
  url: string
}

export interface PokemonSprite {
  front_default: string
}
