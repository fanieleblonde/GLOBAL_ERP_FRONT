import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {EmploymentTypeService} from "../../../services/employment-type.service";

@Component({
  selector: 'app-employment-type-add-edit',
  templateUrl: './employment-type-add-edit.component.html',
  styleUrls: ['./employment-type-add-edit.component.scss']
})
export class EmploymentTypeAddEditComponent {
  employementTypeForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _employementTypeService: EmploymentTypeService,
              private _dialogRef: MdbModalRef<EmploymentTypeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.employementTypeForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.employementTypeForm.patchValue(this.data);
  }

  get fc(){
    return this.employementTypeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.employementTypeForm.valid){
      this.saving = true;
      if (this.data){
        this._employementTypeService.edit(this.data.id, this.employementTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Employement type edit with success !', 'success')
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
              if (v.propertyPath === this.employementTypeForm.get('name')){
                this.employementTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._employementTypeService.create(this.employementTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Employement type add with success !', 'success')
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
              if (v.propertyPath === 'name'){
                this.employementTypeForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
