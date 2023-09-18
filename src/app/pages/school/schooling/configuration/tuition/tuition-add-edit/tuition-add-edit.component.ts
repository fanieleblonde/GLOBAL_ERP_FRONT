import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { TuitionService } from 'src/app/pages/school/services/tuition.service';
import { CostAreaService } from 'src/app/pages/school/services/cost-area.service';
import { PentionschemeService } from 'src/app/pages/school/services/pentionscheme.service';
import { SpecialityService } from 'src/app/pages/school/services/speciality.service';
import { LevelService } from 'src/app/pages/school/services/level.service';
import { TrainingTypeService } from 'src/app/pages/school/services/training-type.service';

@Component({
  selector: 'app-tuition-add-edit',
  templateUrl: './tuition-add-edit.component.html',
  styleUrls: ['./tuition-add-edit.component.scss']
})
export class TuitionAddEditComponent {
  tuitionForm : FormGroup;
  costAreaList: any[] = [];
  pensionSchemeList: any[] = [];
  specialityList: any[] = [];
  levelList: any[] = [];
  levelListFiltered: any[] = [];
  trainingTypeList: any[] = [];
  costAreaSelected:number | undefined;
  pensionSchemeSelected:number | undefined;
  specialitySelected:number | undefined;
  levelSelected:number | undefined;
  trainingTypeSelected:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _tuitionService: TuitionService,
              private _dialogRef: MdbModalRef<TuitionAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private costareaService: CostAreaService,
              private pensionSchemeService: PentionschemeService,
              private specialityService: SpecialityService,
              private levelService: LevelService,
              private trainingTypeService: TrainingTypeService
  )
  {
    this.tuitionForm = this._fb.group({
      costArea: '',
      pensionScheme: '',
      speciality: '',
      level: '',
      trainingType: '',
      registrationFees: '',
      reRegistrationFees: '',
    })

  }

  ngOnInit() : void{
    this.tuitionForm.patchValue(this.data);
    if (this.data){
      this.costAreaSelected = this.data.costarea['@id'];
      this.pensionSchemeSelected = this.data.pensionScheme['@id'];
      this.specialitySelected = this.data.speciality['@id'];
      this.levelSelected = this.data.level['@id'];
      this.trainingTypeSelected = this.data.trainingType['@id'];
    }
    this.getCostAreaList();
      this.getPentionSchemeList();
      this.getSpecialityList();
      this.getLevelList();
      this.getTrainingTypeList();
  }

  get fc(){
    return this.tuitionForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.tuitionForm.valid){
      this.saving = true;
      if (this.data){
        this._tuitionService.edit(this.data.id, this.tuitionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Tuition edit with success !', 'success')
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
              if (v.propertyPath === this.tuitionForm.get('name')){
                this.tuitionForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this.saving = false;
        this._tuitionService.create(this.tuitionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Tuition add with success !', 'success')
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
                this.tuitionForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }


  getCostAreaList(){
    this.costareaService.getCostAreaList().subscribe((data:any)=> {
        this.costAreaList = data['hydra:member'];
        this.costAreaList = this.costAreaList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


  getPentionSchemeList(){
    this.pensionSchemeService.getPentionSchemeList().subscribe((data:any)=> {
        this.pensionSchemeList = data['hydra:member'];
        this.pensionSchemeList = this.pensionSchemeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }


  getSpecialityList(){
    this.specialityService.getList().subscribe((data:any)=> {
        this.specialityList = data['hydra:member'];
        this.specialityList = this.specialityList.map((v) => {
          v.id = v['@id'];
          return v;
        })
        console.log(this.specialityList)
      },

      error => console.log(error)
    )
  }
  applySpecialityFilter(event:any){
    console.log('BJR')
    let specialityId = event
    let speciality = this.specialityList.find( (speciality:any) => speciality.id === specialityId)
    console.log(event,speciality)
    let minimumLevel = speciality.minimumLevel
    let maximumLevel = speciality.maximumLevel
    console.log(minimumLevel['@id'])
    console.log('BJR')
    this.levelListFiltered = this.levelList.filter((level: any) => level.id === minimumLevel['@id'] || level.id === maximumLevel['@id'])
  }

  getLevelList(){
    this.levelService.getLevelList().subscribe((data:any)=> {
        this.levelList = data['hydra:member'];
        this.levelList = this.levelList.map((v) => {
          v.id = v['@id'];
          return v;
        })
        this.levelListFiltered = this.levelList
        console.log(this.levelList)
      },
      error => console.log(error)
    )
  }


  getTrainingTypeList(){
    this.trainingTypeService.getTrainingTypeList().subscribe((data:any)=> {
        this.trainingTypeList = data['hydra:member'];
        this.trainingTypeList = this.trainingTypeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
