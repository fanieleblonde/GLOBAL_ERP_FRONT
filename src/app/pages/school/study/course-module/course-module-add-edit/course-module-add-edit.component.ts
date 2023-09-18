import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {ModuleService} from "../../../services/module.service";
import {ModuleCategoryService} from "../../../services/module-category.service";


@Component({
  selector: 'app-module-add-edit',
  templateUrl: './course-module-add-edit.component.html',
  styleUrls: ['./course-module-add-edit.component.scss']
})
export class CourseModuleAddEditComponent {
  moduleForm : FormGroup;
  moduleCategoryList: any[] = [];

  moduleCategoryListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _moduleService: ModuleService,
              private _dialogRef: MdbModalRef<CourseModuleAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private moduleCategoryService: ModuleCategoryService

  )
  {
    this.moduleForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required]],
      moduleCategory: '',

    })

  }

  ngOnInit() : void{
    this.moduleForm.patchValue(this.data);
    this.getModuleCategoryList();

    if (!this.data){
      this.getModuleCategoryList();
    }
    else {
      this.moduleCategoryListSelect = this.data.moduleCategory['@id'];
    }
  }

  get fc(){
    return this.moduleForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.moduleForm.valid){
      this.saving = true;
      if (this.data){
        this._moduleService.edit(this.data.id, this.moduleForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Module edit with success !', 'success')
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
              if (v.propertyPath === this.moduleForm.get('name')){
                this.moduleForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._moduleService.create(this.moduleForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Module add with success !', 'success')
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
                this.moduleForm.get('name')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === 'code'){
                this.moduleForm.get('code')?.setErrors({serverError: v.message})
              }
            })
          }
        })
      }

    }
  }
  getModuleCategoryList(){
    this.moduleCategoryService.getList().subscribe((data:any)=> {
        this.moduleCategoryList = data['hydra:member'];
        this.moduleCategoryList = this.moduleCategoryList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
