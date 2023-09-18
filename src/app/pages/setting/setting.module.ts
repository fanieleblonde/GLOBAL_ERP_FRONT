import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { MinistryComponent } from './institution/ministry/ministry.component';
import { MinistryAddEditComponent } from './institution/ministry/ministry-add-edit/ministry-add-edit.component';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatusComponent } from './school/status/status.component';
import { StatusAddEditComponent } from './school/status/status-add-edit/status-add-edit.component';
import { DiplomaTypeComponent } from './school/diploma-type/diploma-type.component';
import { DiplomaTypeAddEditComponent } from './school/diploma-type/diploma-type-add-edit/diploma-type-add-edit.component';
import { CountryComponent } from './location/country/country.component';
import { CountryAddEditComponent } from './location/country/country-add-edit/country-add-edit.component';
import { ManagerTypeComponent } from './institution/manager-type/manager-type.component';
import { ManagerTypeAddEditComponent } from './institution/manager-type/manager-type-add-edit/manager-type-add-edit.component';


@NgModule({
  declarations: [
    MinistryComponent,
    MinistryAddEditComponent,
    StatusComponent,
    StatusAddEditComponent,
    DiplomaTypeComponent,
    DiplomaTypeAddEditComponent,
    CountryComponent,
    CountryAddEditComponent,
    ManagerTypeComponent,
    ManagerTypeAddEditComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    NgSelectModule
  ]
})
export class SettingModule { }
