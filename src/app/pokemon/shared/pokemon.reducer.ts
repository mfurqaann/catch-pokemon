import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { BaseResponsePokemon, PokemonResults } from './pokemon.model';

export const featureName = 'pokemon';

export interface AppState {
  basePokemons: Array<PokemonResults>;
  pokemons: Array<BaseResponsePokemon>;
  loading: boolean;
  next: string;
  previous: string;
  pagination: { offset: number; limit: number };
}

export const initialState: AppState = {
  basePokemons: [],
  pokemons: [],
  loading: false,
  next: '',
  previous: '',
  pagination: { offset: 0, limit: 0 },
};

export const actions = {
  fetchAction: createAction(
    `[${featureName}] FETCH_BASE`,
    props<{ payload: { offset: number; limit: number } }>()
  ),
  fetchActionSuccess: createAction(
    `[${featureName}] FETCH_BASE_SUCCESS`,
    props<{ payload: Array<PokemonResults> }>()
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
    loading: false,
    basePokemons: payload,
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

export const getBasePokemons = getStateBy((state) => state.basePokemons);
export const getPokemons = getStateBy((state) => state.pokemons);
export const getPagination = getStateBy((state) => state.pagination);
export const getLoading = getStateBy((state) => state.loading);
