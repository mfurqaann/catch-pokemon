import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/pokemon.service';
import { BaseResponsePokemon } from '../shared/pokemon.model';

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.component.html',
  styleUrls: ['./my-pokemon.component.scss'],
})
export class MyPokemonComponent implements OnInit {
  catchedPokemons: Array<BaseResponsePokemon> = [];
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.onMyPokemon();
  }

  get myPokemonCount(): number {
    return this.pokemonService.catchedPokemons.length;
  }

  get isThereCollectionPokemon(): boolean {
    if (this.myPokemonCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  private onMyPokemon() {
    this.pokemonService.catchedPokemons.map(
      (catchedPokemon: BaseResponsePokemon) => {
        this.catchedPokemons.push({
          id: catchedPokemon.id,
          name: catchedPokemon.name,
          sprites: catchedPokemon.sprites,
        });
      }
    );
  }
}
