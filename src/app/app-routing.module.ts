import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/all-pokemon', pathMatch: 'full' },
  {
    path: 'all-pokemon',
    component: PokemonComponent,
    children: [{ path: ':id', component: PokemonDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
