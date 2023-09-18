import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import { SecurityComponent } from './security.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {ToastrModule} from "ngx-toastr";
import {SharedModule} from "../../shared/shared.module";
import {ModuleAddEditComponent} from "./module/module-add-edit/module-add-edit.component";
import {MenuAddEditComponent} from "./menu/menu-add-edit/menu-add-edit.component";
import {RoleAddEditComponent} from "./role/role-add-edit/role-add-edit.component";
import {TreeviewModule} from "@charmedme/ngx-treeview";
import {ProfileComponent} from "./profile/profile.component";
import { InstitutionComponent } from './institution/institution/institution.component';
import { InstitutionAddEditComponent } from './institution/institution/institution-add-edit/institution-add-edit.component';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    ModuleAddEditComponent,
    MenuAddEditComponent,
    RoleAddEditComponent,
    SecurityComponent,
    ProfileComponent,
    InstitutionComponent,
    InstitutionAddEditComponent,
  ],
  exports: [
    ProfileComponent,
  ],
    imports: [
        CommonModule,
        SecurityRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        TranslateModule,
        NgSelectModule,
        MatRadioModule,
        ToastrModule.forRoot(),
        SharedModule,
        TreeviewModule,
        MatCardModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule
    ],
})
export class SecurityModule { }
