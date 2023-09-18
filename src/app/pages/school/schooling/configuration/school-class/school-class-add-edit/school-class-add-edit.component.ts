import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {LevelService} from "../../../../services/level.service";
import {SchoolClassService} from "../../../../services/school-class.service";
import {SchoolService} from "../../../../services/school.service";
import {DepartmentService} from "../../../../services/department.service";
import {RoomService} from "../../../../services/room.service";
import {ClassCategoryService} from "../../../../services/class-category.service";
import {SpecialityService} from "../../../../services/speciality.service";
import {GuardianshipService} from "../../../../services/guardianship.service";
import {TrainingTypeService} from "../../../../services/training-type.service";
import {OptionService} from "../../../../services/option.service";
import {SchoolYearService} from "../../../../services/school-year.service";

@Component({
  selector: 'app-school-class-add-edit',
  templateUrl: './school-class-add-edit.component.html',
  styleUrls: ['./school-class-add-edit.component.scss']
})
export class SchoolClassAddEditComponent {
  schoolclassForm : FormGroup;

  roomList : any[] = []
  departmentList : any[] = []
  departmentListFiltered : any[] = []
  levelListFiltered : any[] = []
  levelList : any[] = []
  schoolList : any[] = []
  specialityList : any[] = []
  guardianshipList : any[] = []
  formationList : any[] = []
  categoryList : any[] = []
  registrantOptionList : any[] = []
  schoolyearList : any[] = []

  schoolListSelect:number | undefined;
  schoolyearListSelect:number | undefined;
  registrantOptionListSelect:number | undefined;
  levelListSelect:number | undefined;
  departmentListSelect:number | undefined;
  specialityListSelect:number | undefined;
  guardianshipListSelect:number | undefined;
  formationListSelect:number | undefined;
  roomListSelect:number | undefined;
  categoryListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _schoolclassService: SchoolClassService,
              private _dialogRef: MdbModalRef<SchoolClassAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private schoolservice: SchoolService,
              private departmentservice: DepartmentService,
              private specialityservice: SpecialityService,
              private levelservice: LevelService,
              private guardianshipservice: GuardianshipService,
              private trainingTypeservice: TrainingTypeService,
              private roomsevice: RoomService,
              private categorysevice: ClassCategoryService,
              private registrantOptionsevice: OptionService,
              private schoolyearsevice: SchoolYearService,

  )
  {
    this.schoolclassForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(1)]],
      description:'',
      school:['', [Validators.required]],
      department:['', [Validators.required]],
      level:['', [Validators.required]],
      speciality:['', [Validators.required]],
      classCategory:'',
      guardianship:'',
      trainingType:['', [Validators.required]],
      mainRoom:['', [Validators.required]],
      registrantOption:['', [Validators.required]],
      year:['', [Validators.required]],
      maximumStudentNumber:'',
      isOptional:'',
      classExam:'',
      ageLimit:'',
      simpleHourlyRate:'',
      multipleHourlyRate:'',
    })

  }

  ngOnInit() : void{
    this.getSchoolList();
    this.getDepartmentList();
    this.getLevelList();
    this.getSpecialityList();
    this.getGuardianshipList();
    this.getFormationList();
    this.getRoomList();
    this.getcategoryList();
    this.getOptionList();
    this.getSchoolYearList();


    if (!this.data){
      this.getSchoolList();
      this.getDepartmentList();
      this.getLevelList();
      this.getSpecialityList();
      this.getGuardianshipList();
      this.getFormationList();
      this.getRoomList();
      this.getcategoryList();
      this.getOptionList();
      this.getSchoolYearList();

    }
    else {
      this.schoolListSelect = this.data.school.map['@id'];
      // ((c:any)=>c)
      this.departmentListSelect = this.data.department['@id'];
      this.levelListSelect = this.data.level['@id'];
      this.guardianshipListSelect = this.data.guardianship['@id'];
      this.formationListSelect = this.data.trainingType['@id'];
      this.roomListSelect = this.data.mainRoom['@id'];
      this.specialityListSelect = this.data.speciality['@id'];
      this.categoryListSelect = this.data.classCategory['@id'];
      this.registrantOptionListSelect = this.data.registrantOption['@id'];
      this.schoolyearListSelect = this.data.year['@id'];
    }
    this.schoolclassForm.patchValue(this.data);

  }
  get fc(){
    return this.schoolclassForm.controls;
  }
  onFormSubmit(){
    this.isSubmitted = true;
    if (this.schoolclassForm.valid){

      this.saving = true;
      if (this.data){
        if (this.schoolclassForm.get('isOptional')?.value == "1")
        {
          this.schoolclassForm.get('isOptional')?.setValue(true);
        }
        else{
          this.schoolclassForm.get('isOptional')?.setValue(false);
        }
        this._schoolclassService.edit(this.data.id, this.schoolclassForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Class edit with success !', 'success')
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
              if (v.propertyPath === this.schoolclassForm.get('name')){
                this.schoolclassForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }
      else {
        if (this.schoolclassForm.get('isOptional')?.value == "1")
        {
          this.schoolclassForm.get('isOptional')?.setValue(true);
        }
        else{
          this.schoolclassForm.get('isOptional')?.setValue(false);
        }
        this._schoolclassService.create(this.schoolclassForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Class add with success !', 'success')
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
                this.schoolclassForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
  getGuardianshipList(){
    this.guardianshipservice.getList().subscribe((data:any)=> {
        this.guardianshipList = data['hydra:member'];
        this.guardianshipList = this.guardianshipList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getFormationList(){
    this.trainingTypeservice.getTrainingTypeList().subscribe((data:any)=> {
        this.formationList = data['hydra:member'];
        this.formationList = this.formationList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getDepartmentList(){
    this.departmentservice.getList().subscribe((data:any)=> {
      this.departmentList = data['hydra:member'];
        this.departmentList = this.departmentList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      this.departmentListFiltered = this.departmentList
        // console.log(this.departmentList);
      },
      error => console.log(error)
    )
  }
  getLevelList(){
    this.levelservice.getLevelList().subscribe((data:any)=> {
        this.levelList = data['hydra:member'];
        this.levelList = this.levelList.map((v) => {
          v.id = v['@id'];
          return v;
        })
        console.log(this.levelList);
        this.levelListFiltered = this.levelList
      },
      error => console.log(error)
    )
  }
  getSchoolList(){
    this.schoolservice.getList().subscribe((data:any)=> {
        this.schoolList = data['hydra:member'];
        this.schoolList = this.schoolList.map((v) => {
          v.id = v['@id'];
          return v;
        })
        // console.log(this.schoolList);
      },
      error => console.log(error)
    )
  }

  getSpecialityList(){
    this.specialityservice.getList().subscribe((data:any)=> {
        this.specialityList = data['hydra:member'];
        this.specialityList = this.specialityList.map((v) => {
          v.id = v['@id'];
          return v;
        })
        console.log(this.specialityList);
      },
      error => console.log(error)
    )
  }

  getRoomList(){
    this.roomsevice.getList().subscribe((data:any)=> {
        this.roomList = data['hydra:member'];
        this.roomList = this.roomList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getcategoryList(){
    this.categorysevice.getList().subscribe((data:any)=> {
        this.categoryList = data['hydra:member'];
        this.categoryList = this.categoryList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getOptionList(){
    this.registrantOptionsevice.getOptionList().subscribe((data:any)=> {
        this.registrantOptionList = data['hydra:member'];
        this.registrantOptionList = this.registrantOptionList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getSchoolYearList(){
    this.schoolyearsevice.getList().subscribe((data:any)=> {
        this.schoolyearList = data['hydra:member'];
        this.schoolyearList = this.schoolyearList.map((v) => {
          v.id = v['@id'];
          return v;
        })

        console.log(this.schoolyearList);
      },
      error => console.log(error)
    )
  }

  applyFilterDepartement(event: any) {
    this.departmentListFiltered = this.departmentList.filter( value => value.school['@id'] === event)
  }
  applyFilterlevel(event: any) {
    let specialityId = event
    let speciality = this.specialityList.find(speciality=>speciality.id === specialityId);
    let minimumLevel= speciality.minimumLevel['@id']
    let maximumLevel= speciality.maximumLevel['@id']
    this.levelListFiltered = this.levelList.filter( value => value.id === minimumLevel || value.id === maximumLevel)
  }
}
