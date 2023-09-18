import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolService} from "../../../../services/school.service";
import { FamilyService } from 'src/app/pages/school/services/family.service';

@Component({
  selector: 'app-family-add-edit',
  templateUrl: './family-add-edit.component.html',
  styleUrls: ['./family-add-edit.component.scss']
})
export class FamilyAddEditComponent {
  familyForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _familyService: FamilyService,
              private _dialogRef: MdbModalRef<FamilyAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
  )
  {
    this.familyForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: [''],
      phone: [''],
      email: ['', [Validators.email]],
      fatherName: [''],
      fatherPhone: [''],
      fatherProfession: [''],
      motherName: [''],
      motherPhone: [''],
      motherProfession: [''],
    })

  }

  ngOnInit() : void{
    this.familyForm.patchValue(this.data);

  }

  get fc(){
    return this.familyForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.familyForm.valid){
      this.saving = true;
      if (this.data){
        this._familyService.edit(this.data.id, this.familyForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Family edit with success !', 'success')
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
              if (v.propertyPath === 'email'){
                this.familyForm.get('email')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._familyService.create(this.familyForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Family add with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            this.saving = false;
            let errors: any[] = err['error']['violations'];
            console.log(err);

            errors.forEach((v) =>
            {
              console.log(v.message);
              console.log(v.propertyPath)
              if (v.propertyPath === 'email'){
                this.familyForm.get('email')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === 'name'){
                this.familyForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }


}
