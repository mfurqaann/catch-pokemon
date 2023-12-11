export interface Move {
  name: string;
  url: string;
}

export class PokemonDetail {
  name: string;
  imageUrl: string;
  id: number;
  height: number;
  weight: number;
  type: any;

  moves: Array<Move>;
}
