import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from './shared/pokemon.service';
import { PokemonDetail } from './shared/pokemon-detail.model';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemonDetails: Array<PokemonDetail> = [];
  loading: boolean = false;
  fetchSubscription = new Subscription();
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon() {
    this.fetchSubscription = this.pokemonService
      .fetch()
      .subscribe((responseCollection: any) => {
        for (let response of responseCollection.results) {
          this.fetchDetail(response.url);
        }
      });
  }

  fetchDetail(url: string) {
    this.pokemonService.fetchDetail(url).subscribe((detailResponse: any) => {
      this.pokemonDetails.push({
        id: detailResponse.id,
        name: detailResponse.name,
        imageUrl: detailResponse.sprites.front_default,
        abilities: detailResponse.abilities,
      });
      this.pokemonDetails.sort((a, b) => a.id - b.id);
    });
  }

  ngOnDestroy(): void {
    this.fetchSubscription.unsubscribe();
  }
}
