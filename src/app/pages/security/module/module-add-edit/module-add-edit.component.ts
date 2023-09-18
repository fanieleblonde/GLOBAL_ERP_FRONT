import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {ModuleService} from "../../services/module.service";

@Component({
  selector: 'app-module-add-edit',
  templateUrl: './module-add-edit.component.html',
  styleUrls: ['./module-add-edit.component.scss']
})
export class ModuleAddEditComponent {

  moduleForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant("Update");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _moduleService: ModuleService,
              private _dialogRef: MdbModalRef<ModuleAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.moduleForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.moduleForm.patchValue(this.data);
  }

  get fc(){
    return this.moduleForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.moduleForm.valid){
      this.saving = true;
      if (this.data){
        this._moduleService.updateModule(this.data.id, this.moduleForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Module edit with success !', 'success')
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
              if (v.propertyPath === this.moduleForm.get('name')){
                this.moduleForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._moduleService.addModule(this.moduleForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Module add with success !', 'success')
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
                this.moduleForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
