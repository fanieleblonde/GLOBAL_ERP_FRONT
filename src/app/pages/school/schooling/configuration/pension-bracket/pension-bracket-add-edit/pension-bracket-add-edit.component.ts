import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {PensionBracketService} from "../../../../services/pension-bracket.service";

@Component({
  selector: 'app-pension-bracket-add-edit',
  templateUrl: './pension-bracket-add-edit.component.html',
  styleUrls: ['./pension-bracket-add-edit.component.scss']
})
export class PensionBracketAddEditComponent {
  pensionbracketForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _pensionbracketService: PensionBracketService,
              private _dialogRef: MdbModalRef<PensionBracketAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.pensionbracketForm = this._fb.group({
      number: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.pensionbracketForm.patchValue(this.data);
  }

  get fc(){
    return this.pensionbracketForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.pensionbracketForm.valid){
      this.saving = true;
      if (this.data){
        this._pensionbracketService.edit(this.data.id, this.pensionbracketForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Pension Bracket edit with success !', 'success')
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
              if (v.propertyPath === this.pensionbracketForm.get('name')){
                this.pensionbracketForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._pensionbracketService.create(this.pensionbracketForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Pension Bracket added with success !', 'success')
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
                this.pensionbracketForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

}
