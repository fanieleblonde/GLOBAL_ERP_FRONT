import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { SexService } from 'src/app/pages/school/services/sex.service';

@Component({
  selector: 'app-sex-add-edit',
  templateUrl: './sex-add-edit.component.html',
  styleUrls: ['./sex-add-edit.component.scss']
})
export class SexAddEditComponent {
  sexForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _sexService: SexService,
              private _dialogRef: MdbModalRef<SexAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.sexForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.sexForm.patchValue(this.data);
  }

  get fc(){
    return this.sexForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.sexForm.valid){
      this.saving = true;
      if (this.data){
        this._sexService.edit(this.data.id, this.sexForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Sex edit with success !', 'success')
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
              if (v.propertyPath === this.sexForm.get('name')){
                this.sexForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._sexService.create(this.sexForm.value).subscribe({
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
                this.sexForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
