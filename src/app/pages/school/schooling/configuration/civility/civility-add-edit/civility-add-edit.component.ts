import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { CivilityService } from 'src/app/pages/school/services/civility.service';

@Component({
  selector: 'app-civility-add-edit',
  templateUrl: './civility-add-edit.component.html',
  styleUrls: ['./civility-add-edit.component.scss']
})
export class CivilityAddEditComponent {
  civilityForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _civilityService: CivilityService,
              private _dialogRef: MdbModalRef<CivilityAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.civilityForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.civilityForm.patchValue(this.data);
  }

  get fc(){
    return this.civilityForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.civilityForm.valid){
      this.saving = true;
      if (this.data){
        this._civilityService.edit(this.data.id, this.civilityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Civility edit with success !', 'success')
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
              if (v.propertyPath === this.civilityForm.get('name')){
                this.civilityForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._civilityService.create(this.civilityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Civility add with success !', 'success')
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
                this.civilityForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
