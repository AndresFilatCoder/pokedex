import type { NamedApiResource } from './pokemonDetails'

export interface GameIndex {
  game_index: number
  generation: NamedApiResource
}

export interface LocalizedName {
  language: NamedApiResource
  name: string
}

export interface PokemonTypeDamageRelations {
  double_damage_from: NamedApiResource[]
  double_damage_to: NamedApiResource[]
  half_damage_from: NamedApiResource[]
  half_damage_to: NamedApiResource[]
  no_damage_from: NamedApiResource[]
  no_damage_to: NamedApiResource[]
}

export interface PastDamageRelation {
  damage_relations: PokemonTypeDamageRelations
  generation: NamedApiResource
}

export interface PokemonTypeEntry {
  pokemon: NamedApiResource
  slot: number
}

export interface TypeSprite {
  name_icon: string
  symbol_icon: string | null
}

export interface PokemonTypeSprites {
  'generation-iii': {
    colosseum: TypeSprite
    emerald: TypeSprite
    'firered-leafgreen': TypeSprite
    'ruby-sapphire': TypeSprite
    xd: TypeSprite
  }
  'generation-iv': {
    'diamond-pearl': TypeSprite
    'heartgold-soulsilver': TypeSprite
    platinum: TypeSprite
  }
  'generation-v': {
    'black-2-white-2': TypeSprite
    'black-white': TypeSprite
  }
  'generation-vi': {
    'omega-ruby-alpha-sapphire': TypeSprite
    'x-y': TypeSprite
  }
  'generation-vii': {
    'lets-go-pikachu-lets-go-eevee': TypeSprite
    'sun-moon': TypeSprite
    'ultra-sun-ultra-moon': TypeSprite
  }
  'generation-viii': {
    'brilliant-diamond-shining-pearl': TypeSprite
    'legends-arceus': TypeSprite
    'sword-shield': TypeSprite
  }
  'generation-ix': {
    'scarlet-violet': TypeSprite
  }
}

export interface PokemonType {
  id: number
  name: string

  damage_relations: PokemonTypeDamageRelations
  past_damage_relations: PastDamageRelation[]

  game_indices: GameIndex[]
  generation: NamedApiResource

  move_damage_class: NamedApiResource
  moves: NamedApiResource[]

  names: LocalizedName[]

  pokemon: PokemonTypeEntry[]

  sprites: PokemonTypeSprites
}
