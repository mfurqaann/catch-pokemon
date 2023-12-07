import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, mergeMap, tap } from 'rxjs';
import { EndpointConstant } from 'src/app/common/constant/endpoint.constant';
import { Pokemon } from './pokemon.model';

@Injectable()
export class PokemonService {
  pokemonSubject = new Subject();
  constructor(private http: HttpClient) {}

  fetch(): Observable<Array<Pokemon>> {
    return this.http.get<Array<Pokemon>>(EndpointConstant.POKEMON_URL).pipe(
      map((responseData: any) => {
        return responseData;
      })
    );
  }

  fetchDetail(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map((responseData: any) => {
        return responseData;
      })
    );
  }
}
