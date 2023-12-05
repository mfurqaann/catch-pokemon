import { Component, OnInit } from '@angular/core';
import { PokemonService } from './shared/pokemon.service';
import { Pokemon } from './shared/pokemon.model';
import { PokemonDetail } from './shared/pokemon-detail.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemons: Array<any> = [];
  pokemonDetail: Array<PokemonDetail> = [];
  loading: boolean = false;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon() {
    this.loading = true;
    this.pokemonService.fetch().subscribe((pokemons) => {
      for (let pokemon of pokemons) {
        this.pokemonService
          .fetchImage(pokemon.url)
          .subscribe((responseData: any) => {
            this.pokemonDetail.push({
              name: responseData.name,
              imageUrl: responseData.sprites.front_default,
              id: responseData.id,
            });
            this.pokemonDetail.sort((a, b) => a.id - b.id);
          });
      }
    });
    this.loading = false;
  }
}
