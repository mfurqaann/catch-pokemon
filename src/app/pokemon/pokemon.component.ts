import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { PokemonService } from './shared/pokemon.service';
import { BaseResponse, BaseResponsePokemon } from './shared/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemons: Array<BaseResponsePokemon> = [];
  loading = false;
  fetchSubscription = new Subscription();
  previous: string;
  next: string;
  pagination: { offset: number; limit: number } = { offset: 0, limit: 0 };
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.loading.subscribe((value) => {
      this.loading = value;

      console.log(value);
    });
    this.loadPokemon(this.pagination.offset, this.pagination.limit);
  }

  ngOnDestroy(): void {
    this.fetchSubscription.unsubscribe();
  }

  get isLastPage() {
    return this.next === null;
  }

  get isFirstPage() {
    return this.previous === null;
  }

  updatePagination(offset: number, limit: number): void {
    this.pagination = {
      offset: this.pagination.offset + offset,
      limit: this.pagination.limit + limit,
    };
    this.loadPokemon(this.pagination.offset, this.pagination.limit);
  }

  nextPage() {
    this.updatePagination(20, 20);
  }

  previousPage() {
    this.updatePagination(-20, -20);
  }

  loadPokemon(offset: number, limit: number) {
    this.pokemons = [];
    this.fetchSubscription = this.pokemonService
      .fetch(offset, limit)
      .subscribe((responseCollection: BaseResponse) => {
        this.next = responseCollection.next;
        this.previous = responseCollection.previous;

        for (const response of responseCollection.results) {
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
          types: baseResponsePokemon.types[0].type.name,
        });
        this.pokemons.sort((a, b) => a.id - b.id);
      });
  }
}
