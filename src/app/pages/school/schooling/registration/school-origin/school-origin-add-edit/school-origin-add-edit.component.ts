import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { SchoolOriginService } from 'src/app/pages/school/services/school-origin.service';
import { CountryService } from 'src/app/pages/school/services/country.service';

@Component({
  selector: 'app-school-origin-add-edit',
  templateUrl: './school-origin-add-edit.component.html',
  styleUrls: ['./school-origin-add-edit.component.scss']
})
export class SchoolOriginAddEditComponent {
  schoolOriginForm : FormGroup;
  countryList: any[] = [];
  countrySelected : number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _schoolOriginService: SchoolOriginService,
              private _dialogRef: MdbModalRef<SchoolOriginAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private countryService: CountryService
  )
  {
    this.schoolOriginForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      country: [''],
      postcode: [''],
      city: [''],
      phone: [''],
      fax: [''],
      email: ['', [Validators.email]],
    })

  }

  ngOnInit() : void{
    this.schoolOriginForm.patchValue(this.data);
    //this.getManagerTypeList();

    if (!this.data){
      this.getCountryList();
    }
    else {
      this.countrySelected = this.data.country['@id'];
    }
  }

  get fc(){
    return this.schoolOriginForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.schoolOriginForm.valid){
      this.saving = true;
      if (this.data){
        this._schoolOriginService.edit(this.data.id, this.schoolOriginForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('School Origin edit with success !', 'success')
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
                this.schoolOriginForm.get('email')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._schoolOriginService.create(this.schoolOriginForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('School Origin add with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            let errors: any[] = err['error']['violations'];
            console.log(err);

            errors.forEach((v) =>
            {
              console.log(v.message);
              console.log(v.propertyPath)
              if (v.propertyPath === 'email'){
                this.schoolOriginForm.get('email')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
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

}
