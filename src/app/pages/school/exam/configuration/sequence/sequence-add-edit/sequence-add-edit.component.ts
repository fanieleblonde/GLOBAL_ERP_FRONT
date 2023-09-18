import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../../services/school-year.service";
import {InstitutionService} from "../../../../services/institution.service";
import {SequenceService} from "../../../../services/sequence.service";
import {SchoolSessionService} from "../../../../services/school-session.service";
import {SchoolPeriodService} from "../../../../services/school-period.service";

@Component({
  selector: 'app-sequence-add-edit',
  templateUrl: './sequence-add-edit.component.html',
  styleUrls: ['./sequence-add-edit.component.scss']
})
export class SequenceAddEditComponent {
  sequenceForm : FormGroup;

  yearList: any[] = [];
  institutionList: any[] = [];
  schoolSessionList: any[] = [];
  schoolPeriodList: any[] = [];


  yearListSelect:number | undefined;
  institutionListSelect:number | undefined;
  schoolSessionListSelect:number | undefined;
  schoolPeriodListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _sequenceService: SequenceService,
              private _dialogRef: MdbModalRef<SequenceAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearService: SchoolYearService,
              private institutionService: InstitutionService,
              private schoolSessionService: SchoolSessionService,
              private schoolPeriodService: SchoolPeriodService

  )
  {
    this.sequenceForm = this._fb.group({

      code:['', [Validators.required, Validators.minLength(3)]],
      isMarkActif:'',
      isCourseActif: '',
      year: '',
      weighting: '',
      maxNumberOfAssigment: '',
      institution: '',
      schoolSession:'',
      schoolPeriod:'',
      position:'',
    })
  }

  ngOnInit() : void{
    this.fc['isMarkActif'].setValue( false)
    this.fc['isCourseActif'].setValue( false)

    this.sequenceForm.patchValue(this.data);
    this.getSchoolYearList();
    this.getInstitutionList()
    this.getSchoolSessionList();
    this.getSchoolPeriodList()

    // this.yearListSelect = this.data.year['@id'];

    if (!this.data){
      this.getSchoolYearList();
      this.getInstitutionList()
      this.getSchoolSessionList();
      this.getSchoolPeriodList()

    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.institutionListSelect = this.data.institution['@id'];
      this.schoolSessionListSelect = this.data.schoolSession['@id'];
      this.schoolPeriodListSelect = this.data.schoolPeriod['@id'];

    }
  }

  get fc(){
    return this.sequenceForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.sequenceForm.valid){
      this.saving = true;
      console.log(this.data);
      if (this.data){
        this._sequenceService.edit(this.data.id, this.sequenceForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Sequence edit with success !', 'success')
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
              if (v.propertyPath === this.sequenceForm.get('code')){
                this.sequenceForm.get('code')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }
      else {
        console.log(this.sequenceForm.value);
        this._sequenceService.create(this.sequenceForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Sequence add with success !', 'success')
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
                this.sequenceForm.get('code')?.setErrors({serverError: v.message})
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
  getSchoolSessionList(){
    this.schoolSessionService.getList().subscribe((data:any)=> {
        this.schoolSessionList = data['hydra:member'];
        this.schoolSessionList = this.schoolSessionList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getSchoolPeriodList(){
    this.schoolPeriodService.getList().subscribe((data:any)=> {
        this.schoolPeriodList = data['hydra:member'];
        this.schoolPeriodList = this.schoolPeriodList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
}
