import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolRoutingModule } from '../school/school-routing.module';
import { BankComponent } from './configuration/bank/bank.component';
import { BankAddEditComponent } from './configuration/bank/bank-add-edit/bank-add-edit.component';
import { BankAccountComponent } from './configuration/bank-account/bank-account.component';
import { BankAccountAddEditComponent } from './configuration/bank-account/bank-account-add-edit/bank-account-add-edit.component';
import { CashDeskComponent } from './configuration/cash-desk/cash-desk.component';
import { CashDeskAddEditComponent } from './configuration/cash-desk/cash-desk-add-edit/cash-desk-add-edit.component';



@NgModule({
  declarations: [
    BankComponent,
    BankAddEditComponent,
    BankAccountComponent,
    BankAccountAddEditComponent,
    CashDeskComponent,
    CashDeskAddEditComponent,
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
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
    NgSelectModule,
    MatRadioModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatListModule
  ]
})
export class AccountingModule { }
