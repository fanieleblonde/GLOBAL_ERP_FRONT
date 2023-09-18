import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { NationalExamService } from 'src/app/pages/school/services/national-exam.service';
import { SchoolYearService } from 'src/app/pages/school/services/school-year.service';
import { PeriodTypeService } from 'src/app/pages/school/services/period-type.service';
import { DiplomaService } from 'src/app/pages/school/services/diploma.service';
import { SpecialityService } from 'src/app/pages/school/services/speciality.service';

@Component({
  selector: 'app-national-exam-add-edit',
  templateUrl: './national-exam-add-edit.component.html',
  styleUrls: ['./national-exam-add-edit.component.scss']
})
export class NationalExamAddEditComponent {
  nationalexamForm : FormGroup;
  yearList: any[] = [];
  periodList: any[] = [];
  specialityList: any[] = [];
  diplomaList: any[] = [];
  yearListSelect:number | undefined;
  periodListSelect:number | undefined;
  specialityListSelect:number | undefined;
  diplomaListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _nationalexamService: NationalExamService,
              private _dialogRef: MdbModalRef<NationalExamAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private schoolyearService: SchoolYearService,
              private periodtypeService: PeriodTypeService,
              private specialityService: SpecialityService,
              private diplomaService: DiplomaService
  )
  {
    this.nationalexamForm = this._fb.group({
      year: '',
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      filedateline: '',
      period: '',
      documentfee: '',
      speciality: '',
      diploma: '',
      numberofpaper: '',
      admissionpoints: '',
    })

  }

  ngOnInit() : void{
    this.nationalexamForm.patchValue(this.data);
    this.getYearList();
    this.getPeriodList();
    this.getSpecialityList();
    this.getDiplomaList();

    if (!this.data){
      this.getYearList();
      this.getPeriodList();
      this.getSpecialityList();
      this.getDiplomaList();
    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.periodListSelect = this.data.period['@id'];
      this.specialityListSelect = this.data.speciality['@id'];
      this.diplomaListSelect = this.data.diploma['@id'];
    }
  }

  get fc(){
    return this.nationalexamForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.nationalexamForm.valid){
      this.saving = true;
      if (this.data){
        this._nationalexamService.edit(this.data.id, this.nationalexamForm.value).subscribe({
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
              if (v.propertyPath === this.nationalexamForm.get('name')){
                this.nationalexamForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._nationalexamService.create(this.nationalexamForm.value).subscribe({
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
                this.nationalexamForm.get('name')?.setErrors({serverError: v.message})
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


  getDiplomaList(){
    this.diplomaService.getDiplomaList().subscribe((data:any)=> {
        this.diplomaList = data['hydra:member'];
        this.diplomaList = this.diplomaList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


}
