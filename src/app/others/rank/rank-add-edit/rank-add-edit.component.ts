import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {RankService} from "../../../services/rank.service";

@Component({
  selector: 'app-rank-add-edit',
  templateUrl: './rank-add-edit.component.html',
  styleUrls: ['./rank-add-edit.component.scss']
})
export class RankAddEditComponent {
  rankForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _rankService: RankService,
              private _dialogRef: MdbModalRef<RankAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.rankForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.rankForm.patchValue(this.data);
  }

  get fc(){
    return this.rankForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.rankForm.valid){
      this.saving = true;
      if (this.data){
        this._rankService.edit(this.data.id, this.rankForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('rank edit with success !', 'success')
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
              if (v.propertyPath === this.rankForm.get('name')){
                this.rankForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._rankService.create(this.rankForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('rank add with success !', 'success')
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
                this.rankForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
