import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {StatusService} from "../../../../school/services/status.service";

@Component({
  selector: 'app-status-add-edit',
  templateUrl: './status-add-edit.component.html',
  styleUrls: ['./status-add-edit.component.scss']
})
export class StatusAddEditComponent {
  statusForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _statusService: StatusService,
              private _dialogRef: MdbModalRef<StatusAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.statusForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.statusForm.patchValue(this.data);
  }

  get fc(){
    return this.statusForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.statusForm.valid){
      this.saving = true;
      if (this.data){
        this._statusService.edit(this.data.id, this.statusForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Status edit with success !', 'success')
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
              if (v.propertyPath === this.statusForm.get('name')){
                this.statusForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._statusService.create(this.statusForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Status add with success !', 'success')
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
                this.statusForm.get('code')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === 'name'){
                this.statusForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

}
