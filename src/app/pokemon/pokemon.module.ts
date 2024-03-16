import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PokemonComponent } from './pokemon.component';
import { PokemonService } from './shared/pokemon.service';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonDetailService } from './shared/pokemon-detail.service';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { MyPokemonComponent } from './my-pokemon/my-pokemon.component';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
  ],
  providers: [PokemonService, PokemonDetailService],
})
export class PokemonModule {}
