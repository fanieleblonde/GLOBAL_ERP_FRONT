import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'
  ],
})
export class AppComponent {
  title = 'my-appli';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en')
  }

}
