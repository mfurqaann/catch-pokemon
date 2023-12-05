import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { PokemonService } from './shared/pokemon.service';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [PokemonComponent, PokemonItemComponent],
  imports: [CommonModule, AppRoutingModule],
  providers: [PokemonService],
})
export class PokemonModule {}
