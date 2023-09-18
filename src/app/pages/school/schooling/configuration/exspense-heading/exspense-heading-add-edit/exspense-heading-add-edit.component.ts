import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { ExpenseHeadingService } from 'src/app/pages/school/services/exspense-heading.service';

@Component({
  selector: 'app-exspense-heading-add-edit',
  templateUrl: './exspense-heading-add-edit.component.html',
  styleUrls: ['./exspense-heading-add-edit.component.scss']
})
export class ExspenseHeadingAddEditComponent {
  expenseHeadingForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _exspenseheadingService: ExpenseHeadingService,
              private _dialogRef: MdbModalRef<ExspenseHeadingAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.expenseHeadingForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.expenseHeadingForm.patchValue(this.data);
  }

  get fc(){
    return this.expenseHeadingForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.expenseHeadingForm.valid){
      this.saving = true;
      if (this.data){
        this._exspenseheadingService.edit(this.data.id, this.expenseHeadingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Civility edit with success !', 'success')
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
              if (v.propertyPath === this.expenseHeadingForm.get('name')){
                this.expenseHeadingForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._exspenseheadingService.create(this.expenseHeadingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Civility add with success !', 'success')
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
                this.expenseHeadingForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
