import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../services/school-year.service";
import {InstitutionService} from "../../../services/institution.service";
import {ClassProgramService} from "../../../services/class-program.service";
import {SchoolService} from "../../../services/school.service";
import {SchoolClassService} from "../../../services/school-class.service";
import {ModuleService} from "../../../services/module.service";
import {TeacherService} from "../../../services/teacher.service";
import {SubjectService} from "../../../services/subject.service";
import {PeriodTypeService} from "../../../services/period-type.service";
import {RoomService} from "../../../services/room.service";
import {SubjectNatureService} from "../../../services/subject-nature.service";

@Component({
  selector: 'app-class-program-add-edit',
  templateUrl: './class-program-add-edit.component.html',
  styleUrls: ['./class-program-add-edit.component.scss']
})
export class ClassProgramAddEditComponent {
  classProgramForm : FormGroup;

  yearList: any[] = [];
  institutionList: any[] = [];
  schoolList: any[] = [];
  classList: any[] = [];
  moduleList: any[] = [];
  teacherList: any[] = [];
  subjectList: any[] = [];
  teacher2List: any[] = [];
  teacher3List: any[] = [];
  teacherCmList: any[] = [];
  teacherTdList: any[] = [];
  teacherTpList: any[] = [];
  teacherMarkList: any[] = [];
  periodTypeList: any[] = [];
  principalRoomList: any[] = [];
  room2List: any[] = [];
  room3List: any[] = [];
  room4List: any[] = [];
  room5List: any[] = [];
  room6List: any[] = [];
  room7List: any[] = [];
  room8List: any[] = [];
  room9List: any[] = [];
  natureList: any[] = [];



  yearListSelect:number | undefined;
  institutionListSelect:number | undefined;
  schoolListSelect:number | undefined;
  classListSelect:number | undefined;
  moduleListSelect:number | undefined;
  teacherListSelect:number | undefined;
  subjectListSelect:number | undefined;
  teacher2ListSelect:number | undefined;
  teacher3ListSelect:number | undefined;
  teacherCmListSelect:number | undefined;
  teacherTdListSelect:number | undefined;
  teacherTpListSelect:number | undefined;
  teacherMarkListSelect:number | undefined;
  periodTypeListSelect:number | undefined;
  principalRoomListSelect:number | undefined;
  room2ListSelect:number | undefined;
  room3ListSelect:number | undefined;
  room4ListSelect:number | undefined;
  room5ListSelect:number | undefined;
  room6ListSelect:number | undefined;
  room7ListSelect:number | undefined;
  room8ListSelect:number | undefined;
  room9ListSelect:number | undefined;
  natureListSelect:number | undefined;

  saving = false;

  public data: any;
  public value: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");



  constructor(private _fb: FormBuilder,
              private _classprogramService: ClassProgramService,
              private _dialogRef: MdbModalRef<ClassProgramAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearService: SchoolYearService,
              private institutionService: InstitutionService,
              private schoolService: SchoolService,
              private classService: SchoolClassService,
              private moduleService: ModuleService,
              private teacherService: TeacherService,
              private subjectService: SubjectService,
              private periodTypeService: PeriodTypeService,
              private roomService: RoomService,
              private natureService: SubjectNatureService,

  )
  {
    this.classProgramForm = this._fb.group({

      // code:['', [Validators.required, Validators.minLength(3)]],
      school:'',
      class: '',
      year: '',
      institution: '',
      module: '',
      teacher: '',
      subject: '',
      teacher2:'',
      teacher3:'',
      teacherCm:'',
      teacherTd:'',
      teacherTp: '',
      teacherMark: '',
      isActif: '',
      codeUVC: '',
      nameUVC: '',
      periodType: '',
      position:null,
      coeff:null,
      principalRoom:'',
      room2:'',
      room3: '',
      Room4: '',
      room5: '',
      room6: '',
      room7: '',
      room8: '',
      room9:'',
      nature:'',
    })
  }

  ngOnInit() : void{
    this.fc['isActif'].setValue( false)

    this.classProgramForm.patchValue(this.data);
    console.log(this.data)
    this.getSchoolYearList();
    this.getInstitutionList()
    this.getSchoolList();
    this.getClassList();
    this.getModuleList();
    this.getTeacherList();
    this.getSubjectList();
    this.getTeacher2List();
    this.getTeacher3List();
    this.getTeacherCmList()
    this.getTeacherTdList();
    this.getTeacherTpList();
    this.getTeacherMarkList();
    this.getPeriodTypeList();
    this.getPrincipalRoomList();
    this.getRoom2List();
    this.getRoom3List();
    this.getRoom4List();
    this.getRoom5List();
    this.getRoom6List();
    this.getRoom7List();
    this.getRoom8List();
    this.getRoom9List();
    this.getNatureList();

    if (!this.data){
      this.getSchoolYearList();
      this.getInstitutionList();
      this.getSchoolList();
      this.getClassList();
      this.getModuleList();
      this.getTeacherList()
      this.getSubjectList();
      this.getTeacher2List()
      this.getTeacher3List();
      this.getTeacherCmList()
      this.getTeacherTdList();
      this.getTeacherTpList();
      this.getTeacherMarkList();
      this.getPeriodTypeList();
      this.getPrincipalRoomList();
      this.getRoom2List();
      this.getRoom3List();
      this.getRoom4List();
      this.getRoom5List();
      this.getRoom6List();
      this.getRoom7List();
      this.getRoom8List();
      this.getRoom9List();
      this.getNatureList();

    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.institutionListSelect = this.data.institution['@id'];
      this.schoolListSelect = this.data.school['@id'];
      this.classListSelect = this.data.class['@id'];
      this.moduleListSelect = this.data.module['@id'];
      this.teacherListSelect = this.data.teacher['@id'];
      this.subjectListSelect = this.data.subject['@id'];
      this.teacher2ListSelect = this.data.teacher2['@id'];
      this.teacher3ListSelect = this.data.teacher3['@id'];
      this.teacherCmListSelect = this.data.teacherCm['@id'];
      this.teacherTdListSelect = this.data.teacherTd['@id'];
      this.teacherTpListSelect = this.data.teacherTp['@id'];
      this.teacherMarkListSelect = this.data.teacherMark['@id'];
      this.periodTypeListSelect = this.data.periodType['@id'];
      this.principalRoomListSelect = this.data.principalRoom['@id'];
      this.room2ListSelect = this.data.room2['@id'];
      this.room3ListSelect = this.data.room3['@id'];
      this.room4ListSelect = this.data.Room4['@id'];
      this.room5ListSelect = this.data.room5['@id'];
      this.room6ListSelect = this.data.room6['@id'];
      this.room7ListSelect = this.data.room7['@id'];
      this.room8ListSelect = this.data.room8['@id'];
      this.room9ListSelect = this.data.room9['@id'];
      this.natureListSelect = this.data.nature['@id'];
    }
  }

  get fc(){
    return this.classProgramForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.classProgramForm.valid){
      this.saving = true;
      console.log(this.data);
      this.value = this.classProgramForm.value
        console.log(this.value);
      if (this.data){
        this.value ={...this.classProgramForm.value,previousClass:this.data.class.id} ;
        this._classprogramService.edit(this.data.id,this.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('class program edit with success !', 'success')
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
              if (v.propertyPath === this.classProgramForm.get('code')){
                this.classProgramForm.get('code')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }
      else {
        console.log(this.value);
        this._classprogramService.create(this.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('class program add with success !', 'success')
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
                this.classProgramForm.get('code')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

  getSchoolYearList(){
    this.yearService.getList().subscribe((data:any)=> {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getInstitutionList(){
    this.institutionService.getList().subscribe((data:any)=> {
        this.institutionList = data['hydra:member'];
        this.institutionList = this.institutionList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getModuleList(){
    this.moduleService.getList().subscribe((data:any)=> {
        this.moduleList = data['hydra:member'];
        this.moduleList = this.moduleList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getTeacherList(){
    this.teacherService.getList().subscribe((data:any)=> {
        this.teacherList = data['hydra:member'];
        this.teacherList = this.teacherList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getSubjectList(){
    this.subjectService.getList().subscribe((data:any)=> {
        this.subjectList = data['hydra:member'];
        this.subjectList = this.subjectList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getTeacher2List(){
    this.teacherService.getList().subscribe((data:any)=> {
        this.teacher2List = data['hydra:member'];
        this.teacher2List = this.teacher2List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getTeacher3List(){
    this.teacherService.getList().subscribe((data:any)=> {
        this.teacher3List = data['hydra:member'];
        this.teacher3List = this.teacher3List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getTeacherCmList(){
    this.teacherService.getList().subscribe((data:any)=> {
        this.teacherCmList = data['hydra:member'];
        this.teacherCmList = this.teacherCmList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getSchoolList(){
    this.schoolService.getList().subscribe((data:any)=> {
        this.schoolList = data['hydra:member'];
        this.schoolList = this.schoolList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getTeacherTdList(){
    this.teacherService.getList().subscribe((data:any)=> {
        this.teacherTdList = data['hydra:member'];
        this.teacherTdList = this.teacherTdList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getClassList(){
    this.classService.getList().subscribe((data:any)=> {
        this.classList = data['hydra:member'];
        this.classList = this.classList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getTeacherTpList(){
    this.teacherService.getList().subscribe((data:any)=> {
        this.teacherTpList = data['hydra:member'];
        this.teacherTpList = this.teacherTpList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getTeacherMarkList(){
    this.teacherService.getList().subscribe((data:any)=> {
        this.teacherMarkList = data['hydra:member'];
        this.teacherMarkList = this.teacherMarkList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getPeriodTypeList(){
    this.periodTypeService.getList().subscribe((data:any)=> {
        this.periodTypeList = data['hydra:member'];
        this.periodTypeList = this.periodTypeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getPrincipalRoomList(){
    this.roomService.getList().subscribe((data:any)=> {
        this.principalRoomList = data['hydra:member'];
        this.principalRoomList = this.principalRoomList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getRoom2List(){
    this.roomService.getList().subscribe((data:any)=> {
        this.room2List = data['hydra:member'];
        this.room2List = this.room2List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getRoom3List(){
    this.roomService.getList().subscribe((data:any)=> {
        this.room3List = data['hydra:member'];
        this.room3List = this.room3List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getRoom4List(){
    this.roomService.getList().subscribe((data:any)=> {
        this.room4List = data['hydra:member'];
        this.room4List = this.room4List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getRoom5List(){
    this.roomService.getList().subscribe((data:any)=> {
        this.room5List = data['hydra:member'];
        this.room5List = this.room5List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getRoom6List(){
    this.roomService.getList().subscribe((data:any)=> {
        this.room6List = data['hydra:member'];
        this.room6List = this.room6List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }  getRoom7List(){
    this.roomService.getList().subscribe((data:any)=> {
        this.room7List = data['hydra:member'];
        this.room7List = this.room7List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getRoom8List(){
    this.roomService.getList().subscribe((data:any)=> {
        this.room8List = data['hydra:member'];
        this.room8List = this.room8List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getRoom9List(){
    this.roomService.getList().subscribe((data:any)=> {
        this.room9List = data['hydra:member'];
        this.room9List = this.room9List.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getNatureList(){
    this.natureService.getList().subscribe((data:any)=> {
        this.natureList = data['hydra:member'];
        this.natureList = this.natureList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}

