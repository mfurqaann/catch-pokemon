import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onRandomPokemon() {
    const randomNumber = Math.floor(Math.random() * 101);
    this.router.navigateByUrl(`/all-pokemon/${randomNumber}`);
  }
}
