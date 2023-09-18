import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StatusService} from "../../../../school/services/status.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-diploma-type-add-edit',
  templateUrl: './diploma-type-add-edit.component.html',
  styleUrls: ['./diploma-type-add-edit.component.scss']
})
export class DiplomaTypeAddEditComponent {
  diplomaTypeForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _statusService: StatusService,
              private _dialogRef: MdbModalRef<DiplomaTypeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.diplomaTypeForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit() : void{
    this.diplomaTypeForm.patchValue(this.data);
  }

  get fc(){
    return this.diplomaTypeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.diplomaTypeForm.valid){
      this.saving = true;
      if (this.data){
        this._statusService.edit(this.data.id, this.diplomaTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Status edit with success !', 'success')
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
              if (v.propertyPath === this.diplomaTypeForm.get('name')){
                this.diplomaTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._statusService.create(this.diplomaTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Status add with success !', 'success')
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
                this.diplomaTypeForm.get('code')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === 'name'){
                this.diplomaTypeForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
