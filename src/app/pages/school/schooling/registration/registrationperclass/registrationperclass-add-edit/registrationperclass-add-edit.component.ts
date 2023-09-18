import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { RegistrationperclassService } from 'src/app/pages/school/services/registrationperclass.service';
import { SchoolYearService } from 'src/app/pages/school/services/school-year.service';
import { ClasseService } from 'src/app/pages/school/services/classe.service';
import { RegimeService } from 'src/app/pages/school/services/regime.service';
import { OptionService } from 'src/app/pages/school/services/option.service';
import { StudregistrationService } from 'src/app/pages/school/services/studregistration.service';
import { StudoldregistrationService } from 'src/app/pages/school/services/studoldregistration.service';
import {SchoolClassService} from "../../../../services/school-class.service";

@Component({
  selector: 'app-registrationperclass-add-edit',
  templateUrl: './registrationperclass-add-edit.component.html',
  styleUrls: ['./registrationperclass-add-edit.component.scss']
})
export class RegistrationperclassAddEditComponent {
  registrationPerClassForm: FormGroup;
  studentlistList: any[] = []
  classeList: any[] = []
  studentlistListFiltered: any[] = [];
  classeListFiltered: any[] = [];
  yearList: any[] = []
  currentclasseList: any[] = []
  currentyearList: any[] = []
  regimeList: any[] = []
  optionList: any[] = []
  studentlistSelected:number | undefined;
  classeSelected:number | undefined;
  yearSelected:number | undefined;
  currentclasseSelected:number | undefined;
  currentyearSelected:number | undefined;
  newregimeSelected:number | undefined;
  newoptionsSelected:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _registrationPerClassService: RegistrationperclassService,
              private _dialogRef: MdbModalRef<RegistrationperclassAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearService: SchoolYearService,
              private schoolclassService: SchoolClassService,
              private regimeService: RegimeService,
              private optionsService: OptionService,
              private studentService: StudregistrationService,
              private _studoldregistrationService: StudoldregistrationService,
  )
  {
    this.registrationPerClassForm = this._fb.group({
      year: '',
      classe: '',
      studentlist: '',
      currentyear: '',
      currentclasse: '',
      regime: '',
      options: '',
      transactions: '',
    })

  }

  get fc(){
    return this.registrationPerClassForm.controls;
  }

  ngOnInit() : void{
    this.registrationPerClassForm.patchValue(this.data);
    this.getOldclasseList();
    this.getOldyearList();
    this.getCurrentclasseList();
    this.getCurrentyearList();
    this.getStudentList();
    this.getRegimeList();
    this.getOptionList();

    if (!this.data){
      this.getOldclasseList();
      this.getOldyearList();
      this.getCurrentclasseList();
      this.getCurrentyearList();
      this.getStudentList();
      this.getRegimeList();
      this.getOptionList();
    }
    else {
      console.log(this.data['@id'])
      // this.studentlistSelected = this.data.studregistration['@id'];
      this.registrationPerClassForm.get('studregistration')?.setValue(this.data)
      this.yearSelected = this.data.year['@id'];
      this.classeSelected = this.data.classe['@id'];
      this.currentyearSelected = this.data.currentyear['@id'];
      this.currentclasseSelected = this.data.currentclasse['@id'];
      this.newregimeSelected = this.data.regime['@id'];
      this.newoptionsSelected = this.data.options['@id'];
  }
}




  onFormSubmit(){
    this.isSubmitted = true;
    if (this.registrationPerClassForm.valid){
      this.saving = true;
      if (this.data){
        this._studoldregistrationService.edit(this.data.id, this.registrationPerClassForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Registration Per Class edit with success !', 'success')
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
                this.registrationPerClassForm.get('email')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._registrationPerClassService.create(this.registrationPerClassForm.value).subscribe({
          next: (val: any) => {
            console.log(val)
            this._coreService.showSuccess('Registration Per Class add with success !', 'success')
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
                this.registrationPerClassForm.get('email')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }


  getOldyearList(){
    this.yearService.getList().subscribe((data:any)=> {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['@id'];
          return v;
        })
        console.log(this.yearList)
      },
      error => console.log(error)
    )
  }

  applyYearFilter(event:any){
    console.log('BJR')
    //let yearId = event
    this.studentlistListFiltered = this.studentlistList.filter((studentlist: any)=> studentlist.classe['@id']===this.classeSelected && studentlist.student.year['@id']===this.yearSelected)
  }


  getOldclasseList(){
    this.schoolclassService.getList().subscribe((data:any)=> {
        this.classeList = data['hydra:member'];
        this.classeList = this.classeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
        this.classeListFiltered = this.classeList
        console.log(this.classeList)
      },
      error => console.log(error)
    )
  }

  applyClasseFilter(event:any){
    console.log('BJR')
    //let classeId = event
    this.studentlistListFiltered = this.studentlistList.filter((studentlist: any)=> (this.classeSelected ? studentlist.classe['@id']===this.classeSelected : true) && (this.yearSelected? studentlist.student.year['@id']===this.yearSelected : true))
  }

  getStudentList(){
    this._studoldregistrationService.getStudoldregistrationList().subscribe((data:any)=> {
        this.studentlistList = data['hydra:member'];
        this.studentlistList = this.studentlistList.filter((e) => e.studregistration == null).map((v) => {
          v.id = v['@id'];
          return v;
        })
        this.studentlistListFiltered = this.studentlistList
        console.log(this.studentlistList)
      },
      error => console.log(error)
    )
  }

  getCurrentclasseList(){
    this.schoolclassService.getList().subscribe((data:any)=> {
        this.currentclasseList = data['hydra:member'];
        this.currentclasseList = this.currentclasseList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


  getCurrentyearList(){
    this.yearService.getList().subscribe((data:any)=> {
        this.currentyearList = data['hydra:member'];
        this.currentyearList = this.currentyearList.map((v) => {
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


  getOptionList(){
    this.optionsService.getOptionList().subscribe((data:any)=> {
        this.optionList = data['hydra:member'];
        this.optionList = this.optionList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }




}

