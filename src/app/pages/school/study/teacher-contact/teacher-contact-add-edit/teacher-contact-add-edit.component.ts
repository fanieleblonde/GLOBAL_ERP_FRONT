import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TeacherService} from "../../../services/teacher.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-teacher-contact-add-edit',
  templateUrl: './teacher-contact-add-edit.component.html',
  styleUrls: ['./teacher-contact-add-edit.component.scss']
})
export class TeacherContactAddEditComponent {
  teacherForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _teacherService: TeacherService,
              private _dialogRef: MdbModalRef<TeacherContactAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,

  )
  {
    this.teacherForm = this._fb.group({
      phone:'',
      email:'',
      occupation:'',
      address:'',
      quarter:'',
      city:'',

    })

  }
  ngOnInit() : void{
    this.teacherForm.patchValue(this.data);
  }

  get fc(){
    return this.teacherForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.teacherForm.valid){
      this.saving = true;
      if (this.data){
        this._teacherService.edit(this.data.id, this.teacherForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Teacher edit with success !', 'success')
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
              if (v.propertyPath === this.teacherForm.get('name')){
                this.teacherForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._teacherService.create(this.teacherForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Teacher add with success !', 'success')
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
                this.teacherForm.get('name')?.setErrors({serverError: v.message})
              }
            })
          }
        })
      }
    }
  }
}
