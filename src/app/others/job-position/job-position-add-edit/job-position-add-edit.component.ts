import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {JobPositionService} from "../../../services/job-position.service";

@Component({
  selector: 'app-job-position-add-edit',
  templateUrl: './job-position-add-edit.component.html',
  styleUrls: ['./job-position-add-edit.component.scss']
})
export class JobPositionAddEditComponent {
  jobpositionForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _jobpositionService: JobPositionService,
              private _dialogRef: MdbModalRef<JobPositionAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.jobpositionForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.jobpositionForm.patchValue(this.data);
  }

  get fc(){
    return this.jobpositionForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.jobpositionForm.valid){
      this.saving = true;
      if (this.data){
        this._jobpositionService.edit(this.data.id, this.jobpositionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Job position edit with success !', 'success')
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
              if (v.propertyPath === this.jobpositionForm.get('name')){
                this.jobpositionForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._jobpositionService.create(this.jobpositionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('job position add with success !', 'success')
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
                this.jobpositionForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
