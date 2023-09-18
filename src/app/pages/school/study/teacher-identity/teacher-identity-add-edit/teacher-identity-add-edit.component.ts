import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeacherService} from "../../../services/teacher.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {IdentityTypeService} from "../../../services/identity-type.service";

@Component({
  selector: 'app-teacher-identity-add-edit',
  templateUrl: './teacher-identity-add-edit.component.html',
  styleUrls: ['./teacher-identity-add-edit.component.scss']
})
export class TeacherIdentityAddEditComponent {
  teacherForm : FormGroup;

  identityTypeList : any[] = []
  identityTypeListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _teacherService: TeacherService,
              private _dialogRef: MdbModalRef<TeacherIdentityAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private identityTypeservice: IdentityTypeService,




  )
  {
    this.teacherForm = this._fb.group({
      identityType:'',
      idNumber:'',
      placeOfIssue:'',
      issueAt:'',
      expirationAt:'',

    })

  }

  ngOnInit() : void{
    this.teacherForm.patchValue(this.data);
    this.getIdentityTypeList();


    if (!this.data){
      this.getIdentityTypeList();
    }
    else {
      this.identityTypeListSelect = this.data.identityType['@id'];
    }
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

  getIdentityTypeList(){
    this.identityTypeservice.getList().subscribe((data:any)=> {
        this.identityTypeList = data['hydra:member'];
        this.identityTypeList = this.identityTypeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
