import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SchoolClassService} from "../../../../services/school-class.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {DepartmentService} from "../../../../services/department.service";
import {LevelService} from "../../../../services/level.service";
import {RoomService} from "../../../../services/room.service";
import {SchoolYearService} from "../../../../services/school-year.service";

@Component({
  selector: 'app-class-and-hourlyrate-add-edit',
  templateUrl: './class-and-hourlyrate-add-edit.component.html',
  styleUrls: ['./class-and-hourlyrate-add-edit.component.scss']
})
export class ClassAndHourlyrateAddEditComponent {
  schoolclassForm : FormGroup;

  roomList : any[] = []
  departmentList : any[] = []
  departmentListFiltered : any[] = []
  levelListFiltered : any[] = []
  levelList : any[] = []
  schoolyearList : any[] = []

  schoolyearListSelect:number | undefined;
  levelListSelect:number | undefined;
  departmentListSelect:number | undefined;
  roomListSelect:number | undefined;

  saving = false;
  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _schoolclassService: SchoolClassService,
              private _dialogRef: MdbModalRef<ClassAndHourlyrateAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private departmentservice: DepartmentService,
              private levelservice: LevelService,
              private roomsevice: RoomService,
              private schoolyearsevice: SchoolYearService,

  )
  {
    this.schoolclassForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      description:'',
      level:['', [Validators.required]],
      mainRoom:['', [Validators.required]],
      year:['', [Validators.required]],
      simpleHourlyRate:'',
      multipleHourlyRate:'',

    })
  }

  ngOnInit() : void{
    this.getDepartmentList();
    this.getLevelList();
    this.getRoomList();
    this.getSchoolYearList();


    if (!this.data){
      this.getDepartmentList();
      this.getLevelList();
      this.getRoomList();
      this.getSchoolYearList();

    }
    else {
      // ((c:any)=>c)
      this.departmentListSelect = this.data.department['@id'];
      this.levelListSelect = this.data.level['@id'];
      this.roomListSelect = this.data.mainRoom['@id'];
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
}
