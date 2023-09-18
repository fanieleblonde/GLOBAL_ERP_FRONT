import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolService} from "../../../../services/school.service";
import {ClassCategoryService} from "../../../../services/class-category.service";

@Component({
  selector: 'app-class-category-add-edit',
  templateUrl: './class-category-add-edit.component.html',
  styleUrls: ['./class-category-add-edit.component.scss']
})
export class ClassCategoryAddEditComponent {
  classcategoryForm : FormGroup;
  schoolList: any[] = [];

  schoolListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _classcategoryService: ClassCategoryService,
              private _dialogRef: MdbModalRef<ClassCategoryAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private schoolService: SchoolService

  )
  {
    this.classcategoryForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description:'',
      position:['', [Validators.required]],
      school: '',


    })

  }

  ngOnInit() : void{
    this.classcategoryForm.patchValue(this.data);
    this.getSchoolList();

    if (!this.data){
      this.getSchoolList();
    }
    else {
      this.schoolListSelect = this.data.school['@id'];
    }
  }

  get fc(){
    return this.classcategoryForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.classcategoryForm.valid){
      this.saving = true;
      if (this.data){
        this._classcategoryService.edit(this.data.id, this.classcategoryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Class category edit with success !', 'success')
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
              if (v.propertyPath === this.classcategoryForm.get('name')){
                this.classcategoryForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._classcategoryService.create(this.classcategoryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Classe category add with success !', 'success')
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
              if (v.propertyPath === 'code'){
                this.classcategoryForm.get('code')?.setErrors({serverError: v.message})
              }

              if (v.propertyPath === 'name'){
                this.classcategoryForm.get('name')?.setErrors({serverError: v.message})
              }

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
