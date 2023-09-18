import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../../services/school-year.service";
import {SpecialityWeightingService} from "../../../../services/speciality-weighting.service";
import {SpecialityService} from "../../../../services/speciality.service";
import {SchoolService} from "../../../../services/school.service";
import {PeriodTypeService} from "../../../../services/period-type.service";

@Component({
  selector: 'app-speciality-weighting-add-edit',
  templateUrl: './speciality-weighting-add-edit.component.html',
  styleUrls: ['./speciality-weighting-add-edit.component.scss']
})
export class SpecialityWeightingAddEditComponent {
  specialityweightingForm : FormGroup;
  yearList: any[] = [];
  specialityList: any[] = [];
  schoolList: any[] = [];
  periodTypeList: any[] = [];


  yearListSelect:number | undefined;
  specialityListSelect:number | undefined;
  schoolListSelect:number | undefined;
  periodTypeListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _specialityweightingService: SpecialityWeightingService,
              private _dialogRef: MdbModalRef<SpecialityWeightingAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearService: SchoolYearService,
              private specialityService: SpecialityService,
              private schoolService: SchoolService,
              private periodTypeService: PeriodTypeService,


  )
  {
    this.specialityweightingForm = this._fb.group({
      school:'',
      speciality:'',
      year: '',
      periodType: '',
      p1cc: '',
      p1ex: '',
      p1rt: '',
      p2cc: '',
      p2ex: '',
      p2rt: '',
      p3cc: '',
      p3ex: '',
      p3rt: '',
      generalEliminateAverage: '',
      eliminateMark: '',
      validationMark: '',
    })
  }

  ngOnInit() : void{
    this.specialityweightingForm.patchValue(this.data);
    this.getSchoolYearList();
    this.getSpecialityList();
    this.getSchoolList();
    this.getPeriodTypeList();



    if (!this.data){
      this.getSchoolYearList();
      this.getSpecialityList();
      this.getSchoolList();
      this.getPeriodTypeList();
    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.schoolListSelect = this.data.school['@id'];
      this.periodTypeListSelect = this.data.periodType['@id'];
      this.specialityListSelect = this.data.speciality['@id'];

    }
  }

  get fc(){
    return this.specialityweightingForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.specialityweightingForm.valid){
      this.saving = true;
      if (this.data){
        this._specialityweightingService.edit(this.data.id, this.specialityweightingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('speciality weighting edit with success !', 'success')
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
              if (v.propertyPath === this.specialityweightingForm.get('name')){
                this.specialityweightingForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._specialityweightingService.create(this.specialityweightingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('speciality weighting add with success !', 'success')
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
                this.specialityweightingForm.get('code')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

  getSchoolYearList(){
    this.yearService.getList().subscribe((data:any)=> {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getSpecialityList(){
    this.specialityService.getList().subscribe((data:any)=> {
        this.specialityList = data['hydra:member'];
        this.specialityList = this.specialityList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
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
}
