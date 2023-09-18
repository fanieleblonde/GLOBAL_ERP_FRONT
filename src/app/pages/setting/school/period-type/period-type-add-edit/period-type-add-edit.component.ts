import { Component } from '@angular/core';
import {FormBuilder, FormGroup,ReactiveFormsModule , Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {PeriodTypeService} from "../../../../school/services/period-type.service";

@Component({
  selector: 'app-period-type-add-edit',
  templateUrl: './period-type-add-edit.component.html',
  styleUrls: ['./period-type-add-edit.component.scss']
})
export class PeriodTypeAddEditComponent {
  periodtypeForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _periodtypeService: PeriodTypeService,
              private _dialogRef: MdbModalRef<PeriodTypeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.periodtypeForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.periodtypeForm.patchValue(this.data);
  }

  get fc(){
    return this.periodtypeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.periodtypeForm.valid){
      this.saving = true;
      if (this.data){
        this._periodtypeService.edit(this.data.id, this.periodtypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Period type edit with success !', 'success')
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
              if (v.propertyPath === this.periodtypeForm.get('name')){
                this.periodtypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._periodtypeService.create(this.periodtypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Period type add with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            this.saving = false;
            let errors: any[] = err['error']['violations'];

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'code'){
                this.periodtypeForm.get('code')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === 'name'){
                this.periodtypeForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

}
