import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../../services/school-year.service";
import {SchoolService} from "../../../../services/school.service";
import {PeriodTypeService} from "../../../../services/period-type.service";
import {CycleWeightingService} from "../../../../services/cycle-weighting.service";
import {CycleService} from "../../../../services/cycle.service";

@Component({
  selector: 'app-cycle-weighting-add-edit',
  templateUrl: './cycle-weighting-add-edit.component.html',
  styleUrls: ['./cycle-weighting-add-edit.component.scss']
})
export class CycleWeightingAddEditComponent {
  cycleweightingForm : FormGroup;
  yearList: any[] = [];
  cycleList: any[] = [];
  schoolList: any[] = [];
  periodTypeList: any[] = [];


  yearListSelect:number | undefined;
  cycleListSelect:number | undefined;
  schoolListSelect:number | undefined;
  periodTypeListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _cycleweightingService: CycleWeightingService,
              private _dialogRef: MdbModalRef<CycleWeightingAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearService: SchoolYearService,
              private cycleService: CycleService,
              private schoolService: SchoolService,
              private periodTypeService: PeriodTypeService,


  )
  {
    this.cycleweightingForm = this._fb.group({
      school:'',
      cycle:'',
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
    this.cycleweightingForm.patchValue(this.data);
    this.getSchoolYearList();
    this.getCycleList();
    this.getSchoolList();
    this.getPeriodTypeList();



    if (!this.data){
      this.getSchoolYearList();
      this.getCycleList();
      this.getSchoolList();
      this.getPeriodTypeList();
    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.schoolListSelect = this.data.school['@id'];
      this.periodTypeListSelect = this.data.periodType['@id'];
      this.cycleListSelect = this.data.cycle['@id'];

    }
  }

  get fc(){
    return this.cycleweightingForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.cycleweightingForm.valid){
      this.saving = true;
      if (this.data){
        this._cycleweightingService.edit(this.data.id, this.cycleweightingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('cycle weighting edit with success !', 'success')
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
              if (v.propertyPath === this.cycleweightingForm.get('year')){
                this.cycleweightingForm.get('year')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._cycleweightingService.create(this.cycleweightingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('cycle weighting add with success !', 'success')
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
                this.cycleweightingForm.get('code')?.setErrors({serverError: v.message})
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
