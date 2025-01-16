import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/pokemon.service';
import { BaseResponsePokemon } from '../shared/pokemon.model';
import { Store, select } from '@ngrx/store';
import * as fromPokemonDetail from '../shared/pokemon-detail.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.component.html',
  styleUrls: ['./my-pokemon.component.scss'],
})
export class MyPokemonComponent implements OnInit {
  catchedPokemons: Array<BaseResponsePokemon> = [];
  catchedPokemons$: Observable<Array<BaseResponsePokemon>>;
  constructor(private pokemonService: PokemonService, private store: Store) {}

  ngOnInit(): void {
    this.onMyPokemon();
    this.initStoreStreams();
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
          types: catchedPokemon.types[0].type.name,
        });
      }
    );
  }

  private initStoreStreams() {
    this.catchedPokemons$ = this.store.pipe(
      select(fromPokemonDetail.getCatchedPokemons)
    );
  }
}
