import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {CampusService} from "../../../../services/campus.service";

@Component({
  selector: 'app-campus-add-edit',
  templateUrl: './campus-add-edit.component.html',
  styleUrls: ['./campus-add-edit.component.scss']
})
export class CampusAddEditComponent {

  campusForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _campusService: CampusService,
              private _dialogRef: MdbModalRef<CampusAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.campusForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.campusForm.patchValue(this.data);
  }

  get fc(){
    return this.campusForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.campusForm.valid){
      this.saving = true;
      if (this.data){
        this._campusService.edit(this.data.id, this.campusForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Campus edit with success !', 'success')
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
              if (v.propertyPath === this.campusForm.get('name')){
                this.campusForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._campusService.create(this.campusForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Campus add with success !', 'success')
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
              if (v.propertyPath === 'name'){
                this.campusForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
