import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {DepartmentService} from "../../../services/department.service";
import {EmployeeService} from "../../../services/employee.service";

@Component({
  selector: 'app-department-add-edit',
  templateUrl: './department-add-edit.component.html',
  styleUrls: ['./department-add-edit.component.scss']
})
export class DepartmentAddEditComponent {
  departmentForm : FormGroup;
  employeeList: any[] = [];
  employeeListSelected : number | undefined;
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
              private employeeService: EmployeeService
  )
  {
    this.departmentForm = this._fb.group({

      name: ['', [Validators.required, Validators.minLength(1)]],
      position: '',
      parent: '',
      Company: '',
    })

  }

  ngOnInit() : void{
    this.departmentForm.patchValue(this.data);
    this.getEmpleyeeList();

    if (!this.data){
      this.getEmpleyeeList();
    }
    else {
      this.employeeListSelected = this.data.parent['@id'];
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
              if (v.propertyPath === 'name'){
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
            console.log(err);

            errors.forEach((v) =>
            {
              console.log(v.message);
              console.log(v.propertyPath)
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

  getEmpleyeeList(){
    this.employeeService.getList().subscribe((data:any)=> {
        this.employeeList = data['hydra:member'];
        this.employeeList = this.employeeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


}
