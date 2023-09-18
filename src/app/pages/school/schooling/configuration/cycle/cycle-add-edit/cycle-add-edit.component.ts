import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { MinistryService } from 'src/app/pages/school/services/ministry.service';
import { CycleService } from 'src/app/pages/school/services/cycle.service';

@Component({
  selector: 'app-cycle-add-edit',
  templateUrl: './cycle-add-edit.component.html',
  styleUrls: ['./cycle-add-edit.component.scss']
})
export class CycleAddEditComponent {

  cycleForm : FormGroup;
  ministryList: any[] = [];
  ministrySelected : number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");


  constructor(private _fb: FormBuilder,
    private _cycleService: CycleService,
    private _dialogRef: MdbModalRef<CycleAddEditComponent>,
    private _coreService: CoreService,
    private translate: TranslateService,
    private ministryService: MinistryService
)
{
this.cycleForm = this._fb.group({
code: ['', [Validators.required, Validators.minLength(3)]],
name: ['', [Validators.required, Validators.minLength(3)]],
position: ['', [Validators.required]],
ministry: '',
})

}

ngOnInit() : void{
  this.cycleForm.patchValue(this.data);
  this.getMinistryList();

  if (!this.data){
    this.getMinistryList();
  }
  else {
    this.ministrySelected = this.data.ministry['@id'];
  }
}

get fc(){
  return this.cycleForm.controls;
}


onFormSubmit(){
  this.isSubmitted = true;
  if (this.cycleForm.valid){
    this.saving = true;
    if (this.data){
      this._cycleService.edit(this.data.id, this.cycleForm.value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Cycle edit with success !', 'success')
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
            if (v.propertyPath === 'email'){
              this.cycleForm.get('email')?.setErrors({serverError: v.message})
            }
            this.saving = false;

          })
        }
      })
    }
    else {
      this._cycleService.create(this.cycleForm.value).subscribe({
        next: (val: any) => {
          this._coreService.showSuccess('Cycle add with success !', 'success')
          this._dialogRef.close(true);
        },
        complete: () => {
          this.saving = false
        },
        error: (err: any) =>
        {
          this.saving = false;
          let errors: any[] = err['error']['violations'];
          console.log(err);

          errors.forEach((v) =>
          {
            console.log(v.message);
            console.log(v.propertyPath)
            if (v.propertyPath === 'email'){
              this.cycleForm.get('email')?.setErrors({serverError: v.message})
            }

          })
        }
      })
    }

  }
}

getMinistryList(){
  this.ministryService.getMinistryList().subscribe((data:any)=> {
      this.ministryList = data['hydra:member'];
      this.ministryList = this.ministryList.map((v) => {
        v.id = v['@id'];
        return v;
      })
    },
    error => console.log(error)
  )
}


}
