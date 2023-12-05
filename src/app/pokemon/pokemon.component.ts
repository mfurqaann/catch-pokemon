import { Component, OnInit } from '@angular/core';
import { PokemonService } from './shared/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemon: Array<any> = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.fetch().subscribe((pokemons) => {
      this.pokemon = pokemons;
    });
  }
}
