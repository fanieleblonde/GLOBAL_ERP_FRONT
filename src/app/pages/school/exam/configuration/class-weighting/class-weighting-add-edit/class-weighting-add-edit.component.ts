import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../../services/school-year.service";
import {SchoolService} from "../../../../services/school.service";
import {PeriodTypeService} from "../../../../services/period-type.service";
import {ClassWeightingService} from "../../../../services/class-weighting.service";
import {SchoolClassService} from "../../../../services/school-class.service";

@Component({
  selector: 'app-class-weighting-add-edit',
  templateUrl: './class-weighting-add-edit.component.html',
  styleUrls: ['./class-weighting-add-edit.component.scss']
})
export class ClassWeightingAddEditComponent {
  classweightingForm : FormGroup;
  yearList: any[] = [];
  schoolclassList: any[] = [];
  schoolList: any[] = [];
  periodTypeList: any[] = [];


  yearListSelect:number | undefined;
  schoolclassListSelect:number | undefined;
  schoolListSelect:number | undefined;
  periodTypeListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _classweightingService: ClassWeightingService,
              private _dialogRef: MdbModalRef<ClassWeightingAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearService: SchoolYearService,
              private schoolclassService: SchoolClassService,
              private schoolService: SchoolService,
              private periodTypeService: PeriodTypeService,


  )
  {
    this.classweightingForm = this._fb.group({
      school:'',
      schoolClass:'',
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
    this.classweightingForm.patchValue(this.data);
    this.getSchoolYearList();
    this.getSchoolClassList();
    this.getSchoolList();
    this.getPeriodTypeList();



    if (!this.data){
      this.getSchoolYearList();
      this.getSchoolClassList();
      this.getSchoolList();
      this.getPeriodTypeList();
    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.schoolListSelect = this.data.school['@id'];
      this.periodTypeListSelect = this.data.periodType['@id'];
      this.schoolclassListSelect = this.data.schoolClass['@id'];

    }
  }

  get fc(){
    return this.classweightingForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.classweightingForm.valid){
      this.saving = true;
      if (this.data){
        this._classweightingService.edit(this.data.id, this.classweightingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('class weighting edit with success !', 'success')
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
              if (v.propertyPath === this.classweightingForm.get('name')){
                this.classweightingForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._classweightingService.create(this.classweightingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('class weighting add with success !', 'success')
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
              if (v.propertyPath === 'year'){
                this.classweightingForm.get('year')?.setErrors({serverError: v.message})
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
  getSchoolClassList(){
    this.schoolclassService.getList().subscribe((data:any)=> {
        this.schoolclassList = data['hydra:member'];
        this.schoolclassList = this.schoolclassList.map((v) => {
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
