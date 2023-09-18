import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import { QualityService } from 'src/app/pages/school/services/quality.service';
import { TargetService } from 'src/app/pages/school/services/target.service';

@Component({
  selector: 'app-quality-add-edit',
  templateUrl: './quality-add-edit.component.html',
  styleUrls: ['./quality-add-edit.component.scss']
})
export class QualityAddEditComponent {
  qualityForm : FormGroup;
  targetList: any[] = [];
  targetListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _qualityService: QualityService,
              private _dialogRef: MdbModalRef<QualityAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private targetService: TargetService
  )
  {
    this.qualityForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      target: ['', [Validators.required]],
    })

  }

  ngOnInit() : void{
    this.qualityForm.patchValue(this.data);
    this.getTargetList();

    if (!this.data){
      this.getTargetList();
    }
    else {
      this.targetListSelect = this.data.target['@id'];
    }
  }

  get fc(){
    return this.qualityForm.controls;
  }


  onFormSubmit(){
    this.isSubmitted = true;
    if (this.qualityForm.valid){
      this.saving = true;
      if (this.data){
        this._qualityService.edit(this.data.id, this.qualityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Quality edit with success !', 'success')
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
              if (v.propertyPath === this.qualityForm.get('name')){
                this.qualityForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._qualityService.create(this.qualityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Quality add with success !', 'success')
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
                this.qualityForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

  getTargetList(){
    this.targetService.getTargetList().subscribe((data:any)=> {
        this.targetList = data['hydra:member'];
        this.targetList = this.targetList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
