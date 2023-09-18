import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SubjectTypeService} from "../../../services/subject-type.service";

@Component({
  selector: 'app-subject-type-add-edit',
  templateUrl: './subject-type-add-edit.component.html',
  styleUrls: ['./subject-type-add-edit.component.scss']
})
export class SubjectTypeAddEditComponent {
  subjectTypeForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _subjecttypeService: SubjectTypeService,
              private _dialogRef: MdbModalRef<SubjectTypeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.subjectTypeForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: '',
    })

  }

  ngOnInit() : void{
    this.subjectTypeForm.patchValue(this.data);
  }

  get fc(){
    return this.subjectTypeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.subjectTypeForm.valid){
      this.saving = true;
      if (this.data){
        this._subjecttypeService.edit(this.data.id, this.subjectTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Subject type edit with success !', 'success')
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
              if (v.propertyPath === this.subjectTypeForm.get('name')){
                this.subjectTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._subjecttypeService.create(this.subjectTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Subject type add with success !', 'success')
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
                this.subjectTypeForm.get('name')?.setErrors({serverError: v.message})
              }
            })
          }
        })
      }

    }
  }

}
