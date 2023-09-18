import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {CountryService} from "../../../../school/services/country.service";

@Component({
  selector: 'app-country-add-edit',
  templateUrl: './country-add-edit.component.html',
  styleUrls: ['./country-add-edit.component.scss']
})
export class CountryAddEditComponent {
  countryForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _countyService: CountryService,
              private _dialogRef: MdbModalRef<CountryAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.countryForm = this._fb.group({
      alpha2:'',
      alpha3:'',
      numericCode:'',
      name: ['', [Validators.required, Validators.minLength(3)]],
      officialName:'',
    })

  }

  ngOnInit() : void{
    this.countryForm.patchValue(this.data);
  }

  get fc(){
    return this.countryForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.countryForm.valid){
      this.saving = true;
      if (this.data){
        this._countyService.edit(this.data.id, this.countryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('country edit with success !', 'success')
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
              if (v.propertyPath === this.countryForm.get('name')){
                this.countryForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._countyService.create(this.countryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('country add with success !', 'success')
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
                this.countryForm.get('code')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === 'name'){
                this.countryForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

}
