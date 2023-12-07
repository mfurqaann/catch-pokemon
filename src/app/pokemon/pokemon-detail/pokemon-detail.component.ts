import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PokemonDetailService } from '../shared/pokemon-detail.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  id: number = 0;
  showFiller: boolean = false;
  name: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonDetailService: PokemonDetailService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.fetchDetailPokemon();
    });
  }

  private fetchDetailPokemon() {
    this.pokemonDetailService
      .fetchDetail(this.id)
      .subscribe((detailPokemon: any) => {
        this.name = detailPokemon.name;
      });
  }
}
