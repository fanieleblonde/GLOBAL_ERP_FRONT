import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import { LevelService } from 'src/app/pages/school/services/level.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-level-add-edit',
  templateUrl: './level-add-edit.component.html',
  styleUrls: ['./level-add-edit.component.scss']
})
export class LevelAddEditComponent {
  levelForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _levelService: LevelService,
              private _dialogRef: MdbModalRef<LevelAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.levelForm = this._fb.group({
      number:null,
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.levelForm.patchValue(this.data);
  }

  get fc(){
    return this.levelForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.levelForm.valid){
      this.saving = true;
      if (this.data){
        this._levelService.edit(this.data.id, this.levelForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Level edit with success !', 'success')
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
              if (v.propertyPath === this.levelForm.get('name')){
                this.levelForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._levelService.create(this.levelForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Level add with success !', 'success')
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
                this.levelForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

}
