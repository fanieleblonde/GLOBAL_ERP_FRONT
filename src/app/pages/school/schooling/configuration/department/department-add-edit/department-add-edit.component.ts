import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolService} from "../../../../services/school.service";
import {DepartmentService} from "../../../../services/department.service";

@Component({
  selector: 'app-department-add-edit',
  templateUrl: './department-add-edit.component.html',
  styleUrls: ['./department-add-edit.component.scss']
})
export class DepartmentAddEditComponent {
  departmentForm : FormGroup;
  schoolList: any[] = [];

  schoolListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _departmentService: DepartmentService,
              private _dialogRef: MdbModalRef<DepartmentAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private schoolService: SchoolService

  )
  {
    this.departmentForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description:'',
      position:null,
      school: '',


    })

  }

  ngOnInit() : void{
    this.departmentForm.patchValue(this.data);
    this.getSchoolList();

    if (!this.data){
      this.getSchoolList();
    }
    else {
      this.schoolListSelect = this.data.school['@id'];
    }
  }

  get fc(){
    return this.departmentForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.departmentForm.valid){
      this.saving = true;
      if (this.data){
        this._departmentService.edit(this.data.id, this.departmentForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Department edit with success !', 'success')
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
              if (v.propertyPath === this.departmentForm.get('name')){
                this.departmentForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._departmentService.create(this.departmentForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Department add with success !', 'success')
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
                this.departmentForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }
  getSchoolList(){
    this.schoolService.getList().subscribe((data:any)=> {
        this.schoolList = data['hydra:member'];
        this.schoolList = this.schoolList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


}
