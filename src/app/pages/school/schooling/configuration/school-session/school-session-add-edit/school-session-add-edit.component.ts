import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolSessionService} from "../../../../services/school-session.service";

@Component({
  selector: 'app-school-session-add-edit',
  templateUrl: './school-session-add-edit.component.html',
  styleUrls: ['./school-session-add-edit.component.scss']
})
export class SchoolSessionAddEditComponent {
  schoolSessionForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _schoolsessionService: SchoolSessionService,
              private _dialogRef: MdbModalRef<SchoolSessionAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.schoolSessionForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.schoolSessionForm.patchValue(this.data);
  }

  get fc(){
    return this.schoolSessionForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.schoolSessionForm.valid){
      this.saving = true;
      if (this.data){
        this._schoolsessionService.edit(this.data.id, this.schoolSessionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('School session edit with success !', 'success')
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
              if (v.propertyPath === this.schoolSessionForm.get('name')){
                this.schoolSessionForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._schoolsessionService.create(this.schoolSessionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('School session add with success !', 'success')
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
                this.schoolSessionForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }
}
