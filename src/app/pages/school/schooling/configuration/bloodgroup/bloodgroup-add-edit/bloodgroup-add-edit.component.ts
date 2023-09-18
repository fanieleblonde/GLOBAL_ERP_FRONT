import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { BloodgroupService } from 'src/app/pages/school/services/bloodgroup.service';

@Component({
  selector: 'app-bloodgroup-add-edit',
  templateUrl: './bloodgroup-add-edit.component.html',
  styleUrls: ['./bloodgroup-add-edit.component.scss']
})
export class BloodgroupAddEditComponent {
  bloodGroupForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _bloodgroupService: BloodgroupService,
              private _dialogRef: MdbModalRef<BloodgroupAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.bloodGroupForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.bloodGroupForm.patchValue(this.data);
  }

  get fc(){
    return this.bloodGroupForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.bloodGroupForm.valid){
      this.saving = true;
      if (this.data){
        this._bloodgroupService.edit(this.data.id, this.bloodGroupForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Blood Group edit with success !', 'success')
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
              if (v.propertyPath === this.bloodGroupForm.get('name')){
                this.bloodGroupForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._bloodgroupService.create(this.bloodGroupForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Blood Group add with success !', 'success')
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
                this.bloodGroupForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
