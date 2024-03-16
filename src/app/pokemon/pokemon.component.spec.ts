import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { PokemonService } from './shared/pokemon.service';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { MyPokemonComponent } from './my-pokemon/my-pokemon.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {});
});
