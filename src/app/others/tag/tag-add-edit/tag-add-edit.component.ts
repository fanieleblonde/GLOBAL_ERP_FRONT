import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {TagService} from "../../../services/tag.service";

@Component({
  selector: 'app-tag-add-edit',
  templateUrl: './tag-add-edit.component.html',
  styleUrls: ['./tag-add-edit.component.scss']
})
export class TagAddEditComponent {
  tagForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _tagService: TagService,
              private _dialogRef: MdbModalRef<TagAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.tagForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit() : void{
    this.tagForm.patchValue(this.data);
  }

  get fc(){
    return this.tagForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.tagForm.valid){
      this.saving = true;
      if (this.data){
        this._tagService.edit(this.data.id, this.tagForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('tag edit with success !', 'success')
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
              if (v.propertyPath === this.tagForm.get('name')){
                this.tagForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._tagService.create(this.tagForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('tag add with success !', 'success')
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
                this.tagForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }
}
