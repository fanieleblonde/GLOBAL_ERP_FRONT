import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {DiplomaService} from "../../../../services/diploma.service";
import {StudentIntershipService} from "../../../../services/student-intership.service";
import {ClasseService} from "../../../../services/classe.service";
import {StudregistrationService} from "../../../../services/studregistration.service";
import {SequenceService} from "../../../../services/sequence.service";
import {StatusService} from "../../../../services/status.service";
import {SchoolYearService} from "../../../../services/school-year.service";
import {SchoolClassService} from "../../../../services/school-class.service";

@Component({
  selector: 'app-student-intership-add-edit',
  templateUrl: './student-intership-add-edit.component.html',
  styleUrls: ['./student-intership-add-edit.component.scss']
})
export class StudentIntershipAddEditComponent {
  studentinternshipForm : FormGroup;

  yearList : any[] = []
  statusList : any[] = []
  classeList : any[] = []
  studregistrationList : any[] = []
  sequenceList : any[] = []
  diplomaList : any[] = []

  yearListSelect:number | undefined;

  statusListSelect:number | undefined;

  classeListSelect:number | undefined;
  sequenceSelect:number | undefined;
  studregistrationListSelect:number | undefined;
  diplomaListSelect:number | undefined;
  sequenceListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _studentinternshipService: StudentIntershipService,
              private _dialogRef: MdbModalRef<StudentIntershipAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearservice: SchoolYearService,
              private statusservice: StatusService,
              private classeservice: SchoolClassService,
              private studregistrationservice: StudregistrationService,
              private diplomaservice: DiplomaService,
              private sequenceservice: SequenceService,




  )
  {
    this.studentinternshipForm = this._fb.group({
      year:'',
      code: ['', [Validators.required, Validators.minLength(3)]],
      diploma:'',
      status:'',
      startAt:'',
      endAt:'',
      theme:'',
      remark:'',
      schoolClasse:'',
      studregistration:'',
      sequence:'',
      mention:'',
    })

  }

  ngOnInit() : void{
    this.studentinternshipForm.patchValue(this.data);
    this.getYearList();
    this.getClasseList();
    this.getStudregistrationList();
    this.getSequenceList();
    this.getDiplomaList();
    this.getStatusList();


    if (!this.data){
      this.getYearList();
      this.getClasseList();
      this.getStudregistrationList();
      this.getSequenceList();
      this.getDiplomaList();
      this.getStatusList();



    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.classeListSelect = this.data.schoolClasse['@id'];
      this.studregistrationListSelect = this.data.studregistration['@id'];
      this.sequenceListSelect = this.data.sequence['@id'];
      this.diplomaListSelect = this.data.diploma['@id'];
      this.statusListSelect = this.data.status['@id'];



    }
  }

  get fc(){
    return this.studentinternshipForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.studentinternshipForm.valid){
      this.saving = true;
      if (this.data){
        this._studentinternshipService.edit(this.data.id, this.studentinternshipForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Student internship edit with success !', 'success')
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
              if (v.propertyPath === this.studentinternshipForm.get('name')){
                this.studentinternshipForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._studentinternshipService.create(this.studentinternshipForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Student internship add with success !', 'success')
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
                this.studentinternshipForm.get('name')?.setErrors({serverError: v.message})
              }
            })
          }
        })
      }

    }
  }
  getStatusList(){
    this.statusservice.getList().subscribe((data:any)=> {
        this.statusList = data['hydra:member'];
        this.statusList = this.statusList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getYearList(){
    this.yearservice.getList().subscribe((data:any)=> {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getStudregistrationList(){
    this.studregistrationservice.getStudregistrationList().subscribe((data:any)=> {
      console.log(data['hydra:member'][0]);
        this.studregistrationList = data['hydra:member'];
        this.studregistrationList = this.studregistrationList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
  getClasseList(){
    this.classeservice.getList().subscribe((data:any)=> {
        this.classeList = data['hydra:member'];
        this.classeList = this.classeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getDiplomaList(){
    this.diplomaservice.getDiplomaList().subscribe((data:any)=> {
        this.diplomaList = data['hydra:member'];
        this.diplomaList = this.diplomaList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

  getSequenceList(){
    this.sequenceservice.getList().subscribe((data:any)=> {
        this.sequenceList = data['hydra:member'];
        this.sequenceList = this.sequenceList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
