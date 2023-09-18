import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { GradingService } from 'src/app/pages/school/services/grading.service';
import { DiplomaService } from 'src/app/pages/school/services/diploma.service';

@Component({
  selector: 'app-grading-add-edit',
  templateUrl: './grading-add-edit.component.html',
  styleUrls: ['./grading-add-edit.component.scss']
})
export class GradingAddEditComponent {
  gradingForm : FormGroup;
  diplomaList: any[] = [];
  diplomaSelected : number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _gradingService: GradingService,
              private _dialogRef: MdbModalRef<GradingAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private diplomaService: DiplomaService
  )
  {
    this.gradingForm = this._fb.group({
      year: [''],
      diploma: [''],
      grade: [''],
      minaverage: [''],
      maxaverage: [''],
      status: [''],
    })

  }

  ngOnInit() : void{
    this.gradingForm.patchValue(this.data);
    //this.getManagerTypeList();

    if (!this.data){
      this.getDiplomaList();
    }
    else {
      this.diplomaSelected = this.data.diploma['@id'];
    }
  }

  get fc(){
    return this.gradingForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.gradingForm.valid){
      this.saving = true;
      if (this.data){
        this._gradingService.edit(this.data.id, this.gradingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Grading edit with success !', 'success')
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
              if (v.propertyPath === 'email'){
                this.gradingForm.get('email')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._gradingService.create(this.gradingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Grading add with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            let errors: any[] = err['error']['violations'];
            console.log(err);

            errors.forEach((v) =>
            {
              console.log(v.message);
              console.log(v.propertyPath)
              if (v.propertyPath === 'email'){
                this.gradingForm.get('email')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

  getDiplomaList(){
    this.diplomaService.getDiplomaList().subscribe((data:any)=> {
        this.diplomaList = data['hydra:member'];
        this.diplomaList = this.diplomaList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
