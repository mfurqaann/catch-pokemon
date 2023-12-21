import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import * as fromPokemon from '../shared/pokemon.reducer';
import { PokemonService } from './pokemon.service';
import {
  BaseResponse,
  BaseResponsePokemon,
  PokemonResults,
} from './pokemon.model';
import { AppState } from 'src/app/app.reducer';
import { Observable, forkJoin, map, switchMap, withLatestFrom } from 'rxjs';

@Injectable()
export class PokemonEffect {
  fetch$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPokemon.actions.fetchAction),
      switchMap((action) => {
        return this.service
          .fetch(action.payload.offset, action.payload.limit)
          .pipe(
            map((response: BaseResponse) =>
              fromPokemon.actions.fetchActionSuccess({
                payload: response.results,
              })
            )
          );
      })
    );
  });

  fetchPokemons$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        fromPokemon.actions.fetchPokemonsAction,
        fromPokemon.actions.fetchActionSuccess
      ),
      withLatestFrom(
        this.store.pipe(select(fromPokemon.getBasePokemons)),
        (action: Action, basePokemons: Array<PokemonResults>) => ({
          basePokemons,
        })
      ),
      switchMap(({ basePokemons }) => {
        const observables = basePokemons.map((basePokemon: PokemonResults) => {
          return this.service.fetchPokemon(basePokemon.url).pipe(
            map((pokemonResponse: BaseResponsePokemon) => {
              let pokemons = [];

              const pokemon = {
                id: pokemonResponse.id,
                name: pokemonResponse.name,
                sprites: pokemonResponse.sprites.front_default,
                types: pokemonResponse.types[0].type.name,
              };

              pokemons.push(pokemon);
              pokemons.sort((a, b) => a.id - b.id);

              return pokemon;
            })
          );
        });

        // Use forkJoin to wait for all observables to complete
        return forkJoin(observables).pipe(
          map((pokemons: Array<any>) => {
            return fromPokemon.actions.fetchPokemonsSuccessAction({
              payload: pokemons,
            });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private service: PokemonService,
    private store: Store<AppState>
  ) {}
}
