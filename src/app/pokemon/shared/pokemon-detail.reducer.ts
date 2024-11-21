import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { Move, PokemonDetail } from './pokemon-detail.model';

export const featureName = 'pokemonDetail';

export interface AppStateDetail {
  selectedPokemon: PokemonDetail;
  loading: boolean;
  error: string;
}

export const initialState: AppStateDetail = {
  selectedPokemon: null,
  loading: false,
  error: null,
};

export const actions = {
  fetchDetailActions: createAction(
    `[${featureName} FETCH_DETAIL]`,
    props<{ payload: { id: number } }>()
  ),
  fetchDetailSuccess: createAction(
    `[${featureName} FETCH_DETAIL_SUCCESS]`,
    props<{ payload: any }>()
  ),
  fetchDetailFailed: createAction(
    `[${featureName} FETCH_DETAIL_FAILED]`,
    props<{ payload: { error: string } }>()
  ),
  fetchMoves: createAction(`[${featureName} FETCH_MOVES]`),
  fetchMovesSuccess: createAction(
    `[${featureName} FETCH_MOVES_SUCCESS]`,
    props<{ payload: { moves: any } }>()
  ),
  fetchMovesFailed: createAction(
    `[${featureName} FETCH_MOVES_FAILED]`,
    props<{ payload: any }>()
  ),
  onCatchPokemon: createAction(
    `[${featureName} CATCH_POKEMON]`,
    props<{ payload: { id: any } }>()
  ),
  onCatchPokemonSuccess: createAction(
    `[${featureName} CATCH_POKEMON_SUCCESS]`,
    props<{ payload: any }>()
  ),
};

export const pokemonDetailReducer = createReducer(
  initialState,
  on(actions.fetchDetailActions, (state) => ({ ...state, loading: true })),
  on(actions.fetchDetailSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    selectedPokemon: {
      name: payload.name,
      imageUrl: payload.sprites.other.dream_world.front_default,
      id: payload.id,
      height: payload.height,
      weight: payload.weight,
      type: payload.types[0].type.name,
      moves: payload.moves
        .slice(0, 5)
        .map((value: { move: Move }) => value.move),
    },
  })),
  on(actions.fetchDetailFailed, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),
  on(actions.fetchMovesSuccess, (state, { payload }) => ({
    ...state,
    selectedPokemon: {
      ...state.selectedPokemon,
      moves: payload.moves,
    },
  })),
  on(actions.onCatchPokemonSuccess, (state, { payload }) => ({
    ...state,
  }))
);

export function reducer(state: AppStateDetail, action: Action) {
  return pokemonDetailReducer(state, action);
}

export const getState = createFeatureSelector<AppStateDetail>(featureName);
const getStateBy = (fn: (_: AppStateDetail) => any) =>
  createSelector(getState, fn);

export const getPokemonDetail = getStateBy((state) => state.selectedPokemon);
export const getMoves = getStateBy((state) => state.selectedPokemon?.moves);
export const getLoading = getStateBy((state) => state.loading);
