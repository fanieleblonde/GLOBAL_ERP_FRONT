
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/authconfig.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NgSelectModule} from "@ng-select/ng-select";
import { SkillTypeComponent } from './others/skill-type/skill-type.component';
import { SkillTypeAddEditComponent } from './others/skill-type/skill-type-add-edit/skill-type-add-edit.component';
import { SkillComponent } from './others/skill/skill.component';
import { SkillAddEditComponent } from './others/skill/skill-add-edit/skill-add-edit.component';
import { DepartureReasonComponent } from './others/departure-reason/departure-reason.component';
import { DepartureReasonAddEditComponent } from './others/departure-reason/departure-reason-add-edit/departure-reason-add-edit.component';
import { EmploymentTypeComponent } from './others/employment-type/employment-type.component';
import { EmploymentTypeAddEditComponent } from './others/employment-type/employment-type-add-edit/employment-type-add-edit.component';
import { JobPositionComponent } from './others/job-position/job-position.component';
import { JobPositionAddEditComponent } from './others/job-position/job-position-add-edit/job-position-add-edit.component';
import { WorkLocationComponent } from './others/work-location/work-location.component';
import { WorkLocationAddEditComponent } from './others/work-location/work-location-add-edit/work-location-add-edit.component';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import { ApplicationSourceComponent } from './others/application-source/application-source.component';
import { ApplicationSourceAddEditComponent } from './others/application-source/application-source-add-edit/application-source-add-edit.component';
import { DegreeComponent } from './others/degree/degree.component';
import { DegreeAddEditComponent } from './others/degree/degree-add-edit/degree-add-edit.component';
import { DepartmentComponent } from './others/department/department.component';
import { DepartmentAddEditComponent } from './others/department/department-add-edit/department-add-edit.component';
import { JobLocationComponent } from './others/job-location/job-location.component';
import { JobLocationAddEditComponent } from './others/job-location/job-location-add-edit/job-location-add-edit.component';
import { RankComponent } from './others/rank/rank.component';
import { RankAddEditComponent } from './others/rank/rank-add-edit/rank-add-edit.component';
import { TagComponent } from './others/tag/tag.component';
import { TagAddEditComponent } from './others/tag/tag-add-edit/tag-add-edit.component';
import { ContractTemplateComponent } from './others/contract-template/contract-template.component';
import { ContractTemplateAddEditComponent } from './others/contract-template/contract-template-add-edit/contract-template-add-edit.component';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NopageFoundComponent,
    SkillTypeComponent,
    SkillTypeAddEditComponent,
    SkillComponent,
    SkillAddEditComponent,
    DepartureReasonComponent,
    DepartureReasonAddEditComponent,
    EmploymentTypeComponent,
    EmploymentTypeAddEditComponent,
    JobPositionComponent,
    JobPositionAddEditComponent,
    WorkLocationComponent,
    WorkLocationAddEditComponent,
    ApplicationSourceComponent,
    ApplicationSourceAddEditComponent,
    DegreeComponent,
    DegreeAddEditComponent,
    DepartmentComponent,
    DepartmentAddEditComponent,
    JobLocationComponent,
    JobLocationAddEditComponent,
    RankComponent,
    RankAddEditComponent,
    TagComponent,
    TagAddEditComponent,
    ContractTemplateComponent,
    ContractTemplateAddEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    PagesModule,
    SharedModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

