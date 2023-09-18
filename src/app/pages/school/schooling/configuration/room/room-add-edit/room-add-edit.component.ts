import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {RoomService} from "../../../../services/room.service";
import {BuildingService} from "../../../../services/building.service";

@Component({
  selector: 'app-room-add-edit',
  templateUrl: './room-add-edit.component.html',
  styleUrls: ['./room-add-edit.component.scss']
})
export class RoomAddEditComponent {

  roomForm : FormGroup;
  buildingList: any[] = [];
  buildingListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _roomService: RoomService,
              private _dialogRef: MdbModalRef<RoomAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private buildingService: BuildingService
  )
  {
    this.roomForm = this._fb.group({
      name: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      building: ['', [Validators.required]],
    })

  }

  ngOnInit() : void{
    this.roomForm.patchValue(this.data);
    this.getBuildingList();

    if (!this.data){
      this.getBuildingList();
    }
    else {
      this.buildingListSelect = this.data.building['@id'];
    }
  }

  get fc(){
    return this.roomForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.roomForm.valid){
      this.saving = true;
      if (this.data){
        this._roomService.edit(this.data.id, this.roomForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Room edit with success !', 'success')
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
              if (v.propertyPath === this.roomForm.get('name')){
                this.roomForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._roomService.create(this.roomForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Room add with success !', 'success')
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
                this.roomForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

  getBuildingList(){
    this.buildingService.getList().subscribe((data:any)=> {
        this.buildingList = data['hydra:member'];
        this.buildingList = this.buildingList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
