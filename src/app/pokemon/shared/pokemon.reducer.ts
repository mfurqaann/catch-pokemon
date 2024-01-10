import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

import { BaseResponse, BaseResponsePokemon } from './pokemon.model';

export const featureName = 'pokemon';

export interface AppState {
  basePokemon: BaseResponse;
  pokemons: Array<BaseResponsePokemon>;
  loading: boolean;
}

export const initialState: AppState = {
  basePokemon: null,
  pokemons: [],
  loading: false,
};

export const actions = {
  fetchAction: createAction(
    `[${featureName}] FETCH_BASE`,
    props<{ payload: { offset: number; limit: number } }>()
  ),
  fetchActionSuccess: createAction(
    `[${featureName}] FETCH_BASE_SUCCESS`,
    props<{ payload: BaseResponse }>()
  ),
  fetchActionBaseResponseSuccess: createAction(
    `[${featureName} FETCH_BASE_RESPONSE_SUCCESS]`,
    props<{ payload: BaseResponse }>
  ),
  fetchActionFailure: createAction(
    `[${featureName}] ERROR`,
    props<{ payload: { error: Error } }>
  ),
  fetchPokemonsAction: createAction(`[${featureName}] FETCH_POKEMONS`),
  fetchPokemonsSuccessAction: createAction(
    `[${featureName}] FETCH_POKEMONS_SUCCESS`,
    props<{ payload: Array<BaseResponsePokemon> }>()
  ),
};

export const pokemonReducer = createReducer(
  initialState,
  on(actions.fetchAction, (state) => ({ ...state, loading: true })),
  on(actions.fetchActionSuccess, (state, { payload }) => ({
    ...state,
    loading: true,
    basePokemon: payload,
  })),
  on(actions.fetchPokemonsAction, (state) => ({
    ...state,
    loading: true,
  })),
  on(actions.fetchPokemonsSuccessAction, (state, { payload }) => ({
    ...state,
    loading: false,
    pokemons: payload,
  }))
);

export function reducer(state: AppState, action: Action) {
  return pokemonReducer(state, action);
}

export const getState = createFeatureSelector<AppState>(featureName);
const getStateBy = (fn: (_: AppState) => any) => createSelector(getState, fn);

export const getBasePokemon = getStateBy((state) => state.basePokemon);
export const getPokemons = getStateBy((state) => state.pokemons);
export const getLoading = getStateBy((state) => state.loading);
