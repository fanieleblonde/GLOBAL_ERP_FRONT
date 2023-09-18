import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {CycleService} from "../../../../school/services/cycle.service";
import {InstitutionService} from "../../../../school/services/institution.service";
import {ManagerTypeService} from "../../../../setting/services/manager-type.service";
import {PeriodTypeService} from "../../../../school/services/period-type.service";
import {ClassCategoryService} from "../../../../school/services/class-category.service";

@Component({
  selector: 'app-institution-add-edit',
  templateUrl: './institution-add-edit.component.html',
  styleUrls: ['./institution-add-edit.component.scss']
})
export class InstitutionAddEditComponent {
  institutionForm : FormGroup;

  managerTypeList: any[] = [];
  cycleList: any[] = [];
  periodTypeList: any[] = [];
  classCategoryList: any[] = [];

  managerTypeListSelect:number | undefined;
  cycleListSelect:number | undefined;
  periodTypeListSelect:number | undefined;
  classCategoryListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _institutionService: InstitutionService,
              private _dialogRef: MdbModalRef<InstitutionAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private managerTypeService: ManagerTypeService,
              private cycleService: CycleService,
              private periodTypeService: PeriodTypeService,
              private classCategoryService: ClassCategoryService,


  )
  {
    this.institutionForm = this._fb.group({
      managerType:['', [Validators.required]],
      manager:'',
      periodType:['', [Validators.required]],
      cycle:['', [Validators.required]],
      classCategory:['', [Validators.required]],
      divisionNumber:null,
      autorisationDate:'',
      openDate: '',
      autorisationRef:'',
      openningRef: '',
    })

  }

  ngOnInit() : void{
    this.institutionForm.patchValue(this.data);
    this.getManagerTypeList();
    this.getCycleList();
    this.getPeriodTypeList();
    this.getClassCategoryList();


    if (!this.data){
      this.getManagerTypeList();
      this.getCycleList();
      this.getPeriodTypeList();
      this.getClassCategoryList();
    }
    else {
      this.managerTypeListSelect = this.data.managerType['@id'];
      this.cycleListSelect = this.data.cycle['@id'];
      this.periodTypeList = this.data.periodType['@id'];
      this.classCategoryListSelect = this.data.classCategory['@id'];

    }
  }

  get fc(){
    return this.institutionForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.institutionForm.valid){
      this.saving = true;
      if (this.data){
        this._institutionService.edit(this.data.id, this.institutionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Speciality edit with success !', 'success')
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
              if (v.propertyPath === this.institutionForm.get('name')){
                this.institutionForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }
      else {
        this._institutionService.create(this.institutionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Speciality add with success !', 'success')
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
                this.institutionForm.get('name')?.setErrors({serverError: v.message})
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
  getCycleList(){
    this.cycleService.getCycleList().subscribe((data:any)=> {
        this.cycleList = data['hydra:member'];
        this.cycleList = this.cycleList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getPeriodTypeList(){
    this.periodTypeService.getList().subscribe((data:any)=> {
        this.periodTypeList = data['hydra:member'];
        this.periodTypeList = this.periodTypeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getClassCategoryList(){
    this.classCategoryService.getList().subscribe((data:any)=> {
        this.classCategoryList = data['hydra:member'];
        this.classCategoryList = this.classCategoryList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
