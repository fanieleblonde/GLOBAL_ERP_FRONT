import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { IdentityTypeService } from 'src/app/pages/school/services/identity-type.service';

@Component({
  selector: 'app-identity-type-add-edit',
  templateUrl: './identity-type-add-edit.component.html',
  styleUrls: ['./identity-type-add-edit.component.scss']
})
export class IdentityTypeAddEditComponent {
  identityTypeForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _identitytypeService: IdentityTypeService,
              private _dialogRef: MdbModalRef<IdentityTypeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.identityTypeForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.identityTypeForm.patchValue(this.data);
  }

  get fc(){
    return this.identityTypeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.identityTypeForm.valid){
      this.saving = true;
      if (this.data){
        this._identitytypeService.edit(this.data.id, this.identityTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Identity Type edit with success !', 'success')
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
              if (v.propertyPath === this.identityTypeForm.get('name')){
                this.identityTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._identitytypeService.create(this.identityTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Identity Type add with success !', 'success')
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
                this.identityTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
