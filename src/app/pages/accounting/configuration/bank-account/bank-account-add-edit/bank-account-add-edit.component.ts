import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import { BankaccountService } from 'src/app/pages/school/services/bankaccount.service';
import { CoreService } from 'src/app/core/core.service';
import { BankService } from 'src/app/pages/school/services/bank.service';

@Component({
  selector: 'app-bank-account-add-edit',
  templateUrl: './bank-account-add-edit.component.html',
  styleUrls: ['./bank-account-add-edit.component.scss']
})
export class BankAccountAddEditComponent {
  bankaccountForm : FormGroup;
  bankList: any[] = [];
  bankListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _bankaccountService: BankaccountService,
              private _dialogRef: MdbModalRef<BankAccountAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private bankService: BankService
  )
  {
    this.bankaccountForm = this._fb.group({
      bank: '',
      number: '',
    })

  }

  ngOnInit() : void{
    this.bankaccountForm.patchValue(this.data);
    this.getBankList();

    if (!this.data){
      this.getBankList();
    }
    else {
      this.bankListSelect = this.data.bank['@id'];
    }
  }

  get fc(){
    return this.bankaccountForm.controls;
  }



  onFormSubmit(){
    this.isSubmitted = true;
    if (this.bankaccountForm.valid){
      this.saving = true;
      if (this.data){
        this._bankaccountService.edit(this.data.id, this.bankaccountForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Bank Account edit with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            let errors: any[] = err['error']['violations'];

            errors.forEach((v) =>
            {
              if (v.propertyPath === this.bankaccountForm.get('name')){
                this.bankaccountForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._bankaccountService.create(this.bankaccountForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Bank Account add with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            let errors: any[] = err['error']['violations'];

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'name'){
                this.bankaccountForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

  getBankList(){
    this.bankService.getBankList().subscribe((data:any)=> {
        this.bankList = data['hydra:member'];
        this.bankList = this.bankList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
