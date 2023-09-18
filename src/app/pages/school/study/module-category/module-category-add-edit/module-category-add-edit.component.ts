import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {ModuleCategoryService} from "../../../services/module-category.service";

@Component({
  selector: 'app-module-category-add-edit',
  templateUrl: './module-category-add-edit.component.html',
  styleUrls: ['./module-category-add-edit.component.scss']
})
export class ModuleCategoryAddEditComponent {
  modulecategoryForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _modulecategoryService: ModuleCategoryService,
              private _dialogRef: MdbModalRef<ModuleCategoryAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.modulecategoryForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required]],
    })

  }

  ngOnInit() : void{
    this.modulecategoryForm.patchValue(this.data);
  }

  get fc(){
    return this.modulecategoryForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.modulecategoryForm.valid){
      this.saving = true;
      if (this.data){
        this._modulecategoryService.edit(this.data.id, this.modulecategoryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Module Category edit with success !', 'success')
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
              if (v.propertyPath === this.modulecategoryForm.get('name')){
                this.modulecategoryForm.get('name')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === this.modulecategoryForm.get('code')){
                this.modulecategoryForm.get('code')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }
      else {
        this._modulecategoryService.create(this.modulecategoryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Module category add with success !', 'success')
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
                this.modulecategoryForm.get('name')?.setErrors({serverError: v.message})
              }
            })
          }
        })
      }

    }
  }
}
