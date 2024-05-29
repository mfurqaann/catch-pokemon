import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

export const featureName = 'pokemonDetail';

export interface AppStateDetail {
  selectedPokemon: any;
  loading: boolean;
  error: Error;
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
    props<{ payload: { detailPokemon: any } }>()
  ),
  fetchDetailFailed: createAction(
    `[${featureName} FETCH_DETAIL_FAILED]`,
    props<{ payload: { error: Error } }>()
  ),
};

export const pokemonDetailReducer = createReducer(
  initialState,
  on(actions.fetchDetailActions, (state) => ({ ...state, loading: true })),
  on(actions.fetchDetailSuccess, (state, payload) => ({
    ...state,
    loading: false,
    selectedPokemon: payload,
  })),
  on(actions.fetchDetailFailed, (state, { payload }) => ({
    ...state,
    error: payload.error,
  }))
);

export function reducer(state: AppStateDetail, action: Action) {
  return pokemonDetailReducer(state, action);
}

export const getState = createFeatureSelector<AppStateDetail>(featureName);
const getStateBy = (fn: (_: AppStateDetail) => any) =>
  createSelector(getState, fn);

export const getPokemonDetail = getStateBy((state) => state.selectedPokemon);
