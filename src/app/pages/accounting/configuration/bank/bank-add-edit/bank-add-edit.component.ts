import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import {BankService} from "../../../../school/services/bank.service";
import {CoreService} from "../../../../../core/core.service";

@Component({
  selector: 'app-bank-add-edit',
  templateUrl: './bank-add-edit.component.html',
  styleUrls: ['./bank-add-edit.component.scss']
})
export class BankAddEditComponent {
  bankForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _bankService: BankService,
              private _dialogRef: MdbModalRef<BankAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.bankForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      company: '',
    })

  }

  ngOnInit() : void{
    this.bankForm.patchValue(this.data);
  }

  get fc(){
    return this.bankForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.bankForm.valid){
      this.saving = true;
      if (this.data){
        this._bankService.edit(this.data.id, this.bankForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Bank edit with success !', 'success')
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
              if (v.propertyPath === this.bankForm.get('name')){
                this.bankForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._bankService.create(this.bankForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Campus add with success !', 'success')
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
                this.bankForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
