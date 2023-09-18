import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolService} from "../../../../services/school.service";
import {ManagerTypeService} from "../../../../../setting/services/manager-type.service";

@Component({
  selector: 'app-school-add-edit',
  templateUrl: './school-add-edit.component.html',
  styleUrls: ['./school-add-edit.component.scss']
})
export class SchoolAddEditComponent {
  schoolForm : FormGroup;

  managerTypeList: any[] = [];
  managerTypeSelected : number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _schoolService: SchoolService,
              private _dialogRef: MdbModalRef<SchoolAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private managerTypeService: ManagerTypeService
  )
  {
    this.schoolForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      managerType:'',
      manager:'',
      postalCode:'',
      city:'',
      phone:'',
      email: ['', [Validators.email]],
      address:'',
    })

  }

  ngOnInit() : void{
    this.schoolForm.patchValue(this.data);
      this.getManagerTypeList();

    if (!this.data){
      this.getManagerTypeList();
    }
    else {
      this.managerTypeSelected = this.data.managerType['@id'];
    }
  }

  get fc(){
    return this.schoolForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.schoolForm.valid){
      this.saving = true;
      if (this.data){
        this._schoolService.edit(this.data.id, this.schoolForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('School edit with success !', 'success')
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
              if (v.propertyPath === 'email'){
                this.schoolForm.get('email')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._schoolService.create(this.schoolForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('School add with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            this.saving = false;
            let errors: any[] = err['error']['violations'];
            console.log(err);

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'email'){
                this.schoolForm.get('email')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

  getManagerTypeList(){
    this.managerTypeService.getList().subscribe((data:any)=> {
        this.managerTypeList = data['hydra:member'];
        this.managerTypeList = this.managerTypeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
