import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { PokemonService } from './shared/pokemon.service';

@NgModule({
  declarations: [PokemonComponent],
  imports: [CommonModule],
  providers: [PokemonService],
})
export class PokemonModule {}
