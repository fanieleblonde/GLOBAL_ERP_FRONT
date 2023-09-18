import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { RhesusService } from 'src/app/pages/school/services/rhesus.service';

@Component({
  selector: 'app-rhesus-add-edit',
  templateUrl: './rhesus-add-edit.component.html',
  styleUrls: ['./rhesus-add-edit.component.scss']
})
export class RhesusAddEditComponent {
  rhesusForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _rhesusService: RhesusService,
              private _dialogRef: MdbModalRef<RhesusAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.rhesusForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.rhesusForm.patchValue(this.data);
  }

  get fc(){
    return this.rhesusForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.rhesusForm.valid){
      this.saving = true;
      if (this.data){
        this._rhesusService.edit(this.data.id, this.rhesusForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Rhesus edit with success !', 'success')
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
              if (v.propertyPath === this.rhesusForm.get('code')){
                this.rhesusForm.get('code')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._rhesusService.create(this.rhesusForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Rhesus add with success !', 'success')
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
              if (v.propertyPath === 'code'){
                this.rhesusForm.get('code')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
