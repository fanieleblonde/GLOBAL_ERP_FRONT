import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { StudregistrationService } from 'src/app/pages/school/services/studregistration.service';
import { YearService } from 'src/app/pages/school/services/year.service';
import { CountryService } from 'src/app/pages/school/services/country.service';
import { ReligionService } from 'src/app/pages/school/services/religion.service';
import { DiplomaService } from 'src/app/pages/school/services/diploma.service';
import { SchoolService } from 'src/app/pages/school/services/school.service';
import { RegimeService } from 'src/app/pages/school/services/regime.service';
import { OptionService } from 'src/app/pages/school/services/option.service';
import { SexService } from 'src/app/pages/school/services/sex.service';
import {SchoolClassService} from "../../../../services/school-class.service";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import { MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
  selector: 'app-studregistration-add-edit',
  templateUrl: './studregistration-add-edit.component.html',
  styleUrls: ['./studregistration-add-edit.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class StudregistrationAddEditComponent {
  studentForm: FormGroup;
  registrationForm: FormGroup;
  yearList: any[] = []
  sexList: any[] = []
  countryList: any[] = []
  religionList: any[] = []
  classeList: any[] = []
  diplomaList: any[] = []
  schoolList: any[] = []
  regimeList: any[] = []
  optionsList: any[] = []
  yearSelected:number | undefined;
  sexSelected:number | undefined;
  countrySelected:number | undefined;
  classeSelected:number | undefined;
  religionSelected:number | undefined;
  diplomaSelected:number | undefined;
  schoolSelected:number | undefined;
  regimeSelected:number | undefined;
  optionsSelected:number | undefined;
  saving = false;

  isLinear = true;

  editedDiploma = 0;
  editedYear = 0;
  editedCountry = 0;
  editedSex = 0;
  editedSchool = 0;
  editedClasse = 0;
  editedOptions = 0;
  editedRegime = 0;
  editedReligion = 0;


  public data: any;

  isSubmitted = false;

  isLoading = true;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _studregistrationService: StudregistrationService,
              private _dialogRef: MdbModalRef<StudregistrationAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearService: YearService,
              private countryService: CountryService,
              private schoolclassService: SchoolClassService,
              private religionService: ReligionService,
              private diplomaService: DiplomaService,
              private schoolService: SchoolService,
              private regimeService: RegimeService,
              private optionService: OptionService,
              private sexService: SexService,

  )
  {
    this.studentForm= this._fb.group({})
    this.registrationForm = this._fb.group({
      year: [null, [Validators.required]],
      matricule:  ['',[Validators.required, Validators.minLength(3)]],
      othermatricule: '',
      name: ['',[Validators.required, Validators.minLength(3)]],
      dob: ['', [Validators.required]],
      pob: '',
      sex: [null],
      country: [null],
      region: '',
      religion: [null],
      studentphone: '',
      studentemail: '',
      fathername: '',
      fatherphone: '',
      fatheremail: '',
      fatherprofession: '',
      mothername: '',
      motherphone: '',
      motheremail: '',
      motherprofession: '',
      guardianname: '',
      guardianphone: '',
      guardianemail: '',
      guardianprofession: '',

      hiddendiploma: '',
      hiddenyear: '',
      hiddensex: '',
      hiddencountry: '',
      hiddenreligion: '',
      hiddenschool: '',
      hiddenclasse: '',
      hiddenregime: '',
      hiddenoptions: '',


      diploma: [''],
      speciality: [''],
      center: [''],
      pvdiplome: [''],
      pvselection:[ ''],
      average: ['', [Validators.required]],
      ranks: [''],
      school: [''],
      classe: '',
      regime: '',
      options: '',
      registrationdate: ['', [Validators.required]],
      repeating: '',
      elementsprovided: '',

    })
  }

  get fc(){
    return this.registrationForm.controls;
  }

  ngOnInit(): void {


    this.registrationForm.patchValue(this.data);
    this.getYearList();
    this.getSexList();
    this.getCountryList();
    this.getReligionList();
    this.getClasseList();
    this.getDiplomaList();
    this.getSchoolList();
    this.getRegimeList();
    this.getOptionList();
    console.log(this.data)

      if (!this.data){
        this.getYearList();
        this.getSexList();
        this.getCountryList();
        this.getReligionList();
        this.getClasseList();
        this.getDiplomaList();
        this.getSchoolList();
        this.getRegimeList();
        this.getOptionList();


      }
      else {

        this._studregistrationService. getStudList(this.data.id, this.registrationForm.value).subscribe({
          next: (val: any) => {

            console.log(val['hydra:member'][0]['student'])
            let student = val['hydra:member'][0]['student'];

            console.log(student.year['@id'])
            this.registrationForm.get('matricule')?.setValue(student.matricule)
            this.registrationForm.get('othermatricule')?.setValue(student.othermatricule)
            this.registrationForm.get('name')?.setValue(student.name)
            this.registrationForm.get('dob')?.setValue(student.dob)
            this.registrationForm.get('pob')?.setValue(student.pob)
            this.registrationForm.get('region')?.setValue(student.region)
            this.registrationForm.get('studentphone')?.setValue(student.studentphone)
            this.registrationForm.get('studentemail')?.setValue(student.studentemail)
            this.registrationForm.get('fathername')?.setValue(student.fathername)
            this.registrationForm.get('fatheremail')?.setValue(student.fatheremail)
            this.registrationForm.get('fatherphone')?.setValue(student.fatherphone)
            this.registrationForm.get('fatherprofession')?.setValue(student.fatherprofession)
            this.registrationForm.get('mothername')?.setValue(student.mothername)
            this.registrationForm.get('motheremail')?.setValue(student.motheremail)
            this.registrationForm.get('motherphone')?.setValue(student.motherphone)
            this.registrationForm.get('motherprofession')?.setValue(student.motherprofession)
            this.registrationForm.get('guardianname')?.setValue(student.guardianname)
            this.registrationForm.get('guardianemail')?.setValue(student.guardianemail)
            this.registrationForm.get('guardianphone')?.setValue(student.guardianphone)
            this.registrationForm.get('guardianprofession')?.setValue(student.guardianprofession)
            this.registrationForm.get('year')?.setValue(student.year['id'])
            this.registrationForm.get('country')?.setValue(student.country['id'])
            this.registrationForm.get('sex')?.setValue(student.sex['id'])
            this.registrationForm.get('religion')?.setValue(student.religion['id'])

            this.isLoading = false;

          },
          // complete: () => {
          //   this.saving = false
          // },
          // error: (err: any) =>
          // {
          //   let errors: any[] = err['error']['violations'];

          //   errors.forEach((v) =>
          //   {
          //     if (v.propertyPath === 'email'){
          //       this.registrationForm.get('email')?.setErrors({serverError: v.message})
          //     }
          //     this.saving = false;

          //   })
          //   this.isLoading = false;
          // }
        })

        console.log(this.data)
        this.diplomaSelected = this.data.diploma['@id'];
        this.schoolSelected = this.data.school['@id'];
        this.regimeSelected = this.data.regime['@id'];
        this.optionsSelected = this.data.options['@id'];
        this.classeSelected = this.data.classe['@id'];
      }
    }



  onFormSubmit(event:any){
    this.isSubmitted = true;
    if (this.registrationForm.valid){
      console.log(JSON.stringify(this.registrationForm.value))
      console.log(this.registrationForm)
      console.log(this.data)
      if (this.data){
        if(event == 3){
          this.saving = true;
          let value = {... this.registrationForm.value, previousClass: this.data.classe.id, previousSchool: this.data.school.id, previousYear: this.registrationForm.value.year}
        this._studregistrationService.edit(this.data.id, value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Student Registration edit with success !', 'success')
            this._dialogRef.close(true);
            console.log('student')
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            let errors: any[] = err['error']['violations'];

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'email'){
                this.registrationForm.get('email')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }

        })
      }
    }
      else {
        console.log(event);
        // let element = event.target || event.scrElement || event.currentTarget;
        // let elementId = element.id;
        //console.log(event.target.elements)
        //console.log(event.target.querySelector("button").getAttribute("id"))
        // console.log(document.getElementById('3')?.id);
        console.log(this.data)
        if(event == 3){
          this.saving = true;
          this._studregistrationService.create(this.registrationForm.value).subscribe({
            next: (val: any) => {
              this._coreService.showSuccess('Student Registration add with success !', 'success')
              this._dialogRef.close(true);
            },
            complete: () => {
              this.saving = false
            },
            error: (err: any) =>
            {
               this.saving = false;
              let errors: any[] = err['error']['violations'];
              console.log(err);

              errors.forEach((v) =>
              {
                console.log(v.message);
                console.log(v.propertyPath)
                if (v.propertyPath === 'email'){
                  this.studentForm.get('email')?.setErrors({serverError: v.message})
                }
                if (v.propertyPath === 'matricule'){
                  this.studentForm.get('matricule')?.setErrors({serverError: v.message})
                }

              })
            }
          })
        }


      }

    }
  }

  onSelectDiploma(event: any){
    console.log(event); 
    this.registrationForm.get('hiddendiploma')?.setValue(event['name'])
    this.editedDiploma = 1;
    //this.data.diploma = (event['@id'])
    //console.log(this.data)
  }

  onSelectYear(event: any){
      this.registrationForm.get('hiddenyear')?.setValue(event['year'])
      this.editedYear = 1;
  }
  onSelectSex(event: any){
    this.registrationForm.get('hiddensex')?.setValue(event['name'])
    this.editedSex = 1;
}
onSelectCountry(event: any){
  this.registrationForm.get('hiddencountry')?.setValue(event['name'])
  this.editedCountry = 1;
}
onSelectReligion(event: any){
  this.registrationForm.get('hiddenreligion')?.setValue(event['name'])
  this.editedReligion = 1;
}
onSelectSchool(event: any){
  this.registrationForm.get('hiddenschool')?.setValue(event['name'])
  this.editedSchool = 1;
}
onSelectClasse(event: any){
  this.registrationForm.get('hiddenclasse')?.setValue(event['name'])
  this.editedClasse = 1;
}
onSelectRegime(event: any){
  this.registrationForm.get('hiddenregime')?.setValue(event['regime'])
  this.editedRegime = 1;
}
onSelectOptions(event: any){
  this.registrationForm.get('hiddenoptions')?.setValue(event['name'])
  this.editedOptions = 1;
}


  getYearList(){
    this.yearService.getYearList().subscribe((data:any)=> {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['id'];
          return v;

        })
      },
      error => console.log(error)
    )
  }


  getSexList(){
    this.sexService.getList().subscribe((data:any)=> {
        this.sexList = data['hydra:member'];
        this.sexList = this.sexList.map((v) => {
          v.id = v['id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getCountryList(){
    this.countryService.getList().subscribe((data:any)=> {
        this.countryList = data['hydra:member'];
        this.countryList = this.countryList.map((v) => {
          v.id = v['id'];
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
          //this.registrationForm.get('hiddendiploma')?.setValue(v['name']);
          //console.log(this.registrationForm)
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

  getOptionList(){
    this.optionService.getOptionList().subscribe((data:any)=> {
        this.optionsList = data['hydra:member'];
        this.optionsList = this.optionsList.map((v) => {
          v.id = v['@id'];
          return v;
        })
        this.isLoading = false;
      },
      error => console.log(error)
    )
  }

  getReligionList(){
    this.religionService.getReligionList().subscribe((data:any)=> {
        this.religionList = data['hydra:member'];
        this.religionList = this.religionList.map((v) => {
          v.id = v['id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getClasseList(){
    this.schoolclassService.getList().subscribe((data:any)=> {
        this.classeList = data['hydra:member'];
        this.classeList = this.classeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getRegimeList(){
    this.regimeService.getRegimeList().subscribe((data:any)=> {
        this.regimeList = data['hydra:member'];
        this.regimeList = this.regimeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


}
