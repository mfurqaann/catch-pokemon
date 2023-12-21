import { Component, Input, OnInit } from '@angular/core';
import { BaseResponsePokemon } from '../shared/pokemon.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon: BaseResponsePokemon;
  @Input() index: number;
  ngOnInit(): void {}
}
