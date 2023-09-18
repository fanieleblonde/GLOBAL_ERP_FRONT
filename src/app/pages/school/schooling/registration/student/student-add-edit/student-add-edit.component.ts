import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { StudentService } from 'src/app/pages/school/services/student.service';
import { YearService } from 'src/app/pages/school/services/year.service';
import { CountryService } from 'src/app/pages/school/services/country.service';
import { ReligionService } from 'src/app/pages/school/services/religion.service';
import { SexService } from 'src/app/pages/school/services/sex.service';
import { StudregistrationService } from 'src/app/pages/school/services/studregistration.service';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent {
  studentForm : FormGroup;
  yearList: any[] = []
  sexList: any[] = []
  countryList: any[] = []
  religionList: any[] = []

  yearSelected:number | undefined;
  sexSelected:number | undefined;
  countrySelected:number | undefined;
  religionSelected:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  isLoading = true;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _studentService: StudentService,
              private _studregistrationService: StudregistrationService,
              private _dialogRef: MdbModalRef<StudentAddEditComponent>,
              private _coreService: CoreService,
              private yearService: YearService,
              private countryService: CountryService,
              private religionService: ReligionService,
              private sexService: SexService,
              private translate: TranslateService
  ){
    this.studentForm = this._fb.group({
      year: '',
      matricule:  '',
      othermatricule: '',
      name: '',
      dob: '',
      pob: '',
      sex: '',
      country: '',
      region: '',
      religion: '' ,
      studentphone: '',
      studentemail: '',
  })

}

ngOnInit() : void{
  this.studentForm.patchValue(this.data);
  this.getYearList();
  this.getSexList();
  this.getCountryList();
  this.getReligionList();

  if (!this.data){
    this.getYearList();
    this.getSexList();
    this.getCountryList();
    this.getReligionList();
  }
  else{

    this._studregistrationService. getStudList(this.data.id, this.studentForm.value).subscribe({
      next: (val: any) => {

        console.log(val['hydra:member'][0]['student'])
        let student = val['hydra:member'][0]['student'];

        console.log(student.year['@id'])
        this.studentForm.get('matricule')?.setValue(student.matricule)
        this.studentForm.get('othermatricule')?.setValue(student.othermatricule)
        this.studentForm.get('name')?.setValue(student.name)
        this.studentForm.get('dob')?.setValue(student.dob)
        this.studentForm.get('pob')?.setValue(student.pob)
        this.studentForm.get('region')?.setValue(student.region)
        this.studentForm.get('studentphone')?.setValue(student.studentphone)
        this.studentForm.get('studentemail')?.setValue(student.studentemail)
        this.studentForm.get('year')?.setValue(student.year['id'])
        this.studentForm.get('country')?.setValue(student.country['id'])
        this.studentForm.get('sex')?.setValue(student.sex['id'])
        this.studentForm.get('religion')?.setValue(student.religion['id'])

        this.isLoading = false;

      },
     
    })

    this.yearSelected = this.data.year['@id'];
    this.sexSelected = this.data.sex['@id'];
    this.countrySelected = this.data.country['@id'];
    this.religionSelected = this.data.religion['@id'];
  }

}

get fc(){
  return this.studentForm.controls;
}

onFormSubmit(){
  this.isSubmitted = true;
  if (this.studentForm.valid){
    this.saving = true;
    if (this.data){
      this._studregistrationService.edit(this.data.id, this.studentForm.value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Student edit with success !', 'success')
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
            if (v.propertyPath === 'email'){
              this.studentForm.get('email')?.setErrors({serverError: v.message})
            }
            this.saving = false;

          })
        }
      })
    }
    else {
      this._studentService.create(this.studentForm.value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Student add with success !', 'success')
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
            if (v.propertyPath === 'name'){
              this.studentForm.get('name')?.setErrors({serverError: v.message})
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

}
