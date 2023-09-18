import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router, private translate: TranslateService) {
  }

  //public jams = this.translate.getDefaultLang();
  public currentLang = this.translate.currentLang;

  onLanguageChange(event: any) {
    this.translate.use(event.target.value);
    console.log(event.target.value);
  }

  useLanguage(language:string){
    this.translate.use(language);
    this.currentLang = language;
  }

  logout() {
    this.authService.doLogout()
  }

  goToPage() {
    this.router.navigate(['/login']);
  }
}
