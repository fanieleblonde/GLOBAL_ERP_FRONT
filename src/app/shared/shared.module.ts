import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from "@angular/router";
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import {TranslateModule} from "@ngx-translate/core";
import {ModalComponent} from "./modal/modal.component";
import {ModalWithoutFooterComponent} from "./modal-without-footer/modal-without-footer.component";

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    BreadcumbsComponent,
    ModalComponent,
    ModalWithoutFooterComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ModalComponent,
    ModalWithoutFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ]
})
export class SharedModule { }
