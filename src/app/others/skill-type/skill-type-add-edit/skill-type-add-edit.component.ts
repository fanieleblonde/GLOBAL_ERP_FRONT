import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SkillTypeService} from "../../../services/skill-type.service";

@Component({
  selector: 'app-skill-type-add-edit',
  templateUrl: './skill-type-add-edit.component.html',
  styleUrls: ['./skill-type-add-edit.component.scss']
})
export class SkillTypeAddEditComponent {
  skillTypeForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _skillTypenService: SkillTypeService,
              private _dialogRef: MdbModalRef<SkillTypeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.skillTypeForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.skillTypeForm.patchValue(this.data);
  }

  get fc(){
    return this.skillTypeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.skillTypeForm.valid){
      this.saving = true;
      if (this.data){
        this._skillTypenService.edit(this.data.id, this.skillTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Skill type edit with success !', 'success')
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
              if (v.propertyPath === this.skillTypeForm.get('name')){
                this.skillTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._skillTypenService.create(this.skillTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Skill type add with success !', 'success')
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
                this.skillTypeForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
