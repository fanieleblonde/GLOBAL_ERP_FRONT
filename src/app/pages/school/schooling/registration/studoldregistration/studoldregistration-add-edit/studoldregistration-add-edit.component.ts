import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { StudoldregistrationService } from 'src/app/pages/school/services/studoldregistration.service';
import { YearService } from 'src/app/pages/school/services/year.service';
import { ClasseService } from 'src/app/pages/school/services/classe.service';
import { RegimeService } from 'src/app/pages/school/services/regime.service';
import { OptionService } from 'src/app/pages/school/services/option.service';
import { StudregistrationService } from 'src/app/pages/school/services/studregistration.service';
import { SchoolYearService } from 'src/app/pages/school/services/school-year.service';
import {SchoolClassService} from "../../../../services/school-class.service";

@Component({
  selector: 'app-studoldregistration-add-edit',
  templateUrl: './studoldregistration-add-edit.component.html',
  styleUrls: ['./studoldregistration-add-edit.component.scss']
})
export class StudoldregistrationAddEditComponent {
  studoldregistrationForm: FormGroup;
  studregistrationList: any[] = []
  yearList: any[] = []
  classeList: any[] = []
  currentyearList: any[] = []
  currentclasseList: any[] = []
  newregimeList: any[] = []
  newoptionsList: any[] = []
  studregistrationSelected:number | undefined;
  yearSelected:number | undefined;
  classeSelected:number | undefined;
  currentyearSelected:number | undefined;
  currentclasseSelected:number | undefined;
  newregimeSelected:number | undefined;
  newoptionsSelected:number | undefined;


  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _studoldregistrationService: StudoldregistrationService,
              private _dialogRef: MdbModalRef<StudoldregistrationAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private schoolyearService: SchoolYearService,
              private schoolclassService: SchoolClassService,
              private regimeService: RegimeService,
              private optionService: OptionService,
              private studregistrationService: StudregistrationService,

  ){
    this.studoldregistrationForm = this._fb.group({
      studregistration: '',
      year: '',
      classe: '',
      currentyear: '',
      currentclasse: '',
      regime: '',
      options: '',
      elementsprovided: '',
      transactions: '',
     })
  }

  get fc(){
    return this.studoldregistrationForm.controls;
  }

  ngOnInit(): void {
    this.studoldregistrationForm.patchValue(this.data);
    this.getStudregistrationList();
    this.getClasseList();
    this.getYearList();
    this.getCurrentyearList();
    this.getCurrentClasseList();
    this.getRegimeList();
    this.getOptionList();
    console.log(this.data)

      if (!this.data){
        this.getStudregistrationList();
        this.getClasseList();
        this.getYearList();
        this.getCurrentyearList();
        this.getCurrentClasseList();
        this.getRegimeList();
        this.getOptionList();
      }
      else {
        console.log(this.data.studregistration['@id']);
        //this.studoldregistrationForm.get('studregistration')?.setValue(this.data.studregistration['@id'])
        this.studregistrationSelected = this.data.studregistration['@id'];
        this.yearSelected = this.data.year['@id'];
        this.classeSelected = this.data.classe['@id'];
        this.currentyearSelected = this.data.currentyear['@id'];
        this.currentclasseSelected = this.data.currentclasse['@id'];
        this.newregimeSelected = this.data.regime['@id'];
        this.newoptionsSelected = this.data.options['@id'];
      }
  }

  onSelect(event: any){
    console.log(event);

    //let curl = '/api/studregistration/get/'+ event.id;
    //console.log(event.student.year);
    // this.studoldregistrationForm.get('studregistration')?.setValue(event.id)
    this.studoldregistrationForm.get('studregistration')?.setValue(event['@id'])
    this.studoldregistrationForm.get('year')?.setValue(event.student.year['@id'])
    this.studoldregistrationForm.get('classe')?.setValue(event.classe['@id'])



}


onFormSubmit(){
  this.isSubmitted = true;
  if (this.studoldregistrationForm.valid){
    this.saving = true;
    if (this.data){
      let value = {...this.studoldregistrationForm.value, previousClass:this.data.currentclasse.id, previousYear:this.data.currentyear.id}
      this._studoldregistrationService.edit(this.data.id, value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Old Student Registration edit with success !', 'success')
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
            if (v.propertyPath === 'email'){
              this.studoldregistrationForm.get('email')?.setErrors({serverError: v.message})
            }


          })
        }
      })
    }
    else {
      this._studoldregistrationService.create(this.studoldregistrationForm.value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Old Student Registration add with success !', 'success')
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

          // errors.forEach((v) =>
          // {
          //   console.log(v.message);
          //   console.log(v.propertyPath)
          //   if (v.propertyPath === 'email'){
          //     this.studoldregistrationForm.get('email')?.setErrors({serverError: v.message})
          //   }

          // })
        }
      })
    }

  }
}


// getStudregistrationList(){
//   this.studregistrationService.getStudentList().subscribe((data:any)=> {
//     console.log(data['hydra:member'][0]['studregistration'][0]['student']);
//       this.studregistrationList = data['hydra:member'][0]['studregistration'];
//       this.studregistrationList = this.studregistrationList.map((v) => {
//         let curl = '/api/studregistration/get/'+ v['id'];
//         //console.log(curl);
//         //console.log(v['id'])
//         v.id = curl;
//         console.log(curl);
//         // v.id = curl;
//         return v;
//       })
//     },
//     error => console.log(error)
//   )
// }

getStudregistrationList(){
  this.studregistrationService.getStudregistrationList().subscribe((data:any)=> {
    console.log(data['hydra:member'])
    this.studregistrationList = data['hydra:member'];
          this.studregistrationList = this.studregistrationList.filter((e) => e.studregistration == null).map((v) => {
        v.id = v['@id'];
        return v;
      })
    },
    error => console.log(error)
  )
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

getCurrentyearList(){
  this.schoolyearService.getList().subscribe((data:any)=> {
      this.currentyearList = data['hydra:member'];
      this.currentyearList = this.currentyearList.map((v) => {
        v.id = v['@id'];
        return v;
      })
    },
    error => console.log(error)
  )
}

getCurrentClasseList(){
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

getRegimeList(){
  this.regimeService.getRegimeList().subscribe((data:any)=> {
      this.newregimeList = data['hydra:member'];
      this.newregimeList = this.newregimeList.map((v) => {
        v.id = v['@id'];
        return v;
      })
    },
    error => console.log(error)
  )
}

getOptionList(){
  this.optionService.getOptionList().subscribe((data:any)=> {
      this.newoptionsList = data['hydra:member'];
      this.newoptionsList = this.newoptionsList.map((v) => {
        v.id = v['@id'];
        return v;
      })
    },
    error => console.log(error)
  )
}

}
