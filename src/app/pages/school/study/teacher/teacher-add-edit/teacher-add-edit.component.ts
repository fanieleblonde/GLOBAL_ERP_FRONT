import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {InstitutionService} from "../../../services/institution.service";
import {SexService} from "../../../services/sex.service";
import {TeacherService} from "../../../services/teacher.service";
import {CivilityService} from "../../../services/civility.service";
import {CountryService} from "../../../services/country.service";
import {MaritalStatusService} from "../../../services/marital-status.service";
import {DiplomaService} from "../../../services/diploma.service";
import {IdentityTypeService} from "../../../services/identity-type.service";
import {SubjectService} from "../../../services/subject.service";

@Component({
  selector: 'app-teacher-add-edit',
  templateUrl: './teacher-add-edit.component.html',
  styleUrls: ['./teacher-add-edit.component.scss']
})
export class TeacherAddEditComponent {
  teacherForm : FormGroup;

  institutionList : any[] = []
  sexList : any[] = []
  civilityList : any[] = []
  countryList : any[] = []
  maritalStatusList : any[] = []
  diplomaList : any[] = []
  identityTypeList : any[] = []

  subjectList : any[] = []


  subjectListSelect:number | undefined;
  institutionListSelect:number | undefined;

  sexListSelect:number | undefined;

  civilityListSelect:number | undefined;
  countrySelect:number | undefined;
  maritalStatusListSelect:number | undefined;
  diplomaListSelect:number | undefined;
  identityTypeListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _teacherService: TeacherService,
              private _institutionService: InstitutionService,
              private _dialogRef: MdbModalRef<TeacherAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private sexservice: SexService,
              private civilityservice: CivilityService,
              private countryservice: CountryService,
              private maritalStatusservice: MaritalStatusService,
              private diplomaservice: DiplomaService,
              private identityTypeservice: IdentityTypeService,
              private subjectservice: SubjectService,





  )
  {
    this.teacherForm = this._fb.group({
      institution:'',
      name: ['', [Validators.required, Validators.minLength(3)]],
      registrationNumber:'',
      sex:'',
      civility:'',
      dob:'',
      bornTowards:'',
      pob:'',
      country:'',
      phone:'',
      email:'',
      occupation:'',
      address:'',
      quarter:'',
      city:'',
      maritalStatus:'',
      partnerName:'',
      partnerPhone:'',
      partnerEmail:'',
      numberOfChildren:'',
      diploma:'',
      subject:'',
      speciality:'',
      identityType:'',
      idNumber:'',
      placeOfIssue:'',
      issueAt:'',
      expirationAt:'',

    })

  }

  ngOnInit() : void{
    this.teacherForm.patchValue(this.data);
    this.getInstitutionList();
    this.getSexList();
    this.getCivilityList();
    this.getCountryList();
    this.getMaritalStatusList();
    this.getDiplomaList();
    this.getIdentityTypeList();
    this.getSubjectTypeList();


    if (!this.data){
      this.getInstitutionList();
      this.getSexList();
      this.getCivilityList();
      this.getCountryList();
      this.getMaritalStatusList();
      this.getDiplomaList();
      this.getIdentityTypeList();
      this.getSubjectTypeList();


    }
    else {
      this.institutionListSelect = this.data.institution['@id'];
      this.sexListSelect = this.data.sex['@id'];
      this.civilityListSelect = this.data.civility['@id'];
      this.countrySelect = this.data.country['@id'];
      this.maritalStatusListSelect = this.data.maritalStatus['@id'];
      this.diplomaListSelect = this.data.diploma['@id'];
      this.identityTypeListSelect = this.data.identityType['@id'];
      this.subjectListSelect = this.data.subject['@id'];



    }
  }

  get fc(){
    return this.teacherForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.teacherForm.valid){
      this.saving = true;
      if (this.data){
        this._teacherService.edit(this.data.id, this.teacherForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Teacher edit with success !', 'success')
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
              if (v.propertyPath === this.teacherForm.get('name')){
                this.teacherForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._teacherService.create(this.teacherForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Teacher add with success !', 'success')
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
                this.teacherForm.get('name')?.setErrors({serverError: v.message})
              }
            })
          }
        })
      }

    }
  }
  getSubjectTypeList(){
    this.subjectservice.getList().subscribe((data:any)=> {
        this.subjectList = data['hydra:member'];
        this.subjectList = this.subjectList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getInstitutionList(){
    this._institutionService.getList().subscribe((data:any)=> {
        this.institutionList = data['hydra:member'];
        this.institutionList = this.institutionList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getSexList(){
    this.sexservice.getList().subscribe((data:any)=> {
        this.sexList = data['hydra:member'];
        this.sexList = this.sexList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getCivilityList(){
    this.civilityservice.getList().subscribe((data:any)=> {
        this.civilityList = data['hydra:member'];
        this.civilityList = this.civilityList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getCountryList(){
    this.countryservice.getList().subscribe((data:any)=> {
        this.countryList = data['hydra:member'];
        this.countryList = this.countryList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getMaritalStatusList(){
    this.maritalStatusservice.getList().subscribe((data:any)=> {
        this.maritalStatusList = data['hydra:member'];
        this.maritalStatusList = this.maritalStatusList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getDiplomaList(){
    this.diplomaservice.getDiplomaList().subscribe((data:any)=> {
        this.diplomaList = data['hydra:member'];
        this.diplomaList = this.diplomaList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getIdentityTypeList(){
    this.identityTypeservice.getList().subscribe((data:any)=> {
        this.identityTypeList = data['hydra:member'];
        this.identityTypeList = this.identityTypeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
