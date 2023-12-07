import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EndpointConstant } from 'src/app/common/constant/endpoint.constant';

@Injectable()
export class PokemonDetailService {
  constructor(private http: HttpClient) {}

  fetchDetail(id: number) {
    return this.http.get(`${EndpointConstant.POKEMON_URL}${id}`).pipe(
      map((value) => {
        return value;
      })
    );
  }
}
