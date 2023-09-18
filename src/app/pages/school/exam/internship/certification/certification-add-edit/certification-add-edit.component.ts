import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../../services/school-year.service";
import {StatusService} from "../../../../services/status.service";
import {ClasseService} from "../../../../services/classe.service";
import {StudregistrationService} from "../../../../services/studregistration.service";
import {DiplomaService} from "../../../../services/diploma.service";
import {SequenceService} from "../../../../services/sequence.service";
import {CertificationService} from "../../../../services/certification.service";
import {OptionService} from "../../../../services/option.service";

@Component({
  selector: 'app-certification-add-edit',
  templateUrl: './certification-add-edit.component.html',
  styleUrls: ['./certification-add-edit.component.scss']
})
export class CertificationAddEditComponent {
  certificationForm : FormGroup;

  yearList : any[] = []
  statusList : any[] = []
  classeList : any[] = []
  studregistrationList : any[] = []
  diplomaList : any[] = []
  optionList : any[] = []


  yearListSelect:number | undefined;

  statusListSelect:number | undefined;

  classeListSelect:number | undefined;
  optionListSelect:number | undefined;
  studregistrationListSelect:number | undefined;
  diplomaListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _certificationService: CertificationService,
              private _dialogRef: MdbModalRef<CertificationAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private yearservice: SchoolYearService,
              private statusservice: StatusService,
              private classeservice: ClasseService,
              private studregistrationservice: StudregistrationService,
              private diplomaservice: DiplomaService,
              private optionservice: OptionService,




  )
  {
    this.certificationForm = this._fb.group({
      year:'',
      code: ['', [Validators.required, Validators.minLength(3)]],
      diploma:'',
      status:'',
      startAt:'',
      studOption:'',
      exam:'',
      remark:'',
      classe:'',
      studregistration:'',
      promotion:'',
      mention:'',
    })

  }

  ngOnInit() : void{
    this.certificationForm.patchValue(this.data);
    this.getYearList();
    this.getClasseList();
    this.getStudregistrationList();
    this.getOptionList();
    this.getDiplomaList();
    this.getStatusList();


    if (!this.data){
      this.getYearList();
      this.getClasseList();
      this.getStudregistrationList();
      this.getOptionList();
      this.getDiplomaList();
      this.getStatusList();



    }
    else {
      this.yearListSelect = this.data.year['@id'];
      this.classeListSelect = this.data.classe['@id'];
      this.studregistrationListSelect = this.data.studregistration['@id'];
      this.optionListSelect = this.data.studOption['@id'];
      this.diplomaListSelect = this.data.diploma['@id'];
      this.statusListSelect = this.data.status['@id'];



    }
  }

  get fc(){
    return this.certificationForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.certificationForm.valid){
      this.saving = true;
      if (this.data){
        this._certificationService.edit(this.data.id, this.certificationForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Certification edit with success !', 'success')
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
              if (v.propertyPath === this.certificationForm.get('name')){
                this.certificationForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._certificationService.create(this.certificationForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Certification add with success !', 'success')
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
                this.certificationForm.get('name')?.setErrors({serverError: v.message})
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

  getOptionList(){
    this.optionservice.getOptionList().subscribe((data:any)=> {
        this.optionList = data['hydra:member'];
        this.optionList = this.optionList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
