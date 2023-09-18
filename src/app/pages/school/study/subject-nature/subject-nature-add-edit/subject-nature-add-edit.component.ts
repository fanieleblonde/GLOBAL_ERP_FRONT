import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SubjectNatureService} from "../../../services/subject-nature.service";

@Component({
  selector: 'app-subject-nature-add-edit',
  templateUrl: './subject-nature-add-edit.component.html',
  styleUrls: ['./subject-nature-add-edit.component.scss']
})
export class SubjectNatureAddEditComponent {
  subjectNatureForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _subjectnameService: SubjectNatureService,
              private _dialogRef: MdbModalRef<SubjectNatureAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.subjectNatureForm = this._fb.group({
      code: '',
      name: '',
    })

  }

  ngOnInit() : void{
    this.subjectNatureForm.patchValue(this.data);
  }

  get fc(){
    return this.subjectNatureForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.subjectNatureForm.valid){
      this.saving = true;
      if (this.data){
        this._subjectnameService.edit(this.data.id, this.subjectNatureForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Subject nature edit with success !', 'success')
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
              if (v.propertyPath === this.subjectNatureForm.get('name')){
                this.subjectNatureForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._subjectnameService.create(this.subjectNatureForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Subject nature add with success !', 'success')
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
                this.subjectNatureForm.get('name')?.setErrors({serverError: v.message})
              }
            })
          }
        })
      }

    }
  }
}
