import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, finalize } from 'rxjs';
import { EndpointConstant } from 'src/app/common/constant/endpoint.constant';

@Injectable()
export class PokemonDetailService {
  urlPokemon: string =
    EndpointConstant.POKEMON_URL + EndpointConstant.FETCH_POKEMON;

  loading$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {}

  // get loading(): Observable<boolean> {
  //   return this.loading$.asObservable();
  // }

  fetchDetail(id: number): Observable<any> {
    // this.loading$.next(true);
    return this.http.get(`${this.urlPokemon}${id}`);
  }

  fetchMove(url: string): Observable<any> {
    return this.http.get(url);
  }

  catchPokemon(id: number) {
    const url = `${EndpointConstant.POKEMON_URL}${EndpointConstant.FETCH_POKEMON}${id}`;
    return this.http.get(url);
  }
}
