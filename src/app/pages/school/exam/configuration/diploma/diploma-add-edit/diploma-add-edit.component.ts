import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { DiplomaService } from 'src/app/pages/school/services/diploma.service';
import { DiplomaTypeService } from 'src/app/pages/school/services/diploma-type.service';
import { LevelService } from 'src/app/pages/school/services/level.service';

@Component({
  selector: 'app-diploma-add-edit',
  templateUrl: './diploma-add-edit.component.html',
  styleUrls: ['./diploma-add-edit.component.scss']
})
export class DiplomaAddEditComponent {
  diplomaForm : FormGroup;

  diplomaTypeList: any[] = [];
  levelList: any[] = [];
  diplomaTypeSelected : number | undefined;
  levelSelected : number | undefined;

  saving = false;
  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");


  constructor(private _fb: FormBuilder,
    private _diplomaService: DiplomaService,
    private _dialogRef: MdbModalRef<DiplomaAddEditComponent>,
    private _coreService: CoreService,
    private translate: TranslateService,
    private diplomaTypeService: DiplomaTypeService,
    private levelService: LevelService
)
{
this.diplomaForm = this._fb.group({
code: ['', [Validators.required, Validators.minLength(3)]],
name: ['', [Validators.required, Validators.minLength(3)]],
diplomaType:'',
level:'',
})

}

ngOnInit() : void{
  this.diplomaForm.patchValue(this.data);
  this.getDiplomaTypeList();
  this.getLevelList();

  if (!this.data){
    this.getDiplomaTypeList();
    this.getLevelList();
  }
  else {
    this.diplomaTypeSelected = this.data.diplomaType['@id'];
    this.levelSelected = this.data.level['@id'];
  }
}

get fc(){
  return this.diplomaForm.controls;
}


onFormSubmit(){
  this.isSubmitted = true;
  if (this.diplomaForm.valid){
    this.saving = true;
    if (this.data){
      this._diplomaService.edit(this.data.id, this.diplomaForm.value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Diploma edit with success !', 'success')
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
              this.diplomaForm.get('email')?.setErrors({serverError: v.message})
            }
            this.saving = false;

          })
        }
      })
    }
    else {
      this._diplomaService.create(this.diplomaForm.value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Diploma add with success !', 'success')
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

          errors.forEach((v) =>
          {
            console.log(v.message);
            console.log(v.propertyPath)
            if (v.propertyPath === 'email'){
              this.diplomaForm.get('email')?.setErrors({serverError: v.message})
            }

          })
        }
      })
    }

  }
}

getDiplomaTypeList(){
  this.diplomaTypeService.getDiplomaTypeList().subscribe((data:any)=> {
      this.diplomaTypeList = data['hydra:member'];
      this.diplomaTypeList = this.diplomaTypeList.map((v) => {
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
