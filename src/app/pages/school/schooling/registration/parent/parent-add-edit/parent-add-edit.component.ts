import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { StudentService } from 'src/app/pages/school/services/student.service';
import { StudregistrationService } from 'src/app/pages/school/services/studregistration.service';

@Component({
  selector: 'app-parent-add-edit',
  templateUrl: './parent-add-edit.component.html',
  styleUrls: ['./parent-add-edit.component.scss']
})
export class ParentAddEditComponent {
  parentForm : FormGroup;

  saving = false;

  public data: any;

  isSubmitted = false;

  isLoading = true;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _studentService: StudentService,
              private _studregistrationService: StudregistrationService,
              private _dialogRef: MdbModalRef<ParentAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  ){
    this.parentForm = this._fb.group({
      fathername: '',
      fatherphone: '',
      fatheremail: '',
      fatherprofession: '',
      mothername: '',
      motherphone: '',
      motheremail: '',
      motherprofession: '',
      guardianname: '',
      guardianphone: '',
      guardianemail: '',
      guardianprofession: '',
  })

}


ngOnInit() : void{
  this.parentForm.patchValue(this.data);

  if (!this.data){}
  else{

    this._studregistrationService. getStudList(this.data.id, this.parentForm.value).subscribe({
      next: (val: any) => {

        console.log(val['hydra:member'][0]['student'])
        let student = val['hydra:member'][0]['student'];

        console.log(student.year['@id'])
        this.parentForm.get('fathername')?.setValue(student.fathername)
        this.parentForm.get('fatheremail')?.setValue(student.fatheremail)
        this.parentForm.get('fatherphone')?.setValue(student.fatherphone)
        this.parentForm.get('fatherprofession')?.setValue(student.fatherprofession)
        this.parentForm.get('mothername')?.setValue(student.mothername)
        this.parentForm.get('motheremail')?.setValue(student.motheremail)
        this.parentForm.get('motherphone')?.setValue(student.motherphone)
        this.parentForm.get('motherprofession')?.setValue(student.motherprofession)
        this.parentForm.get('guardianname')?.setValue(student.guardianname)
        this.parentForm.get('guardianemail')?.setValue(student.guardianemail)
        this.parentForm.get('guardianphone')?.setValue(student.guardianphone)
        this.parentForm.get('guardianprofession')?.setValue(student.guardianprofession)

        this.isLoading = false;

      },
     
    })
  }
}

get fc(){
  return this.parentForm.controls;
}

onFormSubmit(){
  this.isSubmitted = true;
  if (this.parentForm.valid){
    this.saving = true;
    if (this.data){
      this._studregistrationService.parentEdit(this.data.id, this.parentForm.value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Perent edit with success !', 'success')
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
              this.parentForm.get('email')?.setErrors({serverError: v.message})
            }
            this.saving = false;

          })
        }
      })
    }
    else {
      this._studentService.create(this.parentForm.value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Parent add with success !', 'success')
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
            if (v.propertyPath === 'email'){
              this.parentForm.get('email')?.setErrors({serverError: v.message})
            }
            if (v.propertyPath === 'name'){
              this.parentForm.get('name')?.setErrors({serverError: v.message})
            }

          })
        }
      })
    }

  }
}

}

