export interface PokemonResults {
  name: string;
  url: string;
}

export class BaseResponsePokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
}

export class BaseResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<PokemonResults>;
}

export class PokemonItem {
  name: string;
  imageUrl: string;
  id: number;
}
