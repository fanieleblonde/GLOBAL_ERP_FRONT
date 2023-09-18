import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {JobLocationService} from "../../../services/job-location.service";

@Component({
  selector: 'app-job-location-add-edit',
  templateUrl: './job-location-add-edit.component.html',
  styleUrls: ['./job-location-add-edit.component.scss']
})
export class JobLocationAddEditComponent {
  joblocationForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _joblocationService: JobLocationService,
              private _dialogRef: MdbModalRef<JobLocationAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.joblocationForm = this._fb.group({

      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.joblocationForm.patchValue(this.data);
  }

  get fc(){
    return this.joblocationForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.joblocationForm.valid){
      this.saving = true;
      if (this.data){
        this._joblocationService.edit(this.data.id, this.joblocationForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('job location edit with success !', 'success')
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
              if (v.propertyPath === this.joblocationForm.get('name')){
                this.joblocationForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._joblocationService.create(this.joblocationForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('job location add with success !', 'success')
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
                this.joblocationForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
