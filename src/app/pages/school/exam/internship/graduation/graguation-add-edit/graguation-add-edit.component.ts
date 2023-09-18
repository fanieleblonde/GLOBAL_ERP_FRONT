import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../../services/school-year.service";
import {StatusService} from "../../../../services/status.service";
import {ClasseService} from "../../../../services/classe.service";
import {DiplomaService} from "../../../../services/diploma.service";
import {SequenceService} from "../../../../services/sequence.service";
import {GraduationService} from "../../../../services/graduation.service";
import {StudregistrationService} from "../../../../services/studregistration.service";

@Component({
  selector: 'app-graguation-add-edit',
  templateUrl: './graguation-add-edit.component.html',
  styleUrls: ['./graguation-add-edit.component.scss']
})
export class GraguationAddEditComponent {
  graduationForm : FormGroup;

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
              private _graduationService: GraduationService,
              private _dialogRef: MdbModalRef<GraguationAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearservice: SchoolYearService,
              private statusservice: StatusService,
              private classeservice: ClasseService,
              private studregistrationservice: StudregistrationService,
              private diplomaservice: DiplomaService,
              private sequenceservice: SequenceService,




  )
  {
    this.graduationForm = this._fb.group({
      year:'',
      code: ['', [Validators.required, Validators.minLength(3)]],
      diploma:'',
      status:'',
      startAt:'',
      beginTime:'',
      endTime:'',
      theme:'',
      remark:'',
      classe:'',
      studregistration:'',
      sequence:'',
      mention:'',
    })

  }

  ngOnInit() : void{
    this.graduationForm.patchValue(this.data);
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
      this.classeListSelect = this.data.classe['@id'];
      this.studregistrationListSelect = this.data.studregistration['@id'];
      this.sequenceListSelect = this.data.sequence['@id'];
      this.diplomaListSelect = this.data.diploma['@id'];
      this.statusListSelect = this.data.status['@id'];



    }
  }

  get fc(){
    return this.graduationForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.graduationForm.valid){
      this.saving = true;
      if (this.data){
        this._graduationService.edit(this.data.id, this.graduationForm.value).subscribe({
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
              if (v.propertyPath === this.graduationForm.get('name')){
                this.graduationForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._graduationService.create(this.graduationForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Graduation add with success !', 'success')
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
                this.graduationForm.get('name')?.setErrors({serverError: v.message})
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
    this.classeservice.getClasseList().subscribe((data:any)=> {
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
