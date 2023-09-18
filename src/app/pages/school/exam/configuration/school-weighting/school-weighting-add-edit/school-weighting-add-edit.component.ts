import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../../services/school-year.service";
import {SchoolService} from "../../../../services/school.service";
import {PeriodTypeService} from "../../../../services/period-type.service";
import {SchoolWeightingService} from "../../../../services/school-weighting.service";

@Component({
  selector: 'app-school-weighting-add-edit',
  templateUrl: './school-weighting-add-edit.component.html',
  styleUrls: ['./school-weighting-add-edit.component.scss']
})
export class SchoolWeightingAddEditComponent {
  schoolweightingForm : FormGroup;
  yearList: any[] = [];
  schoolList: any[] = [];
  periodTypeList: any[] = [];


  yearListSelect:number | undefined;
  schoolListSelect:number | undefined;
  periodTypeListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _schoolweightingService: SchoolWeightingService,
              private _dialogRef: MdbModalRef<SchoolWeightingAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearService: SchoolYearService,
              private schoolService: SchoolService,
              private periodTypeService: PeriodTypeService,


  )
  {
    this.schoolweightingForm = this._fb.group({
      school:'',
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
    this.schoolweightingForm.patchValue(this.data);
    this.getSchoolYearList();
    this.getSchoolList();
    this.getPeriodTypeList();



    if (!this.data){
      this.getSchoolYearList();
      this.getSchoolList();
      this.getPeriodTypeList();
    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.schoolListSelect = this.data.school['@id'];
      this.periodTypeListSelect = this.data.periodType['@id'];

    }
  }

  get fc(){
    return this.schoolweightingForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.schoolweightingForm.valid){
      this.saving = true;
      if (this.data){
        this._schoolweightingService.edit(this.data.id, this.schoolweightingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('school weighting edit with success !', 'success')
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
              if (v.propertyPath === this.schoolweightingForm.get('name')){
                this.schoolweightingForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._schoolweightingService.create(this.schoolweightingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('school weighting add with success !', 'success')
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
                this.schoolweightingForm.get('code')?.setErrors({serverError: v.message})
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
