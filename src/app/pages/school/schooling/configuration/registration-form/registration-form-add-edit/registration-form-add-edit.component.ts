import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {RegistrationFormService} from "../../../../services/registration-form.service";
import { SpecialityService } from 'src/app/pages/school/services/speciality.service';
import {BuildingService} from "../../../../services/building.service";

@Component({
  selector: 'app-registration-form-add-edit',
  templateUrl: './registration-form-add-edit.component.html',
  styleUrls: ['./registration-form-add-edit.component.scss']
})
export class RegistrationFormAddEditComponent {
  registrationformForm : FormGroup;
  specialityList: any[] = [];
  specialityListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _registrationformService: RegistrationFormService,
              private _dialogRef: MdbModalRef<RegistrationFormAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private specialityService: BuildingService
  )
  {
    this.registrationformForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      speciality: '',
      isshowreceipt: '',
      amount: ['', [Validators.required]],
    })

  }

  ngOnInit() : void{
    this.registrationformForm.patchValue(this.data);
    this.getSpecialityList();

    if (!this.data){
      this.getSpecialityList();
    }
    else {
      this.specialityListSelect = this.data.speciality['@id'];
    }
  }

  get fc(){
    return this.registrationformForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.registrationformForm.valid){
      this.saving = true;
      this.registrationformForm.value['isshowreceipt'] = this.registrationformForm.value['isshowreceipt'] == "true"
      if (this.data){
        this._registrationformService.edit(this.data.id, this.registrationformForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Registration Form edit with success !', 'success')
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
              if (v.propertyPath === this.registrationformForm.get('name')){
                this.registrationformForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._registrationformService.create(this.registrationformForm.value).subscribe({
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
                this.registrationformForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

  getSpecialityList(){
    this.specialityService.getList().subscribe((data:any)=> {
        this.specialityList = data['hydra:member'];
        this.specialityList = this.specialityList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


}
