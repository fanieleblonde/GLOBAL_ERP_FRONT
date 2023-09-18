import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SpecialityService} from "../../../../services/speciality.service";
import {ProgramService} from "../../../../services/program.service";
import {CycleService} from "../../../../services/cycle.service";
import {LevelService} from "../../../../services/level.service";

@Component({
  selector: 'app-speciality-add-edit',
  templateUrl: './speciality-add-edit.component.html',
  styleUrls: ['./speciality-add-edit.component.scss']
})
export class SpecialityAddEditComponent {
  specialityForm : FormGroup;

  programList: any[] = [];
  cycleList: any[] = [];

  level1List: any[] = [];
  level2List: any[] = [];


  programListSelect:number | undefined;
  cycleListSelect:number | undefined;

  level1ListSelect:number | undefined;

  level2ListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _specialityService: SpecialityService,
              private _dialogRef: MdbModalRef<SpecialityAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private programService: ProgramService,
              private cycleService: CycleService,
              private levelService: LevelService,



)
  {
    this.specialityForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      program:'',
      cycle:['', [Validators.required]],
      minimumLevel: ['', [Validators.required]],
      maximumLevel: ['', [Validators.required]],
      simpleHourlyRate:'',
      multipleHourlyRate: '',
    })

  }

  ngOnInit() : void{
    this.specialityForm.patchValue(this.data);
    this.getProgramlList();
    this.getCycleList();
    this.getLevel1List();
    this.getLevel2List();


    if (!this.data){
      this.getProgramlList();
      this.getCycleList();
      this.getLevel1List();
      this.getLevel2List();
    }
    else {
      this.programList = this.data.program['@id'];
      this.cycleList = this.data.cycle;
      this.level1List = this.data.minimumLevel;
      this.level2List = this.data.maximumLevel['@id'];

    }
  }

  get fc(){
    return this.specialityForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.specialityForm.valid){
      this.saving = true;
      if (this.data){
        this._specialityService.edit(this.data.id, this.specialityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Speciality edit with success !', 'success')
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
              if (v.propertyPath === this.specialityForm.get('name')){
                this.specialityForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._specialityService.create(this.specialityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Speciality add with success !', 'success')
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
                this.specialityForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
  getProgramlList(){
    this.programService.getList().subscribe((data:any)=> {
        this.programList = data['hydra:member'];
        this.programList = this.programList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getCycleList(){
    this.cycleService.getCycleList().subscribe((data:any)=> {
        this.cycleList = data['hydra:member'];
        this.cycleList = this.cycleList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getLevel1List(){
    this.levelService.getLevelList().subscribe((data:any)=> {
        this.level1List = data['hydra:member'];
        this.level1List = this.level1List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getLevel2List(){
    this.levelService.getLevelList().subscribe((data:any)=> {
        this.level2List = data['hydra:member'];
        this.level2List = this.level2List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
