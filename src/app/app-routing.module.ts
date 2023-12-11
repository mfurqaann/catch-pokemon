import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';
import { MyPokemonComponent } from './pokemon/my-pokemon/my-pokemon.component';

const routes: Routes = [
  { path: '', redirectTo: '/all-pokemon', pathMatch: 'full' },
  {
    path: 'all-pokemon',
    component: PokemonComponent,
  },
  { path: 'all-pokemon/:id', component: PokemonDetailComponent },
  { path: 'my-pokemon', component: MyPokemonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
