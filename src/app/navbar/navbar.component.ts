import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuConstant } from '../common/constant/menu.constant';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  readonly constant = {
    menu: MenuConstant,
  };

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {}

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
