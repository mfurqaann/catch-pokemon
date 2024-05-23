import { Injectable } from '@angular/core';

import {
  Observable,
  catchError,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
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
                payload: response,
              })
            )
          );
      }),
      catchError((error: Error) => [
        fromPokemon.actions.fetchActionFailure({ payload: { error } }),
      ])
    );
  });

  fetchPokemons$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPokemon.actions.fetchActionSuccess),
      withLatestFrom(
        this.store.pipe(select(fromPokemon.getBasePokemon)),
        (action: Action, basePokemon: BaseResponse) => ({
          basePokemon,
        })
      ),
      switchMap(({ basePokemon }) => {
        const observables = basePokemon.results.map(
          (basePokemon: PokemonResults) => {
            return this.service.fetchDetailPokemon(basePokemon.url).pipe(
              map((pokemonResponse: BaseResponsePokemon) => {
                const pokemon = {
                  id: pokemonResponse.id,
                  name: pokemonResponse.name,
                  sprites: pokemonResponse.sprites.front_default,
                  types: pokemonResponse.types[0].type.name,
                };

                return pokemon;
              })
            );
          }
        );
        console.log(observables);
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
