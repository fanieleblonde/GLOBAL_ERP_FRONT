import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { TargetService } from 'src/app/pages/school/services/target.service';

@Component({
  selector: 'app-target-add-edit',
  templateUrl: './target-add-edit.component.html',
  styleUrls: ['./target-add-edit.component.scss']
})
export class TargetAddEditComponent {
  targetForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _targetService: TargetService,
              private _dialogRef: MdbModalRef<TargetAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.targetForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.targetForm.patchValue(this.data);
  }

  get fc(){
    return this.targetForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.targetForm.valid){
      this.saving = true;
      if (this.data){
        this._targetService.edit(this.data.id, this.targetForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Target edit with success !', 'success')
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
              if (v.propertyPath === this.targetForm.get('name')){
                this.targetForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._targetService.create(this.targetForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Target add with success !', 'success')
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
                this.targetForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }
}
