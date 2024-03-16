import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, filter, map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'catch-pokemon';

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.defaultLanguage();
  }

  defaultLanguage() {
    const lang = localStorage.getItem('language');

    if (lang) {
      this.translateService.setDefaultLang(lang);
    } else {
      this.translateService.use('en');
    }
  }
}
