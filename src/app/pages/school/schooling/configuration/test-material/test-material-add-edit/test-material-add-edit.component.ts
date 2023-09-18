import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { TestMaterialService } from 'src/app/pages/school/services/test-material.service';

@Component({
  selector: 'app-test-material-add-edit',
  templateUrl: './test-material-add-edit.component.html',
  styleUrls: ['./test-material-add-edit.component.scss']
})
export class TestMaterialAddEditComponent {
  testmaterialForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _testmaterialService: TestMaterialService,
              private _dialogRef: MdbModalRef<TestMaterialAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
  )
  {
    this.testmaterialForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.testmaterialForm.patchValue(this.data);
  }

  get fc(){
    return this.testmaterialForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.testmaterialForm.valid){
      this.saving = true;
      if (this.data){
        this._testmaterialService.edit(this.data.id, this.testmaterialForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Test Material edit with success !', 'success')
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
              if (v.propertyPath === this.testmaterialForm.get('name')){
                this.testmaterialForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._testmaterialService.create(this.testmaterialForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Test Material add with success !', 'success')
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
                this.testmaterialForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
