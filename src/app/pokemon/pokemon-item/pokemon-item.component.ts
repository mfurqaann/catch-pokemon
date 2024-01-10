import { Component, Input } from '@angular/core';
import { BaseResponsePokemon } from '../shared/pokemon.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent {
  @Input() pokemon: BaseResponsePokemon;
  @Input() index: number;
}
