import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PokemonDetailService } from '../shared/pokemon-detail.service';
import { Move, PokemonDetail } from '../shared/pokemon-detail.model';
import { Subscription } from 'rxjs';
import { PokemonService } from '../shared/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  id: number = 0;
  loading: boolean = false;
  showFiller: boolean = false;
  pokemonDetail: PokemonDetail = null;
  pokemonMoves = [];
  pokemonSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private pokemonDetailService: PokemonDetailService,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemonDetailService.loading$.subscribe((value) => {
      this.loading = value;
    });
    this.route.params.subscribe((params: Params) => {
      if (+params['id']) {
        this.id = +params['id'];
      } else {
        this.router.navigateByUrl('not-found');
      }

      this.fetchDetailPokemon(this.id);
    });
  }

  ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe();
  }

  get myPokemonCount(): number {
    return this.pokemonService.catchedPokemons.length;
  }

  goToMyPokemon() {
    this.router.navigateByUrl('my-pokemon');
  }

  onPreviousClick(id: number) {
    const idPokemon = id - 1;
    this.router.navigateByUrl(`/all-pokemon/${idPokemon}`);
  }

  onNextClick(id: number) {
    const idPokemon = id + 1;
    this.router.navigateByUrl(`/all-pokemon/${idPokemon}`);
  }

  onCatchPokemon(id: number) {
    const catchedPokemons = this.pokemonService.catchedPokemons;

    this.pokemonService.catchPokemon(id).subscribe((response: any) => {
      const isDuplicate = this.isDuplicate(catchedPokemons, response);
      if (!isDuplicate) {
        this.pokemonService.catchedPokemons.push(response);
      }
    });
  }

  isDuplicate(catchedPokemons: any, response: any) {
    return catchedPokemons.some((item: any) => item.id === response.id);
  }

  private fetchDetailPokemon(id: number) {
    this.pokemonSubscription = this.pokemonDetailService
      .fetchDetail(id)
      .subscribe((detailPokemon: any) => {
        this.getPokemonDetail(detailPokemon);
      });
  }

  private getPokemonDetail(detailPokemon) {
    if (!detailPokemon) {
      return;
    }
    this.pokemonDetail = {
      name: detailPokemon?.name,
      imageUrl: detailPokemon?.sprites.other.dream_world.front_default,
      id: detailPokemon?.id,
      height: detailPokemon.height,
      weight: detailPokemon.weight,
      type: detailPokemon.types[0].type.name,
      moves: detailPokemon.moves
        .slice(0, 5)
        .map((value: { move: Move }) => value.move),
    };
    this.fetchMove();
  }

  private fetchMove() {
    this.pokemonMoves = [];

    this.pokemonDetail.moves.map((move) => {
      this.pokemonDetailService.fetchMove(move.url).subscribe((move) => {
        this.pokemonMoves.push(move);
      });
    });
  }
}
