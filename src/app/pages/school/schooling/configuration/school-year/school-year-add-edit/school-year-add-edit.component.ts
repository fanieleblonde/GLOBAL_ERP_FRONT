import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolYearService} from "../../../../services/school-year.service";

@Component({
  selector: 'app-school-year-add-edit',
  templateUrl: './school-year-add-edit.component.html',
  styleUrls: ['./school-year-add-edit.component.scss']
})
export class SchoolYearAddEditComponent {
  schoolYearForm : FormGroup;
  lastYearList: any[] = [];
  lastYearListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _schoolyearService: SchoolYearService,
              private _dialogRef: MdbModalRef<SchoolYearAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,

  )
  {
    this.schoolYearForm = this._fb.group({
      year:'',
      startAt:['',[Validators.required]],
      endAt: ['',[Validators.required]],
      lastYear:'',
      objective:'',
      isCurrent:'',
    })

  }
  ngOnInit() : void{
    this.fc['isCurrent'].setValue( false)
    this.schoolYearForm.patchValue(this.data);
    // this.fc['isCurrent'].setValue( this.data?.isCurrent ? 1:0)
    this.getLastYearList()

    if (!this.data){
      this.getLastYearList()

    }
    else {
      this.lastYearListSelect = this.data.lastYear['@id'];


    }
  }
  get fc(){
    return this.schoolYearForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.schoolYearForm.valid){
      this.saving = true;
      if (this.data){

        this._schoolyearService.edit(this.data.id, this.schoolYearForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('School year edit with success !', 'success')
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
              if (v.propertyPath === 'year'){
                this.schoolYearForm.get('year')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._schoolyearService.create(this.schoolYearForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('School year add with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            this.saving = false;
            let errors: any[] = err['error']['violations'];
            console.log(err);

            errors.forEach((v) =>
            {
              console.log(v.message);
              console.log(v.propertyPath)
              if (v.propertyPath === 'year'){
                this.schoolYearForm.get('year')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }
    }
  }
  getLastYearList(){
    this._schoolyearService.getList().subscribe((data:any)=> {
        this.lastYearList = data['hydra:member'];
        this.lastYearList = this.lastYearList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }
}
