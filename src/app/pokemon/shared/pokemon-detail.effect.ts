import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';

import * as fromPokemonDetail from '../shared/pokemon-detail.reducer';
import { PokemonDetailService } from './pokemon-detail.service';

@Injectable()
export class PokemonDetailEffect {
  fetchDetail$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPokemonDetail.actions.fetchDetailActions),
      switchMap((action) => {
        return this.serviceDetail.fetchDetail(action.payload.id).pipe(
          map((detailPokemon: any) =>
            fromPokemonDetail.actions.fetchDetailSuccess({
              payload: detailPokemon,
            })
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private serviceDetail: PokemonDetailService
  ) {}
}
