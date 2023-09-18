import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {WorkLocationService} from "../../../services/work-location.service";

@Component({
  selector: 'app-work-location-add-edit',
  templateUrl: './work-location-add-edit.component.html',
  styleUrls: ['./work-location-add-edit.component.scss']
})
export class WorkLocationAddEditComponent {
  workLocationForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _workLocationService: WorkLocationService,
              private _dialogRef: MdbModalRef<WorkLocationAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.workLocationForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.workLocationForm.patchValue(this.data);
  }

  get fc(){
    return this.workLocationForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.workLocationForm.valid){
      this.saving = true;
      if (this.data){
        this._workLocationService.edit(this.data.id, this.workLocationForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Work location edit with success !', 'success')
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
              if (v.propertyPath === this.workLocationForm.get('name')){
                this.workLocationForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._workLocationService.create(this.workLocationForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Work location add with success !', 'success')
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
                this.workLocationForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

}
