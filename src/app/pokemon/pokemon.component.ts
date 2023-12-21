import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseResponsePokemon } from './shared/pokemon.model';
import { Store, select } from '@ngrx/store';
import { actions } from './shared/pokemon.reducer';
import { AppState } from '../app.reducer';
import * as fromPokemon from './shared/pokemon.reducer';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemons$: Observable<Array<BaseResponsePokemon>>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initStoreStreams();
    this.store.dispatch(
      actions.fetchAction({ payload: { offset: 0, limit: 0 } })
    );
    this.store.dispatch(actions.fetchPokemonsAction());
  }

  private initStoreStreams() {
    this.pokemons$ = this.store.pipe(select(fromPokemon.getPokemons));
    this.loading$ = this.store.pipe(select(fromPokemon.getLoading));
  }
}
