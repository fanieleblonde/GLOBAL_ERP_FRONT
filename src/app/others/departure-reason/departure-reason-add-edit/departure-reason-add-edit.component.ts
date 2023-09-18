import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {DepartureReasonService} from "../../../services/departure-reason.service";

@Component({
  selector: 'app-departure-reason-add-edit',
  templateUrl: './departure-reason-add-edit.component.html',
  styleUrls: ['./departure-reason-add-edit.component.scss']
})
export class DepartureReasonAddEditComponent {
  departureReasonForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _departureReasonService: DepartureReasonService,
              private _dialogRef: MdbModalRef<DepartureReasonAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.departureReasonForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.departureReasonForm.patchValue(this.data);
  }

  get fc(){
    return this.departureReasonForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.departureReasonForm.valid){
      this.saving = true;
      if (this.data){
        this._departureReasonService.edit(this.data.id, this.departureReasonForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Departure reason edit with success !', 'success')
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
              if (v.propertyPath === this.departureReasonForm.get('name')){
                this.departureReasonForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._departureReasonService.create(this.departureReasonForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Departure reason add with success !', 'success')
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
                this.departureReasonForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
