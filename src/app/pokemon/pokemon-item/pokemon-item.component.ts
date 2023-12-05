import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../shared/pokemon.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon: any | undefined;
  @Input() index: number | undefined;
  ngOnInit(): void {}
}
