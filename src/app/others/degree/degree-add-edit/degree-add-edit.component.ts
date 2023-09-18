import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {DegreeService} from "../../../services/degree.service";

@Component({
  selector: 'app-degree-add-edit',
  templateUrl: './degree-add-edit.component.html',
  styleUrls: ['./degree-add-edit.component.scss']
})
export class DegreeAddEditComponent {
  degreeForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _degreeService: DegreeService,
              private _dialogRef: MdbModalRef<DegreeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.degreeForm = this._fb.group({

      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.degreeForm.patchValue(this.data);
  }

  get fc(){
    return this.degreeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.degreeForm.valid){
      this.saving = true;
      if (this.data){
        this._degreeService.edit(this.data.id, this.degreeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('degree edit with success !', 'success')
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
              if (v.propertyPath === this.degreeForm.get('name')){
                this.degreeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._degreeService.create(this.degreeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('degree add with success !', 'success')
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
                this.degreeForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
