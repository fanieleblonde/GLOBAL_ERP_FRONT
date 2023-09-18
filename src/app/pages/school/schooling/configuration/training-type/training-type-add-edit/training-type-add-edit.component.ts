import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import { TrainingTypeService } from 'src/app/pages/school/services/training-type.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-training-type-add-edit',
  templateUrl: './training-type-add-edit.component.html',
  styleUrls: ['./training-type-add-edit.component.scss']
})
export class TrainingTypeAddEditComponent {
  trainingTypeForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _trainingTypeService: TrainingTypeService,
              private _dialogRef: MdbModalRef<TrainingTypeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.trainingTypeForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.trainingTypeForm.patchValue(this.data);
  }

  get fc(){
    return this.trainingTypeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.trainingTypeForm.valid){
      this.saving = true;
      if (this.data){
        this._trainingTypeService.edit(this.data.id, this.trainingTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Training Type edit with success !', 'success')
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
              if (v.propertyPath === this.trainingTypeForm.get('name')){
                this.trainingTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._trainingTypeService.create(this.trainingTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Training Type add with success !', 'success')
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
                this.trainingTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }


}
