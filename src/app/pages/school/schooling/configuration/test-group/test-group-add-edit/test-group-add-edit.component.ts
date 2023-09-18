import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { TestGroupService } from 'src/app/pages/school/services/test-group.service';

@Component({
  selector: 'app-test-group-add-edit',
  templateUrl: './test-group-add-edit.component.html',
  styleUrls: ['./test-group-add-edit.component.scss']
})
export class TestGroupAddEditComponent {
  testgroupForm : FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _testgroupService: TestGroupService,
              private _dialogRef: MdbModalRef<TestGroupAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
  )
  {
    this.testgroupForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    })

  }

  ngOnInit() : void{
    this.testgroupForm.patchValue(this.data);
  }

  get fc(){
    return this.testgroupForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.testgroupForm.valid){
      this.saving = true;
      if (this.data){
        this._testgroupService.edit(this.data.id, this.testgroupForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Test Material edit with success !', 'success')
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
              if (v.propertyPath === this.testgroupForm.get('name')){
                this.testgroupForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._testgroupService.create(this.testgroupForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Test Material add with success !', 'success')
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
                this.testgroupForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

}
