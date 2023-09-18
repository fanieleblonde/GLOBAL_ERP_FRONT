import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesRoutingModule, routingPagesComponents} from './pages-routing.module';
import {AdashboardComponent} from "./adashboard/adashboard.component";
import {EdashboardComponent} from "./edashboard/edashboard.component";
import { PagesComponent } from './pages.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ToastrModule} from "ngx-toastr";
import {TranslateModule} from "@ngx-translate/core";
import {ModuleComponent} from "./security/module/module.component";
import {MenuComponent} from "./security/menu/menu.component";
import {RoleComponent} from "./security/role/role.component";
import {SecurityModule} from "./security/security.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SchoolModule} from "./school/school.module";
import {SettingModule} from "./setting/setting.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AccountingModule} from "./accounting/accounting.module";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    PagesComponent,
    AdashboardComponent,
    EdashboardComponent,
    ModuleComponent,
    MenuComponent,
    RoleComponent,
    routingPagesComponents,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    SharedModule,
    SecurityModule,
    SchoolModule,
    AccountingModule,
    SettingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-bottom-right'
    }),
    TranslateModule,
    MatTooltipModule
  ]
})
export class PagesModule { }
