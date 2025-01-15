import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuConstant } from '../common/constant/menu.constant';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseResponse, PokemonItem } from '../pokemon/shared/pokemon.model';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PokemonService } from '../pokemon/shared/pokemon.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  myControl = new FormControl('');
  options: Array<string> = []
  filteredOptions: Observable<Array<string>>;
  allPokemon: any;
  readonly constant = {
    menu: MenuConstant,
  };

  @ViewChild('autoInput') autoComplete: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private http: HttpClient,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.getPokemon();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(value => this._filter(value || ''))
    )
  }

  private _filter(value: string): Array<string>{
    const filterValue = value.toLowerCase();
    return this.options?.filter(option => option.toLowerCase().includes(filterValue));
  }

  optionSelected(e: MatAutocompleteSelectedEvent, ele: HTMLInputElement) {
    this.pokemonService.getPokemonbyName(e.option.value).subscribe((val: PokemonItem) => {
      this.router.navigateByUrl(`/all-pokemon/${val.id}`);
    })
    ele.value = '';
    this.autoComplete.nativeElement.blur();
  }

  getPokemon() {
    this.pokemonService.getAllPokemon().subscribe((allPokemon: BaseResponse) => {
      allPokemon.results.map((pokemon) => {
        this.options.push(pokemon?.name)
      })
    })
  }

  onRandomPokemon() {
    const randomNumber = Math.floor(Math.random() * 101);
    this.router.navigateByUrl(`/all-pokemon/${randomNumber}`);
  }

  onSwitchLanguage() {
    let currentLang = this.translateService.currentLang;

    if (!currentLang) {
      currentLang = localStorage.getItem('language') || 'en';
    }

    if (currentLang === 'id') {
      this.translateService.use('en');
      localStorage.setItem('language', 'en');
    } else if (currentLang === 'en') {
      this.translateService.use('id');
      localStorage.setItem('language', 'id');
    }
  }
}
