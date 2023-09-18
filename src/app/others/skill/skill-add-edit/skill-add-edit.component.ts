import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SkillService} from "../../../services/skill.service";
import {SkillTypeService} from "../../../services/skill-type.service";

@Component({
  selector: 'app-skill-add-edit',
  templateUrl: './skill-add-edit.component.html',
  styleUrls: ['./skill-add-edit.component.scss']
})
export class SkillAddEditComponent {
  skillForm : FormGroup;
  skilltypeList: any[] = [];
  skilltypeListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _skillService: SkillService,
              private _dialogRef: MdbModalRef<SkillAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private skilltypeService: SkillTypeService
  )
  {
    this.skillForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      skilltype: '',
    })

  }

  ngOnInit() : void{
    this.skillForm.patchValue(this.data);
    this.getSkillList();

    if (!this.data){
      this.getSkillList();
    }
    else {
      this.skilltypeListSelect = this.data.skilltype['@id'];
    }
  }

  get fc(){
    return this.skillForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.skillForm.valid){
      this.saving = true;
      if (this.data){
        this._skillService.edit(this.data.id, this.skillForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Skill edit with success !', 'success')
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
              if (v.propertyPath === this.skillForm.get('name')){
                this.skillForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._skillService.create(this.skillForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Skill add with success !', 'success')
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
                this.skillForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

  getSkillList(){
    this.skilltypeService.getList().subscribe((data:any)=> {
        this.skilltypeList = data['hydra:member'];
        this.skilltypeList = this.skilltypeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
}
