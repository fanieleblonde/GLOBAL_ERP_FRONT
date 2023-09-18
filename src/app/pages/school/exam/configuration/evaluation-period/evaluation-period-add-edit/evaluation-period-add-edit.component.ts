import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {EvaluationPeriodService} from "../../../../services/evaluation-period.service";
import {PeriodTypeService} from "../../../../services/period-type.service";
import {SchoolYearService} from "../../../../services/school-year.service";
import {InstitutionService} from "../../../../services/institution.service";

@Component({
  selector: 'app-evaluation-period-add-edit',
  templateUrl: './evaluation-period-add-edit.component.html',
  styleUrls: ['./evaluation-period-add-edit.component.scss']
})
export class EvaluationPeriodAddEditComponent {
  evaluationperiodForm : FormGroup;

  periodTypeList: any[] = [];
  yearList: any[] = [];
  institutionList: any[] = [];


  periodTypeListSelect:number | undefined;
  yearListSelect:number | undefined;
  institutionListSelect:number | undefined;

  saving = false;


  number : any[]=[{number:1},{number:2},{number:3}]

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _evaluationperiodService: EvaluationPeriodService,
              private _dialogRef: MdbModalRef<EvaluationPeriodAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private periodTypeService: PeriodTypeService,
              private yearService: SchoolYearService,
              private institutionService: InstitutionService


  )
  {
    this.evaluationperiodForm = this._fb.group({

      name: ['', [Validators.required, Validators.minLength(3)]],
      number:'',
      periodType:'',
      year: '',
      beginAt: '',
      endAt: '',
      institution: '',
      isEnable: '',
    })
  }

  ngOnInit() : void{
    this.fc['isEnable'].setValue( false)
    this.evaluationperiodForm.patchValue(this.data);
    this.getPeriodTypeList()
    this.getSchoolYearList();
    this.getInstitutionList()

    if (!this.data){
      this.getPeriodTypeList()
      this.getSchoolYearList();
      this.getInstitutionList()
    }
    else {
      this.periodTypeListSelect = this.data.periodType['@id'];
      this.yearListSelect = this.data.year['@id'];
      this.institutionListSelect = this.data.institution['@id'];

    }
  }

  get fc(){
    return this.evaluationperiodForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.evaluationperiodForm.valid){
      this.saving = true;
      if (this.data){
        this._evaluationperiodService.edit(this.data.id, this.evaluationperiodForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Evaluation period edit with success !', 'success')
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
              if (v.propertyPath === this.evaluationperiodForm.get('name')){
                this.evaluationperiodForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        console.log('toto')
        this._evaluationperiodService.create(this.evaluationperiodForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Evaluation period add with success !', 'success')
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
                this.evaluationperiodForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
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
  getInstitutionList(){
    this.institutionService.getList().subscribe((data:any)=> {
        this.institutionList = data['hydra:member'];
        this.institutionList = this.institutionList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


}
