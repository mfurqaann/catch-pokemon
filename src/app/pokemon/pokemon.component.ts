import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs';

import { PokemonService } from './shared/pokemon.service';
import { BaseResponse, BaseResponsePokemon } from './shared/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemons: Array<BaseResponsePokemon> = [];
  loading: boolean = false;
  fetchSubscription = new Subscription();
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.loading.subscribe((value) => {
      this.loading = value;

      console.log(value);
    });
    this.loadPokemon();
  }

  ngOnDestroy(): void {
    this.fetchSubscription.unsubscribe();
  }

  loadPokemon() {
    this.fetchSubscription = this.pokemonService
      .fetch()
      .subscribe((responseCollection: BaseResponse) => {
        for (let response of responseCollection.results) {
          this.fetchPokemon(response.url);
        }
      });
  }

  fetchPokemon(url: string) {
    this.pokemonService
      .fetchPokemon(url)
      .subscribe((baseResponsePokemon: BaseResponsePokemon) => {
        this.pokemons.push({
          id: baseResponsePokemon.id,
          name: baseResponsePokemon.name,
          sprites: baseResponsePokemon.sprites,
        });
        this.pokemons.sort((a, b) => a.id - b.id);
      });
  }
}
