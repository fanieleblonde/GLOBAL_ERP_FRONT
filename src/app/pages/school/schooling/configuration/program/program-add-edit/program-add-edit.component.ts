import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {SchoolService} from "../../../../services/school.service";
import {ProgramService} from "../../../../services/program.service";

@Component({
  selector: 'app-program-add-edit',
  templateUrl: './program-add-edit.component.html',
  styleUrls: ['./program-add-edit.component.scss']
})
export class ProgramAddEditComponent {
  programForm : FormGroup;

  schoolList: any[] = [];
  schoolListSelect:number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _programService: ProgramService,
              private _dialogRef: MdbModalRef<ProgramAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private schoolService: SchoolService

  )
  {
    this.programForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description:'',
      position:['', [Validators.required ]],
      school: '',
    })

  }

  ngOnInit() : void{
    this.programForm.patchValue(this.data);
    this.getSchoolList();

    if (!this.data){
      this.getSchoolList();
    }
    else {
      this.schoolListSelect = this.data.school['@id'];
    }
  }

  get fc(){
    return this.programForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.programForm.valid){
      this.saving = true;
      if (this.data){
        this._programService.edit(this.data.id, this.programForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Program edit with success !', 'success')
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
              if (v.propertyPath === this.programForm.get('code')){
                this.programForm.get('code')?.setErrors({serverError: v.message})
              }
              if (v.propertyPath === this.programForm.get('name')){
                this.programForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._programService.create(this.programForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Program add with success !', 'success')
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
                this.programForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
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


}
