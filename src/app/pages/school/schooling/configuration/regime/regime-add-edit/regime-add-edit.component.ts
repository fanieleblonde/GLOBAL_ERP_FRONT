import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { RegimeService } from 'src/app/pages/school/services/regime.service';
import { CampusService } from 'src/app/pages/school/services/campus.service';
import { SchoolService } from 'src/app/pages/school/services/school.service';
import { CountryService } from 'src/app/pages/school/services/country.service';

@Component({
  selector: 'app-regime-add-edit',
  templateUrl: './regime-add-edit.component.html',
  styleUrls: ['./regime-add-edit.component.scss']
})
export class RegimeAddEditComponent {
  regimeForm : FormGroup;
  campusList: any[] = [];
  schoolList: any[] = [];
  countryList: any[] = [];
  campusListSelect:number | undefined;
  countryListSelect:number | undefined;
  schoolListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _regimeService: RegimeService,
              private _dialogRef: MdbModalRef<RegimeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private campusService: CampusService,
              private schoolService: SchoolService,
              private countryService: CountryService
  )
  {
    this.regimeForm = this._fb.group({
      regime: '',
      remarks: '', 
      campus: '', 
      country: '', 
      school: '', 
    })

  }

  ngOnInit() : void{
    this.regimeForm.patchValue(this.data);
    this.getCampusList();
    this.getCountryList();
    this.getSchoolList();

    if (!this.data){
      this.getCampusList();
      this.getCountryList();
      this.getSchoolList();

    }
    else {
      this.campusListSelect = this.data.campus['@id'];
      this.countryListSelect = this.data.country['@id'];
      this.schoolListSelect = this.data.school['@id'];
    }
  }

  get fc(){
    return this.regimeForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.regimeForm.valid){
      this.saving = true;
      if (this.data){
        this._regimeService.edit(this.data.id, this.regimeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Regime edit with success !', 'success')
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
              if (v.propertyPath === this.regimeForm.get('name')){
                this.regimeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._regimeService.create(this.regimeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Regime add with success !', 'success')
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
              if (v.propertyPath === 'name'){
                this.regimeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

  getCampusList(){
    this.campusService.getCampusList().subscribe((data:any)=> {
        this.campusList = data['hydra:member'];
        this.campusList = this.campusList.map((v) => {
          v.id = v['@id'];
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
          v.id = v['@id'];
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

}
