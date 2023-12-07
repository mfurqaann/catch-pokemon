export class PokemonDetail {
  name: string;
  imageUrl: string;
  id: number;
  abilities: Array<any>;

  constructor(
    name: string,
    imageUrl: string,
    id: number,
    abilities: Array<any>
  ) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.id = id;
    this.abilities = abilities;
  }
}
