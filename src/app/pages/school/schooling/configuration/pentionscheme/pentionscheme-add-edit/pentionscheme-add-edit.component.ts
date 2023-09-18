import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import { CoreService } from 'src/app/core/core.service';
import { PentionschemeService } from 'src/app/pages/school/services/pentionscheme.service';
import { SchoolService } from 'src/app/pages/school/services/school.service';
import { CampusService } from 'src/app/pages/school/services/campus.service';
import { CountryService } from 'src/app/pages/school/services/country.service';

@Component({
  selector: 'app-pentionscheme-add-edit',
  templateUrl: './pentionscheme-add-edit.component.html',
  styleUrls: ['./pentionscheme-add-edit.component.scss']
})
export class PentionschemeAddEditComponent {
  pentionschemeForm : FormGroup;
  schoolList: any[] = [];
  campusList: any[] = [];
  countryList: any[] = [];
  schoolListSelect:number | undefined;
  campusListSelect:number | undefined;
  countryListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _pentionschemeService: PentionschemeService,
              private _dialogRef: MdbModalRef<PentionschemeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private _schoolService: SchoolService,
              private _campusService: CampusService,
              private _countryService: CountryService,
  )
  {
    this.pentionschemeForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      remark: ['', [Validators.required, Validators.minLength(3)]],
      schools: [''],
      campuses: [''],
      countries: ['']
    })

  }

  ngOnInit() : void{
    this.pentionschemeForm.patchValue(this.data);
    console.log(this.data)
    this.getSchoolList();
    this.getCampusList();
    this.getCountryList();

    if (!this.data){
      this.getSchoolList();
      this.getCampusList();
      this.getCountryList();
    }
    else {
      this.schoolListSelect = this.data.schools.map((c:any)=> c['@id']);
      this.campusListSelect = this.data.campuses.map((c:any)=> c['@id']);
      this.countryListSelect = this.data.countries.map((c:any)=> c['@id']);
      console.log(this.countryListSelect)
    }

  }

  get fc(){
    return this.pentionschemeForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.pentionschemeForm.valid){
      this.saving = true;
      console.log(this.pentionschemeForm.value)
      if (this.data){
        this._pentionschemeService.edit(this.data.id, this.pentionschemeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Pention Scheme edit with success !', 'success')
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
              if (v.propertyPath === this.pentionschemeForm.get('name')){
                this.pentionschemeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._pentionschemeService.create(this.pentionschemeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Pention Scheme add with success !', 'success')
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
                this.pentionschemeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }


  getSchoolList(){
    this._schoolService.getList().subscribe((data:any)=> {
        this.schoolList = data['hydra:member'];
        this.schoolList = this.schoolList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getCampusList(){
    this._campusService.getCampusList().subscribe((data:any)=> {
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
    this._countryService.getList().subscribe((data:any)=> {
        this.countryList = data['hydra:member'];
        this.countryList = this.countryList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
