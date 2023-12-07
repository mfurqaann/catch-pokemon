import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PokemonComponent } from './pokemon.component';
import { PokemonService } from './shared/pokemon.service';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonDetailService } from './shared/pokemon-detail.service';

@NgModule({
  declarations: [
    PokemonComponent,
    PokemonItemComponent,
    PokemonDetailComponent,
  ],
  imports: [CommonModule, AppRoutingModule, MatSidenavModule],
  providers: [PokemonService, PokemonDetailService],
})
export class PokemonModule {}
