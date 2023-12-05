export class PokemonDetail {
  name: string;
  imageUrl: string;
  id: number;

  constructor(name: string, imageUrl: string, id: number) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.id = id;
  }
}
