import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  Observable,
  catchError,
  combineLatest,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  toArray,
  withLatestFrom,
} from 'rxjs';

import * as fromPokemonDetail from '../shared/pokemon-detail.reducer';
import { PokemonDetailService } from './pokemon-detail.service';
import { Move, PokemonDetail } from './pokemon-detail.model';
import { AppState } from 'src/app/app.reducer';
import { BaseResponsePokemon } from './pokemon.model';

@Injectable()
export class PokemonDetailEffect {
  fetchDetail$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPokemonDetail.actions.fetchDetailActions),
      switchMap((action) => {
        return this.serviceDetail.fetchDetail(action.payload.id).pipe(
          switchMap((detailPokemon: PokemonDetail) =>
            from([
              fromPokemonDetail.actions.fetchDetailSuccess({
                payload: detailPokemon,
              }),
              fromPokemonDetail.actions.fetchMoves(),
            ])
          )
        );
      }),
      catchError((error) =>
        of(
          fromPokemonDetail.actions.fetchDetailFailed({
            payload: { error: error.message },
          })
        )
      )
    );
  });

  fetchMoves$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPokemonDetail.actions.fetchMoves),
      withLatestFrom(this.store.select(fromPokemonDetail.getMoves)),
      switchMap(([action, moves]) =>
        from(moves).pipe(
          mergeMap((move: Move) => this.serviceDetail.fetchMove(move.url)),
          toArray(), // Mengumpulkan hasil menjadi array
          map((movesDetails: Array<Move>) =>
            fromPokemonDetail.actions.fetchMovesSuccess({
              payload: { moves: movesDetails },
            })
          )
        )
      )
    );
  });

  // onCatchPokemon: Observable<Action> = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fromPokemonDetail.actions.onCatchPokemon),
  //     switchMap((action) => {
  //       return this.serviceDetail.catchPokemon(action.payload.id).pipe(
  //         switchMap((val: BaseResponsePokemon) => {
  //           return [
  //             fromPokemonDetail.actions.onCatchPokemonSuccess({
  //               payload: {
  //                 id: val.id,
  //                 name: val.name,
  //                 sprites: val.sprites,
  //                 types: val.types[0].type.name,
  //               },
  //             }),
  //           ];
  //         })
  //       );
  //     })
  //   );
  // });

  onCatchPokemon: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPokemonDetail.actions.onCatchPokemon),
      switchMap((action) =>
        this.serviceDetail.catchPokemon(action.payload.id).pipe(
          map((val: BaseResponsePokemon) =>
            fromPokemonDetail.actions.onCatchPokemonSuccess({
              payload: {
                id: val.id,
                name: val.name,
                sprites: val.sprites,
                types: val.types[0].type.name,
              },
            })
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private serviceDetail: PokemonDetailService,
    private store: Store<AppState>
  ) {}
}
