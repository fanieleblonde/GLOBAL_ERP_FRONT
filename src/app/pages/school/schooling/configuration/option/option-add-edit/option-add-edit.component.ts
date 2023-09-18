import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {OptionService} from "../../../../services/option.service";
import { SpecialityService } from 'src/app/pages/school/services/speciality.service';
import { LevelService } from 'src/app/pages/school/services/level.service';

@Component({
  selector: 'app-option-add-edit',
  templateUrl: './option-add-edit.component.html',
  styleUrls: ['./option-add-edit.component.scss']
})
export class OptionAddEditComponent {
  optionForm : FormGroup;

  specialityList: any[] = [];
  levelList: any[] = [];

  specialityListSelect:number | undefined;
  levelListSelect:number | undefined;

  saving = false;
  public data: any;
  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _optionService: OptionService,
              private _dialogRef: MdbModalRef<OptionAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private specialityService: SpecialityService,
              private levelService: LevelService
  )
  {
    this.optionForm = this._fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      speciality:'',
      level: ['', [Validators.required]],
    })
  }

  ngOnInit() : void{
    this.optionForm.patchValue(this.data);
    this.getSpecialityList();
    this.getLevelList();

    if (!this.data){
      this.getSpecialityList();
      this.getLevelList();
    }
    else {
      this.specialityListSelect = this.data.speciality['@id'];
      this.levelListSelect = this.data.level['@id'];
    }
  }

  get fc(){
    return this.optionForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.optionForm.valid){
      this.saving = true;
      if (this.data){
        this._optionService.edit(this.data.id, this.optionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Option edit with success !', 'success')
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
              if (v.propertyPath === this.optionForm.get('code')){
                this.optionForm.get('code')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === this.optionForm.get('name')){
                this.optionForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }
      else {
        this._optionService.create(this.optionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Option add with success !', 'success')
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
                this.optionForm.get('code')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === 'name'){
                this.optionForm.get('name')?.setErrors({serverError: v.message})
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

  getLevelList(){
    this.levelService.getLevelList().subscribe((data:any)=> {
        this.levelList = data['hydra:member'];
        this.levelList = this.levelList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
