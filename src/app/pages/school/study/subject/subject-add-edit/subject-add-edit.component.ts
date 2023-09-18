import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SubjectService} from "../../../services/subject.service";
import {InstitutionService} from "../../../services/institution.service";
import {SubjectTypeService} from "../../../services/subject-type.service";

@Component({
  selector: 'app-subject-add-edit',
  templateUrl: './subject-add-edit.component.html',
  styleUrls: ['./subject-add-edit.component.scss']
})
export class SubjectAddEditComponent {
  subjectForm : FormGroup;
  institutionList: any[] = [];
  subjectTypeList: any[] = [];

  institutionListSelect:number | undefined;
  subjectTypeListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _subjectService: SubjectService,
              private _dialogRef: MdbModalRef<SubjectAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private institutionService: InstitutionService,
              private subjectTypeService: SubjectTypeService

  )
  {
    this.subjectForm = this._fb.group({
      code:['', [Validators.required, Validators.minLength(3)]],
      name:['', [Validators.required, Validators.minLength(3)]],
      institution:'',
      subjectType:'',


    })

  }

  ngOnInit() : void{
    this.subjectForm.patchValue(this.data);
    this.getInstitutionList();
    this.getSubjectTypeList();

    if (!this.data){
      this.getInstitutionList();
      this.getSubjectTypeList();
    }
    else {
      this.institutionListSelect = this.data.institution['@id'];
      this.subjectTypeListSelect = this.data.subjectType['@id'];
    }
  }

  get fc(){
    return this.subjectForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.subjectForm.valid){
      this.saving = true;
      if (this.data){
        this._subjectService.edit(this.data.id, this.subjectForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Subject edit with success !', 'success')
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
              if (v.propertyPath === this.subjectForm.get('name')){
                this.subjectForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._subjectService.create(this.subjectForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Subject add with success !', 'success')
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
                this.subjectForm.get('name')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === 'code'){
                this.subjectForm.get('code')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
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
  getSubjectTypeList(){
    this.subjectTypeService.getList().subscribe((data:any)=> {
        this.subjectTypeList = data['hydra:member'];
        this.subjectTypeList = this.subjectTypeList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
