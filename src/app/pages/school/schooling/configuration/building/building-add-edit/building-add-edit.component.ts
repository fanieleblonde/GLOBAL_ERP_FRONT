import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {BuildingService} from "../../../../services/building.service";
import {CampusService} from "../../../../services/campus.service";

@Component({
  selector: 'app-building-add-edit',
  templateUrl: './building-add-edit.component.html',
  styleUrls: ['./building-add-edit.component.scss']
})
export class BuildingAddEditComponent {
  buildingForm : FormGroup;
  campusList: any[] = [];
  campusListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _buildingService: BuildingService,
              private _dialogRef: MdbModalRef<BuildingAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private campusService: CampusService
  )
  {
    this.buildingForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      campus: ['', [Validators.required]],
    })

  }

  ngOnInit() : void{
    this.buildingForm.patchValue(this.data);
    this.getCampusList();

    if (!this.data){
      this.getCampusList();
    }
    else {
      this.campusListSelect = this.data.campus['@id'];
    }
  }

  get fc(){
    return this.buildingForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.buildingForm.valid){
      this.saving = true;
      if (this.data){
        this._buildingService.edit(this.data.id, this.buildingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Building edit with success !', 'success')
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
              if (v.propertyPath === this.buildingForm.get('name')){
                this.buildingForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._buildingService.create(this.buildingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Building add with success !', 'success')
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
                this.buildingForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

  getCampusList(){
    this.campusService.getCampusList().subscribe((data:any)=> {
        this.campusList = data['hydra:member'];
        this.campusList = this.campusList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
