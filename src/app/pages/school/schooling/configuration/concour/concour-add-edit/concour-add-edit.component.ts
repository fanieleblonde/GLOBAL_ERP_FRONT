import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { SchoolYearService } from 'src/app/pages/school/services/school-year.service';
import { PeriodTypeService } from 'src/app/pages/school/services/period-type.service';
import { SpecialityService } from 'src/app/pages/school/services/speciality.service';
import { ConcourService } from 'src/app/pages/school/services/concour.service';
import { LevelService } from 'src/app/pages/school/services/level.service';

@Component({
  selector: 'app-concour-add-edit',
  templateUrl: './concour-add-edit.component.html',
  styleUrls: ['./concour-add-edit.component.scss']
})
export class ConcourAddEditComponent {
  concourForm : FormGroup;
  yearList: any[] = [];
  periodList: any[] = [];
  specialityList: any[] = [];
  levelList: any[] = [];
  yearListSelect:number | undefined;
  periodListSelect:number | undefined;
  specialityListSelect:number | undefined;
  levelListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _concourService: ConcourService,
              private _dialogRef: MdbModalRef<ConcourAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private schoolyearService: SchoolYearService,
              private periodtypeService: PeriodTypeService,
              private specialityService: SpecialityService,
              private levelService: LevelService
  )
  {
    this.concourForm = this._fb.group({
      year: '',
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      filedateline: '',
      period: '',
      documentfee: '',
      speciality: '',
      level: '',
      numberofpaper: '',
      admissionpoints: '',
    })

  }

  ngOnInit() : void{
    this.concourForm.patchValue(this.data);
    this.getYearList();
    this.getPeriodList();
    this.getSpecialityList();
    this.getLevelList();

    if (!this.data){
      this.getYearList();
      this.getPeriodList();
      this.getSpecialityList();
      this.getLevelList();
    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.periodListSelect = this.data.period['@id'];
      this.specialityListSelect = this.data.speciality['@id'];
      this.levelListSelect = this.data.level['@id'];
    }
  }

  get fc(){
    return this.concourForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.concourForm.valid){
      this.saving = true;
      if (this.data){
        this._concourService.edit(this.data.id, this.concourForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('National Exam edit with success !', 'success')
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
              if (v.propertyPath === this.concourForm.get('name')){
                this.concourForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._concourService.create(this.concourForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('National Exam add with success !', 'success')
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
                this.concourForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

  getYearList(){
    this.schoolyearService.getList().subscribe((data:any)=> {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


  getPeriodList(){
    this.periodtypeService.getList().subscribe((data:any)=> {
        this.periodList = data['hydra:member'];
        this.periodList = this.periodList.map((v) => {
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


  getLevelList(){
    this.levelService.getLevelList().subscribe((data:any)=> {
        this.levelList = data['hydra:member'];
        this.levelList = this.levelList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
