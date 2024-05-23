import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, delay, finalize } from 'rxjs';
import { EndpointConstant } from 'src/app/common/constant/endpoint.constant';
import { BaseResponsePokemon, BaseResponse } from './pokemon.model';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}
  private catchPokemons: Array<BaseResponsePokemon> = [];
  private AllPokemon: Array<any> = [];

  private loading$: Subject<boolean> = new Subject();

  get pokemons(): Array<any> {
    return this.AllPokemon;
  }

  get catchedPokemons(): Array<BaseResponsePokemon> {
    return this.catchPokemons;
  }

  get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  fetch(offset: number, limit: number): Observable<BaseResponse> {
    this.loading$.next(true);

    const url = `${EndpointConstant.POKEMON_URL}${EndpointConstant.FETCH_POKEMON}?offset=${offset}&limit=${limit}`;

    return this.http.get<BaseResponse>(url).pipe(
      delay(500),
      finalize(() => {
        this.loading$.next(false);
      })
    );
  }

  fetchDetailPokemon(url: string): Observable<BaseResponsePokemon> {
    return this.http.get<BaseResponsePokemon>(url);
  }

  catchPokemon(id: number) {
    const url = `${EndpointConstant.POKEMON_URL}${EndpointConstant.FETCH_POKEMON}${id}`;
    return this.http.get(url);
  }
}
