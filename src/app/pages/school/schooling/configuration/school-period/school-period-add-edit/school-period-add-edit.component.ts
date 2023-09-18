import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolPeriodService} from "../../../../services/school-period.service";
import {InstitutionService} from "../../../../services/institution.service";
import {YearService} from "../../../../services/year.service";
import {PeriodTypeService} from "../../../../services/period-type.service";

@Component({
  selector: 'app-school-period-add-edit',
  templateUrl: './school-period-add-edit.component.html',
  styleUrls: ['./school-period-add-edit.component.scss']
})
export class SchoolPeriodAddEditComponent {
  specialityForm : FormGroup;

  yearList: any[] = [];
  periodTypeList: any[] = [];
  institutionList: any[] = [];

  yearListSelect:number | undefined;
  periodTypeListSelect:number | undefined;
  institutionListSelect:number | undefined;

  position : any[]=[{number:1},{number:2},{number:3}]
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _schoolperiodService: SchoolPeriodService,
              private _dialogRef: MdbModalRef<SchoolPeriodAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private institutionService: InstitutionService,
              private yearService: YearService,
              private periodTypeService: PeriodTypeService,



  )
  {
    this.specialityForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      periodType: '',
      institution:'',
      year:'',
      position:'',
    })

  }

  ngOnInit() : void{

    this.specialityForm.patchValue(this.data);
    this.getperiodTypeList();
    this.getYearList();
    this.getInstitutionList();

    if (!this.data){
      this.getperiodTypeList();
      this.getYearList();
      this.getInstitutionList();

    }
    else {
      this.periodTypeListSelect = this.data.periodType['@id'];
      this.yearListSelect = this.data.year['@id'];
      this.institutionListSelect = this.data.institution['@id'];
    }
  }

  get fc(){
    return this.specialityForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.specialityForm.valid){
      this.saving = true;
      if (this.data){
        this._schoolperiodService.edit(this.data.id, this.specialityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('school period edit with success !', 'success')
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
              if (v.propertyPath === this.specialityForm.get('name')){
                this.specialityForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._schoolperiodService.create(this.specialityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('school period add with success !', 'success')
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
                this.specialityForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
  getYearList(){
    this.yearService.getYearList().subscribe((data:any)=> {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getperiodTypeList(){
    this.periodTypeService.getList().subscribe((data:any)=> {
        this.periodTypeList = data['hydra:member'];
        this.periodTypeList = this.periodTypeList.map((v) => {
          v.id = v['@id'];
          return v;
        })

        this.fc['name'].setValue(this.data?.name)

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

  setName() {
    this.fc['name'].setValue((this.getNameFromApiResourceId(this.fc['periodType'].value) && this.fc['position']?.value) ? this.getNameFromApiResourceId(this.fc['periodType'].value)+'-'+this.fc['position'].value :'')
  }

  getNameFromApiResourceId(apiId:string){
    let name = this.periodTypeList.find( (periodType:any)=> periodType.id===apiId)?.name
    return name;
  }
}
