import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {ManagerTypeService} from "../../../services/manager-type.service";

@Component({
  selector: 'app-manager-type-add-edit',
  templateUrl: './manager-type-add-edit.component.html',
  styleUrls: ['./manager-type-add-edit.component.scss']
})
export class ManagerTypeAddEditComponent {
  managerTypeForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _managertypeService: ManagerTypeService,
              private _dialogRef: MdbModalRef<ManagerTypeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.managerTypeForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.managerTypeForm.patchValue(this.data);
  }

  get fc(){
    return this.managerTypeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.managerTypeForm.valid){
      this.saving = true;
      if (this.data){
        this._managertypeService.edit(this.data.id, this.managerTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Manager type  edit with success !', 'success')
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
              if (v.propertyPath === this.managerTypeForm.get('name')){
                this.managerTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._managertypeService.create(this.managerTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Manager type add with success !', 'success')
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
                this.managerTypeForm.get('code')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === 'name'){
                this.managerTypeForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

}
