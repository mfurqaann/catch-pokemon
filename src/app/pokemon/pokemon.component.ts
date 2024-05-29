import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseResponse, BaseResponsePokemon } from './shared/pokemon.model';
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
  basePokemon$: Observable<BaseResponse>;

  pagination: { offset: number; limit: number } = { offset: 0, limit: 0 };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initStoreStreams();
    this.store.dispatch(actions.fetchAction({ payload: this.pagination }));
  }

  get page(): Observable<BaseResponse> {
    return this.basePokemon$;
  }

  onNextPage() {
    this.pagination = {
      offset: this.pagination.offset + 20,
      limit: 20,
    };
    const newPagination = this.pagination;

    this.store.dispatch(actions.fetchAction({ payload: newPagination }));
  }

  private initStoreStreams() {
    this.pokemons$ = this.store.pipe(select(fromPokemon.getPokemons));
    this.loading$ = this.store.pipe(select(fromPokemon.getLoading));
    this.basePokemon$ = this.store.pipe(select(fromPokemon.getBasePokemon));
  }
}
