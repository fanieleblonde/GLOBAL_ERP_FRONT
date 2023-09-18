import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { ReligionService } from 'src/app/pages/school/services/religion.service';

@Component({
  selector: 'app-religion-add-edit',
  templateUrl: './religion-add-edit.component.html',
  styleUrls: ['./religion-add-edit.component.scss']
})
export class ReligionAddEditComponent {
  religionForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _religionService: ReligionService,
              private _dialogRef: MdbModalRef<ReligionAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.religionForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.religionForm.patchValue(this.data);
  }

  get fc(){
    return this.religionForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.religionForm.valid){
      this.saving = true;
      if (this.data){
        this._religionService.edit(this.data.id, this.religionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Religion edit with success !', 'success')
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
              if (v.propertyPath === this.religionForm.get('name')){
                this.religionForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._religionService.create(this.religionForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Sex add with success !', 'success')
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
                this.religionForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
