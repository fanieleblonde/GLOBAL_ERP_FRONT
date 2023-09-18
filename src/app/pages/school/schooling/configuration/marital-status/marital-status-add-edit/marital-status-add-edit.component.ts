import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { MaritalStatusService } from 'src/app/pages/school/services/marital-status.service';

@Component({
  selector: 'app-marital-status-add-edit',
  templateUrl: './marital-status-add-edit.component.html',
  styleUrls: ['./marital-status-add-edit.component.scss']
})
export class MaritalStatusAddEditComponent {
  maritalStatusForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _maritalstatusService: MaritalStatusService,
              private _dialogRef: MdbModalRef<MaritalStatusAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.maritalStatusForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.maritalStatusForm.patchValue(this.data);
  }

  get fc(){
    return this.maritalStatusForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.maritalStatusForm.valid){
      this.saving = true;
      if (this.data){
        this._maritalstatusService.edit(this.data.id, this.maritalStatusForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Identity Type edit with success !', 'success')
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
              if (v.propertyPath === this.maritalStatusForm.get('name')){
                this.maritalStatusForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._maritalstatusService.create(this.maritalStatusForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Identity Type add with success !', 'success')
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
                this.maritalStatusForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }


}
