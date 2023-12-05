import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EndpointConstant } from 'src/app/common/constant/endpoint.constant';
import { Pokemon } from './pokemon.model';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<any> {
    return this.http.get(EndpointConstant.POKEMON_URL).pipe(
      map((responseData: any) => {
        const entities = responseData.results;
        return entities;
      })
    );
  }
}
