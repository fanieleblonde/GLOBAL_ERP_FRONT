import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../../services/school-year.service";
import {InstitutionService} from "../../../../services/institution.service";
import {FormulaThService} from "../../../../services/formula-th.service";
@Component({
  selector: 'app-formula-th-add-edit',
  templateUrl: './formula-th-add-edit.component.html',
  styleUrls: ['./formula-th-add-edit.component.scss']
})
export class FormulaThAddEditComponent {
  formulaForm : FormGroup;

  yearList: any[] = [];
  institutionList: any[] = [];

  yearListSelect:number | undefined;
  institutionListSelect:number | undefined;


  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _formularthService: FormulaThService,
              private _dialogRef: MdbModalRef<FormulaThAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearService: SchoolYearService,
              private institutionService: InstitutionService,
  )
  {
    this.formulaForm = this._fb.group({

      institution:'',
      year: '',
      halfYearAvFml: '',
      finalAvFml: '',
      WarnCdtAbsence: false,
      hrAbsence: null,
      WarnCdtExclusion:false,
      exclusionDay:null,
      bmCdtAbsence:false,
      hrAbsence1:null,
      bmCdtExclusion: false,
      exclusionDay1: null,
      bmWrkAv: false,
      average1:null,
      wrnWrkAv:false,
      average2:null,
      grtThCmp:false,
      examAv:null,
      grtThAnn:false,
      yearAv:null,
      encouragement: false,
      average3:null,
      congratulation: false,
      average4:null,
      refuseAbsence:false,
      hrAbsence2:null,
      refuseExclusion:false,
      exclusionDay2:null,
      refuseSethour: false,
      sethours:null,
      refuseBlame:false,
      NumberOfBlame:null,
      perSubjectNum:'',
      andOr:'',
      perTotalAv:'',
    })
  }

  ngOnInit() : void{
    this.fc['WarnCdtExclusion'].setValue( true)


    this.formulaForm.patchValue(this.data);
    this.getSchoolYearList();
    this.getInstitutionList()



    if (!this.data){
      this.getSchoolYearList();
      this.getInstitutionList()


    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.institutionListSelect = this.data.institution['@id'];

    }
  }

  get fc(){
    return this.formulaForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    console.log(this.formulaForm.value);
    if (this.formulaForm.valid){
      this.saving = true;
      console.log(this.data);
      if (this.data){
        this._formularthService.edit(this.data.id, this.formulaForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('formula edit with success !', 'success')
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
              if (v.propertyPath === this.formulaForm.get('code')){
                this.formulaForm.get('code')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }
      else {
        console.log(this.formulaForm.value);
        this._formularthService.create(this.formulaForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('formula add with success !', 'success')
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
                this.formulaForm.get('code')?.setErrors({serverError: v.message})
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
