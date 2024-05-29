import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { StoreModule } from '@ngrx/store';

import { PokemonComponent } from './pokemon.component';
import { PokemonService } from './shared/pokemon.service';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonDetailService } from './shared/pokemon-detail.service';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { MyPokemonComponent } from './my-pokemon/my-pokemon.component';
import * as fromPokemon from '../pokemon/shared/pokemon.reducer';
import * as fromPokemonDetail from '../pokemon/shared/pokemon-detail.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffect } from './shared/pokemon.effect';
import { PokemonDetailEffect } from './shared/pokemon-detail.effect';

@NgModule({
  declarations: [
    PokemonComponent,
    PokemonItemComponent,
    PokemonDetailComponent,
    MyPokemonComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatSidenavModule,
    MaterialUIModule,
    StoreModule.forFeature(fromPokemon.featureName, fromPokemon.reducer),
    StoreModule.forFeature(
      fromPokemonDetail.featureName,
      fromPokemonDetail.reducer
    ),
    EffectsModule.forFeature([PokemonEffect, PokemonDetailEffect]),
  ],
  providers: [PokemonService, PokemonDetailService],
})
export class PokemonModule {}
