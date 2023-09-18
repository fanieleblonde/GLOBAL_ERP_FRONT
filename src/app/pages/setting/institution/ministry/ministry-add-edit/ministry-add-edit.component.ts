import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import { MinistryService } from 'src/app/pages/school/services/ministry.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-ministry-add-edit',
  templateUrl: './ministry-add-edit.component.html',
  styleUrls: ['./ministry-add-edit.component.scss']
})
export class MinistryAddEditComponent {
  ministryForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _ministryService: MinistryService,
              private _dialogRef: MdbModalRef<MinistryAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.ministryForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.ministryForm.patchValue(this.data);
  }

  get fc(){
    return this.ministryForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.ministryForm.valid){
      this.saving = true;
      if (this.data){
        this._ministryService.edit(this.data.id, this.ministryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Ministry edit with success !', 'success')
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
              if (v.propertyPath === this.ministryForm.get('name')){
                this.ministryForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._ministryService.create(this.ministryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Ministry add with success !', 'success')
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
                this.ministryForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }


}
