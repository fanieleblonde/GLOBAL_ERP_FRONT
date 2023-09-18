import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { NoteTypeService } from 'src/app/pages/school/services/note-type.service';
import { LevelService } from 'src/app/pages/school/services/level.service';
import { SpecialityService } from 'src/app/pages/school/services/speciality.service';

@Component({
  selector: 'app-note-type-add-edit',
  templateUrl: './note-type-add-edit.component.html',
  styleUrls: ['./note-type-add-edit.component.scss']
})
export class NoteTypeAddEditComponent {
  noteTypeForm : FormGroup;
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
              private _noteTypeService: NoteTypeService,
              private _dialogRef: MdbModalRef<NoteTypeAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private specialityService: SpecialityService,
              private levelService: LevelService
  )
  {
    this.noteTypeForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      weighting: '',
      speciality: '',
      level: '',
      position:['', [Validators.required]],

    })

  }


  ngOnInit() : void{
    this.noteTypeForm.patchValue(this.data);
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
    return this.noteTypeForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.noteTypeForm.valid){
      this.saving = true;
      if (this.data){
        this._noteTypeService.edit(this.data.id, this.noteTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Note Type edit with success !', 'success')
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
              if (v.propertyPath === this.noteTypeForm.get('name')){
                this.noteTypeForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._noteTypeService.create(this.noteTypeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Note Type add with success !', 'success')
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
                this.noteTypeForm.get('name')?.setErrors({serverError: v.message})
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
