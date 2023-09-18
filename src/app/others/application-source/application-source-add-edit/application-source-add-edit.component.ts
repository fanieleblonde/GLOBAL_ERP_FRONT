import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {ApplicationSourceService} from "../../../services/application-source.service";

@Component({
  selector: 'app-application-source-add-edit',
  templateUrl: './application-source-add-edit.component.html',
  styleUrls: ['./application-source-add-edit.component.scss']
})
export class ApplicationSourceAddEditComponent {
  applicationsourceForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _applicationsourceService: ApplicationSourceService,
              private _dialogRef: MdbModalRef<ApplicationSourceAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.applicationsourceForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.applicationsourceForm.patchValue(this.data);
  }

  get fc(){
    return this.applicationsourceForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.applicationsourceForm.valid){
      this.saving = true;
      if (this.data){
        this._applicationsourceService.edit(this.data.id, this.applicationsourceForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Application source edit with success !', 'success')
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
              if (v.propertyPath === this.applicationsourceForm.get('name')){
                this.applicationsourceForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._applicationsourceService.create(this.applicationsourceForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Application source add with success !', 'success')
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
                this.applicationsourceForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
