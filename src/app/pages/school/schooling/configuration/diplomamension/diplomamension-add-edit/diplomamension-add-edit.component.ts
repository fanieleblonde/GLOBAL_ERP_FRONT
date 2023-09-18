import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { RegistrationFormService } from 'src/app/pages/school/services/registration-form.service';
import { SpecialityService } from 'src/app/pages/school/services/speciality.service';
import { DiplomamensionService } from 'src/app/pages/school/services/diplomamension.service';
import { SchoolYearService } from 'src/app/pages/school/services/school-year.service';
import { DiplomaService } from 'src/app/pages/school/services/diploma.service';

@Component({
  selector: 'app-diplomamension-add-edit',
  templateUrl: './diplomamension-add-edit.component.html',
  styleUrls: ['./diplomamension-add-edit.component.scss']
})
export class DiplomamensionAddEditComponent {
  diplomamensionForm : FormGroup;
  yearList: any[] = [];
  diplomaList: any[] = [];
  yearSelected:number | undefined;
  diplomaSelected:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _diplomamensionService: DiplomamensionService,
              private _dialogRef: MdbModalRef<DiplomamensionAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private schoolyearService: SchoolYearService,
              private diplomaService: DiplomaService
  )
  {
    this.diplomamensionForm = this._fb.group({
      year: '',
      diploma: '',
      mention: '',
      minaverage: '',
      maxaverage: '',
      status: '',
    })

  }

  ngOnInit() : void{
    this.diplomamensionForm.patchValue(this.data);
    this.getSchoolYearList();
    this.getDiplomaList();

    if (!this.data){
      this.getSchoolYearList();
    this.getDiplomaList();
    }
    else {
      this.yearSelected = this.data.year['@id'];
      this.diplomaSelected = this.data.diploma['@id'];
    }
  }

  get fc(){
    return this.diplomamensionForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.diplomamensionForm.valid){
      this.saving = true;
      this.diplomamensionForm.value['status'] = this.diplomamensionForm.value['status'] == "true"
      if (this.data){
        this._diplomamensionService.edit(this.data.id, this.diplomamensionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Diploma Mension edit with success !', 'success')
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
              if (v.propertyPath === this.diplomamensionForm.get('name')){
                this.diplomamensionForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._diplomamensionService.create(this.diplomamensionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Registration Form add with success !', 'success')
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
                this.diplomamensionForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }

}

getSchoolYearList(){
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
