import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {ContractTemplateComponent} from "../contract-template.component";
import {ContrackTemplateService} from "../../../services/contrack-template.service";

@Component({
  selector: 'app-contract-template-add-edit',
  templateUrl: './contract-template-add-edit.component.html',
  styleUrls: ['./contract-template-add-edit.component.scss']
})
export class ContractTemplateAddEditComponent {
  contractTemplateForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _contractTemplateService: ContrackTemplateService,
              private _dialogRef: MdbModalRef<ContractTemplateComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.contractTemplateForm = this._fb.group({

      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.contractTemplateForm.patchValue(this.data);
  }

  get fc(){
    return this.contractTemplateForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.contractTemplateForm.valid){
      this.saving = true;
      if (this.data){
        this._contractTemplateService.edit(this.data.id, this.contractTemplateForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('contract template edit with success !', 'success')
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
              if (v.propertyPath === this.contractTemplateForm.get('name')){
                this.contractTemplateForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._contractTemplateService.create(this.contractTemplateForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('contract template add with success !', 'success')
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
                this.contractTemplateForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
